import { useState } from 'react';
import '../static/Createproduct.css';
import { api } from '../services/api.js';
export default function Createproduct() {
  const [form, setForm] = useState({ name: '', category: '', stock: '', price: '', description: '' }); const [message, setMessage] = useState('');
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    try {
      const result = await api.createProduct({ ...form, price: Number(form.price), stock: Number(form.stock), image: '', tag: 'NEW' });
      setMessage(result.message);
      setForm({ name: '', category: '', stock: '', price: '', description: '' });
    } catch (err) { setMessage(err.message); }
  };
  return <div className="product-container"><form className="product-form" onSubmit={submit}><p className="eyebrow">XDEVX STORE ADMIN</p><h2 className="product-title">Add a product</h2><p className="form-subtitle">Add a product to the XDEVX catalogue database.</p><label className="product-label">Product name<input className="product-input" name="name" value={form.name} onChange={update} placeholder="Enter product name" required /></label><label className="product-label">Category<select className="product-input" name="category" value={form.category} onChange={update} required><option value="" disabled>Select category</option><option value="men">Men</option><option value="women">Women</option><option value="kids">Kids</option></select></label><div className="two-fields"><label className="product-label">Stock<input className="product-input" name="stock" type="number" min="0" value={form.stock} onChange={update} placeholder="0" required /></label><label className="product-label">Price (₹)<input className="product-input" name="price" type="number" min="1" value={form.price} onChange={update} placeholder="999" required /></label></div><label className="product-label">Description<textarea className="product-input" name="description" value={form.description} onChange={update} placeholder="Describe the product" rows="4" required /></label>{message && <p className="form-message success" role="status">{message}</p>}<button className="product-btn" type="submit">Save product ↗</button><p className="demo-note">Product details are saved in the backend database. Image upload is not included in this starter version.</p></form></div>;
}
