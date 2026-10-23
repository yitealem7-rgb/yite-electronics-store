'use strict';

// Yite Electronics Store API — Node.js 22+, built-in SQLite, no npm dependencies.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
fs.mkdirSync(DATA_DIR, { recursive: true });
const PORT = Number(process.env.PORT || 3000);
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || crypto.randomBytes(24).toString('hex');
const db = new DatabaseSync(path.join(DATA_DIR, 'yite-store.sqlite'));
db.exec(`PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY, name TEXT NOT NULL, category TEXT NOT NULL,
  price INTEGER NOT NULL CHECK(price >= 0), description TEXT NOT NULL DEFAULT '',
  emoji TEXT NOT NULL DEFAULT '📦', bg TEXT NOT NULL DEFAULT '#f2eaff',
  tag TEXT NOT NULL DEFAULT '', stock INTEGER NULL, active INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT, order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL, customer_phone TEXT NOT NULL,
  delivery_address TEXT NOT NULL, delivery_city TEXT NOT NULL,
  payment_preference TEXT NOT NULL, notes TEXT NOT NULL DEFAULT '',
  items_json TEXT NOT NULL, subtotal INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);`);

const count = db.prepare('SELECT COUNT(*) AS n FROM products').get().n;
if (!count) {
  const seed = JSON.parse(fs.readFileSync(path.join(ROOT, 'seed-products.json'), 'utf8'));
  const insert = db.prepare(`INSERT INTO products
    (id,name,category,price,description,emoji,bg,tag,stock,active)
    VALUES (?,?,?,?,?,?,?,?,NULL,1)`);
  const tx = db.transaction ? db.transaction(() => {}) : null;
  db.exec('BEGIN');
  try {
    for (const p of seed) insert.run(p.id, p.name, p.category, p.price, p.description, p.emoji, p.bg, p.tag);
    db.exec('COMMIT');
  } catch (e) { db.exec('ROLLBACK'); throw e; }
}

