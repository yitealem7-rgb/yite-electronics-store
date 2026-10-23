# Yite Electronics Store — Backend + SQLite Database

This version keeps the existing storefront and adds a Node.js API with a persistent SQLite database. It uses Node's built-in `node:sqlite` module, so no third-party npm packages are required.

## Requirements
- Node.js **22.5 or newer** (Node 22+ recommended; `node:sqlite` may print an experimental warning on some versions).
- A terminal / command prompt.

## Start the store locally
1. Extract the ZIP archive.
2. Open a terminal in the `YiteElectronics` folder.
3. Run `node --version` and check it is 22.5 or newer.
4. Run `npm start` (or `node server.js`).
5. Open `http://localhost:3000` in your browser. **Do not open `index.html` directly** for backend checkout; the API must be running.

The server creates `data/yite-store.sqlite` on first start and seeds the 46 example products. The database file persists orders and product updates across restarts. Back it up regularly.

## What's implemented
- `GET /api/health` — server health check.
- `GET /api/products` — active products and database prices for the storefront.
- `POST /api/orders` — validates customer/delivery fields and product IDs/quantities, calculates prices on the server (not from the browser), stores a pending order and item-price snapshots, and returns an order reference.
- `GET /api/admin/products` — lists all products, including inactive items.
- `PATCH /api/admin/products/:id` — update `price`, `stock`, and/or `active`.
- `GET /api/admin/orders` — lists recent orders and delivery information.
- `PATCH /api/admin/orders/:id` — updates status (`pending`, `confirmed`, `preparing`, `out_for_delivery`, `delivered`, `cancelled`).

Admin API routes require `Authorization: Bearer YOUR_ADMIN_TOKEN`. On local first start the server prints a random admin token in the terminal. Keep it private. For repeatable runs and deployment, set `ADMIN_TOKEN` in your environment to a long, random secret before starting the server. Never put the token in frontend JavaScript or commit it to a public repository.

### Example admin requests
Use a terminal, replacing `YOUR_ADMIN_TOKEN` with the token printed by the server:

```sh
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" http://localhost:3000/api/admin/orders
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" http://localhost:3000/api/admin/products
curl -X PATCH -H "Authorization: Bearer YOUR_ADMIN_TOKEN" -H "Content-Type: application/json" -d '{"price":9500,"stock":7}' http://localhost:3000/api/admin/products/1
curl -X PATCH -H "Authorization: Bearer YOUR_ADMIN_TOKEN" -H "Content-Type: application/json" -d '{"status":"confirmed"}' http://localhost:3000/api/admin/orders/1
```

## Important before public launch
- All catalog prices are **sample estimates**. Replace them with verified prices, correct device models/specifications, and actual inventory.
- Stock starts as `NULL` (unknown), not as a promise that an item is available. An admin can set a stock number when verified. This version checks stock only when a number has been set; stock is not automatically decremented yet.
- An order is a **request**, not a confirmed sale. WhatsApp is opened for the customer to review and send; the database save happens first when the backend is available. No online payment is collected.
- Customer name, phone and delivery address are personal data. Restrict database access, use HTTPS and strong secrets in production, set up backups, and publish a privacy notice before accepting real customers.
- The admin API is token-protected, but this is a starter backend, not a complete production deployment. Before exposing it publicly, add HTTPS through a trusted host/reverse proxy, rate limiting, monitoring, automated backups, and a proper staff login/role system.
- The contact form remains a frontend demo and does not send email. The additional store phone was supplied as `095025159`; verify it before publishing.

## Database tables
- `products`: catalog, price, optional stock, active/inactive flag.
- `orders`: customer/delivery details, item and price snapshots, subtotal, order status, timestamp.

## Project files
- `index.html`, `style.css`, `script.js` — storefront.
- `server.js` — API and static file server.
- `seed-products.json` — initial sample catalog (used only when the products table is empty).
- `data/yite-store.sqlite` — generated database; do not delete if you need saved orders.
