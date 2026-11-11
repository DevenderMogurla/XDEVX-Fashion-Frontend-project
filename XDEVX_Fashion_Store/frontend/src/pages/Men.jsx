import { useEffect, useState } from 'react';
import { ProductGrid } from './Home.jsx';
import { api } from '../services/api.js';
import '../static/Home.css';

export default function Men({ onAddToCart }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    api.products('men')
      .then(data => setItems(data.products.map(p => ({ ...p, category: String(p.category).toUpperCase(), price: `₹${Number(p.price).toLocaleString('en-IN')}`, tag: p.tag || 'NEW' }))))
      .catch(err => setError(err.message));
  }, []);
  return <section className="category-page">
    <div className="category-intro"><p className="eyebrow">THE MEN'S EDIT</p><h1>Easy does it.</h1><p>Reliable staples, relaxed fits and layers that do more with less.</p></div>
    {error && <p className="form-message error">{error}</p>}
    {items.length ? <ProductGrid items={items} onAddToCart={onAddToCart} /> : !error && <p>Loading products...</p>}
  </section>;
}
