import { useEffect, useState } from 'react';
import { ProductGrid } from './Home.jsx';
import { api } from '../services/api.js';
import '../static/Home.css';

export default function Kids({ onAddToCart }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    api.products('kids')
      .then(data => setItems(data.products.map(p => ({ ...p, category: String(p.category).toUpperCase(), price: `₹${Number(p.price).toLocaleString('en-IN')}`, tag: p.tag || 'NEW' }))))
      .catch(err => setError(err.message));
  }, []);
  return <section className="category-page">
    <div className="category-intro"><p className="eyebrow">THE LITTLE ONES' EDIT</p><h1>Made for big little days.</h1><p>Comfy, playful essentials ready for every adventure.</p></div>
    {error && <p className="form-message error">{error}</p>}
    {items.length ? <ProductGrid items={items} onAddToCart={onAddToCart} /> : !error && <p>Loading products...</p>}
  </section>;
}
