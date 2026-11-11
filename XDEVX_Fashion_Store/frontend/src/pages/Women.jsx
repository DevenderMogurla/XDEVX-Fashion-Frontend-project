import { useEffect, useState } from 'react';
import { ProductGrid } from './Home.jsx';
import { api } from '../services/api.js';
import '../static/Home.css';

export default function Women({ onAddToCart }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    api.products('women')
      .then(data => setItems(data.products.map(p => ({ ...p, category: String(p.category).toUpperCase(), price: `₹${Number(p.price).toLocaleString('en-IN')}`, tag: p.tag || 'NEW' }))))
      .catch(err => setError(err.message));
  }, []);
  return <section className="category-page">
    <div className="category-intro"><p className="eyebrow">THE WOMEN'S EDIT</p><h1>Feel-good dressing.</h1><p>Versatile pieces, soft textures and confident everyday silhouettes.</p></div>
    {error && <p className="form-message error">{error}</p>}
    {items.length ? <ProductGrid items={items} onAddToCart={onAddToCart} /> : !error && <p>Loading products...</p>}
  </section>;
}
