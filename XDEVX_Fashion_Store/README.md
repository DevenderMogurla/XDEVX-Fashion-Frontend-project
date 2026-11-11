# XDEVX Fashion Store — React + Flask

A learning-ready full-stack fashion storefront adapted from your uploaded React project. The frontend uses Vite/React; the backend uses Flask REST APIs and SQLite. SQLite creates its database automatically, so you do not need to install or configure MySQL to run this version.

## Features connected to backend
- Product catalogue from `GET /api/products` (Home, Men, Women, Kids).
- Registration through `POST /api/register`; passwords are hashed before storage.
- Login through `POST /api/login`.
- Add products through `POST /api/products` using the Add Product page.
- Health check at `GET /api/health`.

> Starter-project note: the Add Product endpoint is open for local development and is NOT protected by admin authentication. Do not deploy this as-is. Add real admin authentication, sessions/JWT, CSRF protection, rate limiting and production configuration before deployment. The cart is still a frontend demo and is not persisted to the database. Product image upload is not included; seeded items use Unsplash image IDs.

## Requirements
- Python 3.10+
- Node.js 20.19+ or 22.12+ (Node 22 LTS recommended)
- npm

## Run on Windows (VS Code)

Extract the ZIP, open the `XDEVX_Fashion_Store` folder in VS Code.

### Terminal 1 — backend
```powershell
cd backend
py -m venv .venv
.venv\Scripts\activate
py -m pip install -r requirements.txt
py app.py
```
If `py` is unavailable, use `python` instead. Keep this terminal running. Flask starts at `http://127.0.0.1:5000`. On first run, it creates `backend/instance/xdevx.db` and inserts four sample products.

Test in browser:
- `http://127.0.0.1:5000/`
- `http://127.0.0.1:5000/api/health`
- `http://127.0.0.1:5000/api/products`

### Terminal 2 — frontend
Open a second VS Code terminal:
```powershell
cd frontend
npm install
npm run dev
```
Open the URL Vite prints, normally `http://localhost:5173`. Keep this terminal running too.

## How to use
1. Open the frontend URL.
2. Register using the Sign up link.
3. Log in using the same email and password.
4. Open `/createproduct` to add a product; choose Men, Women or Kids.
5. Return to the relevant category page to see products loaded from the backend database.

## API reference
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Backend/database check |
| GET | `/api/products` | List all products |
| GET | `/api/products?category=men` | Filter by category |
| POST | `/api/register` | Create account |
| POST | `/api/login` | Verify credentials |
| POST | `/api/products` | Add product (local starter only) |
| DELETE | `/api/products/<id>` | Delete product |

## Troubleshooting
- `npm` is not recognized: install Node.js LTS, restart VS Code and check `node -v` / `npm -v`.
- `ModuleNotFoundError: flask`: activate `.venv` inside `backend` and run `py -m pip install -r requirements.txt`.
- `npm ERR! enoent package.json`: make sure the terminal is in `frontend` before running npm commands.
- Port 5173 busy: use the alternate Vite URL printed in the terminal.
- Port 5000 busy: stop the other Flask app or change the port in `backend/app.py` and update `VITE_API_URL` if needed.
- Product images require internet access.
