import os
import sqlite3
from datetime import date
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "instance", "xdevx.db")
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174"]}})

def connect():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn

def init_db():
    with connect() as db:
        db.executescript("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE COLLATE NOCASE,
            phn TEXT NOT NULL,
            dob TEXT NOT NULL,
            gender TEXT,
            address TEXT,
            password TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL CHECK(price >= 0),
            image TEXT DEFAULT '',
            tag TEXT DEFAULT 'NEW',
            stock INTEGER NOT NULL DEFAULT 0,
            description TEXT DEFAULT '',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        """)
        count = db.execute("SELECT COUNT(*) FROM products").fetchone()[0]
        if count == 0:
            seed = [
                ("Everyday Linen Shirt","men",1499,"photo-1596755094514-f87e34085b2c","BESTSELLER",24,"A breathable everyday linen shirt."),
                ("Soft Knit Co-ord","women",1899,"photo-1483985988355-763728e1935b","NEW",18,"A soft knit co-ord set."),
                ("Classic Weekend Jacket","men",2499,"photo-1523398002811-999ca8dec234","POPULAR",12,"A versatile weekend layer."),
                ("Mini Explorer Set","kids",999,"photo-1519238263530-99b5f7e5b2f7","JUST IN",30,"Comfortable outfit for little explorers.")
            ]
            db.executemany("INSERT INTO products(name,category,price,image,tag,stock,description) VALUES(?,?,?,?,?,?,?)", seed)

@app.get("/")
def home():
    return jsonify({"success": True, "message": "XDEVX API is running"})

@app.get("/api/health")
def health():
    return jsonify({"success": True, "service": "XDEVX backend", "database": "connected"})

@app.get("/api/products")
def get_products():
    category = request.args.get("category")
    with connect() as db:
        if category and category.lower() in ("men", "women", "kids"):
            rows = db.execute("SELECT * FROM products WHERE lower(category)=? ORDER BY id DESC", (category.lower(),)).fetchall()
        else:
            rows = db.execute("SELECT * FROM products ORDER BY id DESC").fetchall()
    return jsonify({"success": True, "products": [dict(r) for r in rows]})

@app.post("/api/register")
def register():
    data = request.get_json(silent=True) or {}
    fields = ["name","username","email","phn","dob","gender","address","password","confirmpassword"]
    if any(not str(data.get(k, "")).strip() for k in fields):
        return jsonify({"success": False, "message": "Please complete all required fields."}), 400
    if not str(data["phn"]).isdigit() or len(str(data["phn"])) != 10:
        return jsonify({"success": False, "message": "Enter a valid 10-digit mobile number."}), 400
    if len(data["password"]) < 8:
        return jsonify({"success": False, "message": "Password must contain at least 8 characters."}), 400
    if data["password"] != data["confirmpassword"]:
        return jsonify({"success": False, "message": "Passwords do not match."}), 400
    try:
        date.fromisoformat(data["dob"])
    except (ValueError, TypeError):
        return jsonify({"success": False, "message": "Enter a valid date of birth."}), 400
    try:
        with connect() as db:
            cur = db.execute("""INSERT INTO users(name,username,email,phn,dob,gender,address,password)
                VALUES(?,?,?,?,?,?,?,?)""", (
                data["name"].strip(), data["username"].strip(), data["email"].strip().lower(),
                data["phn"], data["dob"], data["gender"], data["address"].strip(),
                generate_password_hash(data["password"])
            ))
            user_id = cur.lastrowid
        return jsonify({"success": True, "message": "Your XDEVX account has been created. Please log in.", "user_id": user_id}), 201
    except sqlite3.IntegrityError:
        return jsonify({"success": False, "message": "That email or username is already registered."}), 409

@app.post("/api/login")
def login():
    data = request.get_json(silent=True) or {}
    email = str(data.get("email", "")).strip().lower()
    password = data.get("password", "")
    if not email or not password:
        return jsonify({"success": False, "message": "Email and password are required."}), 400
    with connect() as db:
        user = db.execute("SELECT * FROM users WHERE email=?", (email,)).fetchone()
    if not user or not check_password_hash(user["password"], password):
        return jsonify({"success": False, "message": "Invalid email or password."}), 401
    return jsonify({"success": True, "message": f"Welcome back, {user['name']}!", "user": {
        "id": user["id"], "name": user["name"], "username": user["username"], "email": user["email"]
    }})

@app.post("/api/products")
def create_product():
    data = request.get_json(silent=True) or {}
    name = str(data.get("name", "")).strip()
    category = str(data.get("category", "")).lower()
    try:
        price = float(data.get("price", 0))
        stock = int(data.get("stock", 0))
    except (TypeError, ValueError):
        return jsonify({"success": False, "message": "Price and stock must be valid numbers."}), 400
    if not name or category not in ("men","women","kids") or price <= 0 or stock < 0:
        return jsonify({"success": False, "message": "Enter a product name, valid category, positive price and valid stock."}), 400
    with connect() as db:
        cur = db.execute("""INSERT INTO products(name,category,price,image,tag,stock,description)
            VALUES(?,?,?,?,?,?,?)""", (name,category,price,str(data.get("image","")).strip(),
            str(data.get("tag","NEW")).strip(),stock,str(data.get("description","")).strip()))
        product_id = cur.lastrowid
    return jsonify({"success": True, "message": "Product added to XDEVX store.", "product_id": product_id}), 201

@app.delete("/api/products/<int:product_id>")
def delete_product(product_id):
    with connect() as db:
        cur = db.execute("DELETE FROM products WHERE id=?", (product_id,))
    if cur.rowcount == 0:
        return jsonify({"success": False, "message": "Product not found."}), 404
    return jsonify({"success": True, "message": "Product deleted."})

if __name__ == "__main__":
    init_db()
    app.run(host="127.0.0.1", port=5000, debug=True)