const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.ico':'image/x-icon' };
const send = (res, status, data) => { res.writeHead(status, { 'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff' }); res.end(JSON.stringify(data)); };
function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = ''; req.on('data', chunk => { raw += chunk; if (raw.length > 100_000) { reject(Object.assign(new Error('Request body too large'), { status:413 })); req.destroy(); } });
    req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch { reject(Object.assign(new Error('Invalid JSON body'), { status:400 })); } });
    req.on('error', reject);
  });
}
function requireAdmin(req, res) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token || token.length !== ADMIN_TOKEN.length || !crypto.timingSafeEqual(Buffer.from(token), Buffer.from(ADMIN_TOKEN))) {
    send(res, 401, { error: 'Admin authorization required. Send Authorization: Bearer <ADMIN_TOKEN>.' }); return false;
  }
  return true;
}
function cleanText(value, max, field, required = true) {
  if (typeof value !== 'string') { if (!required && (value === undefined || value === null)) return ''; throw Object.assign(new Error(`${field} is required`), { status:400 }); }
  const s = value.trim();
  if (required && !s) throw Object.assign(new Error(`${field} is required`), { status:400 });
  if (s.length > max) throw Object.assign(new Error(`${field} must be ${max} characters or fewer`), { status:400 });
  return s;
}
const publicProduct = p => ({ id:p.id, name:p.name, category:p.category, price:p.price, description:p.description, emoji:p.emoji, bg:p.bg, tag:p.tag, stock:p.stock, active:Boolean(p.active), updatedAt:p.updated_at });
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const method = req.method || 'GET';
  try {
    if (url.pathname === '/api/health' && method === 'GET') return send(res, 200, { ok:true, service:'Yite Electronics Store API' });
    if (url.pathname === '/api/products' && method === 'GET') {
      const rows = db.prepare('SELECT * FROM products WHERE active=1 ORDER BY id').all();
      return send(res, 200, { products: rows.map(publicProduct) });
    }
    if (url.pathname === '/api/orders' && method === 'POST') {
      const body = await readBody(req);
      const customer_name = cleanText(body.customerName, 90, 'Customer name');
      const customer_phone = cleanText(body.customerPhone, 25, 'Customer phone');
      if (!/^[0-9+()\-\s]{7,25}$/.test(customer_phone) || (customer_phone.match(/\d/g) || []).length < 7) throw Object.assign(new Error('Enter a valid phone number'), { status:400 });
      const delivery_address = cleanText(body.deliveryAddress, 220, 'Delivery address');
      const delivery_city = cleanText(body.deliveryCity, 100, 'City / area');
      const payment_preference = cleanText(body.paymentMethod, 80, 'Payment preference');
      const notes = cleanText(body.deliveryNotes || '', 400, 'Notes', false);
      if (!Array.isArray(body.items) || body.items.length < 1 || body.items.length > 50) throw Object.assign(new Error('Order must contain 1–50 product lines'), { status:400 });
      const getProduct = db.prepare('SELECT id,name,category,price,stock,active FROM products WHERE id=?');
      const lines = []; let subtotal = 0;
      for (const item of body.items) {
        const id = Number(item && item.id), quantity = Number(item && item.quantity);
        if (!Number.isSafeInteger(id) || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > 20) throw Object.assign(new Error('Invalid product or quantity'), { status:400 });
        const p = getProduct.get(id);
        if (!p || !p.active) throw Object.assign(new Error(`Product ${id} is unavailable`), { status:400 });
        if (p.stock !== null && p.stock < quantity) throw Object.assign(new Error(`${p.name} has insufficient stock`), { status:409 });
        subtotal += p.price * quantity;
        if (!Number.isSafeInteger(subtotal) || subtotal > 100_000_000) throw Object.assign(new Error('Order total is too large'), { status:400 });
        lines.push({ id:p.id, name:p.name, category:p.category, unitPrice:p.price, quantity, lineTotal:p.price*quantity });
      }
      const orderNumber = `YITE-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
      const result = db.prepare(`INSERT INTO orders
        (order_number,customer_name,customer_phone,delivery_address,delivery_city,payment_preference,notes,items_json,subtotal)
        VALUES (?,?,?,?,?,?,?,?,?)`).run(orderNumber, customer_name, customer_phone, delivery_address, delivery_city, payment_preference, notes, JSON.stringify(lines), subtotal);
      return send(res, 201, { ok:true, id:Number(result.lastInsertRowid), orderNumber, subtotal, status:'pending', items:lines, message:'Order request saved. The store must confirm stock, delivery fee and final price.' });
    }
    if (url.pathname === '/api/admin/products' && method === 'GET') {
      if (!requireAdmin(req,res)) return;
      return send(res, 200, { products: db.prepare('SELECT * FROM products ORDER BY id').all().map(publicProduct) });
    }
    const productMatch = url.pathname.match(/^\/api\/admin\/products\/(\d+)$/);
    if (productMatch && method === 'PATCH') {
      if (!requireAdmin(req,res)) return;
      const id = Number(productMatch[1]), body = await readBody(req);
      const old = db.prepare('SELECT * FROM products WHERE id=?').get(id);
      if (!old) return send(res,404,{error:'Product not found'});
      const price = body.price === undefined ? old.price : Number(body.price);
      const stock = body.stock === undefined ? old.stock : (body.stock === null || body.stock === '' ? null : Number(body.stock));
      if (!Number.isSafeInteger(price) || price < 0 || price > 100_000_000) throw Object.assign(new Error('Price must be a non-negative whole ETB amount'), {status:400});
      if (stock !== null && (!Number.isSafeInteger(stock) || stock < 0 || stock > 1_000_000)) throw Object.assign(new Error('Stock must be a non-negative whole number or null'), {status:400});
      const active = body.active === undefined ? old.active : (body.active === false || body.active === 0 ? 0 : body.active === true || body.active === 1 ? 1 : NaN);
      if (!Number.isInteger(active)) throw Object.assign(new Error('active must be true or false'), {status:400});
      db.prepare('UPDATE products SET price=?,stock=?,active=?,updated_at=CURRENT_TIMESTAMP WHERE id=?').run(price,stock,active,id);
      return send(res,200,{product:publicProduct(db.prepare('SELECT * FROM products WHERE id=?').get(id))});
    }
    if (url.pathname === '/api/admin/orders' && method === 'GET') {
      if (!requireAdmin(req,res)) return;
      const allowed = new Set(['pending','confirmed','preparing','out_for_delivery','delivered','cancelled']);
      const rows = db.prepare('SELECT * FROM orders ORDER BY id DESC LIMIT 500').all().map(o => ({ id:o.id, orderNumber:o.order_number, customerName:o.customer_name, customerPhone:o.customer_phone, deliveryAddress:o.delivery_address, deliveryCity:o.delivery_city, paymentPreference:o.payment_preference, notes:o.notes, items:JSON.parse(o.items_json), subtotal:o.subtotal, status:o.status, createdAt:o.created_at }));
      return send(res,200,{orders:rows,allowedStatuses:[...allowed]});
    }
    const orderMatch = url.pathname.match(/^\/api\/admin\/orders\/(\d+)$/);
    if (orderMatch && method === 'PATCH') {
      if (!requireAdmin(req,res)) return;
      const body = await readBody(req), allowed = ['pending','confirmed','preparing','out_for_delivery','delivered','cancelled'];
      if (!allowed.includes(body.status)) throw Object.assign(new Error(`status must be one of: ${allowed.join(', ')}`),{status:400});
      const result = db.prepare('UPDATE orders SET status=? WHERE id=?').run(body.status,Number(orderMatch[1]));
      if (!result.changes) return send(res,404,{error:'Order not found'});
      return send(res,200,{ok:true,id:Number(orderMatch[1]),status:body.status});
    }
    if (url.pathname.startsWith('/api/')) return send(res,404,{error:'API route not found'});
    if (method !== 'GET' && method !== 'HEAD') return send(res,405,{error:'Method not allowed'});
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === '/') pathname = '/index.html';
    const target = path.resolve(ROOT, `.${pathname}`);
    if (!target.startsWith(ROOT + path.sep) || target.includes(path.sep + 'data' + path.sep) || target.endsWith('server.js') || target.endsWith('seed-products.json') || !fs.existsSync(target) || !fs.statSync(target).isFile()) return send(res,404,{error:'Not found'});
    res.writeHead(200, { 'Content-Type':mime[path.extname(target).toLowerCase()] || 'application/octet-stream', 'X-Content-Type-Options':'nosniff', 'Content-Security-Policy':"default-src 'self' https: data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; connect-src 'self' https:; frame-ancestors 'none'", 'Referrer-Policy':'strict-origin-when-cross-origin' });
    if (method === 'HEAD') return res.end();
    fs.createReadStream(target).pipe(res);
  } catch (err) {
    if (!res.headersSent) send(res,err.status || 500,{error:err.status ? err.message : 'Internal server error'});
  }
});
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Yite Electronics Store running at http://localhost:${PORT}`);
  console.log(`Admin API token (keep secret): ${ADMIN_TOKEN}`);
  if (!process.env.ADMIN_TOKEN) console.log('Set ADMIN_TOKEN in the environment before public deployment; this generated token changes on restart.');
  console.log('SQLite database: data/yite-store.sqlite');
});
process.on('SIGINT', () => { db.close(); server.close(() => process.exit(0)); });
process.on('SIGTERM', () => { db.close(); server.close(() => process.exit(0)); });
