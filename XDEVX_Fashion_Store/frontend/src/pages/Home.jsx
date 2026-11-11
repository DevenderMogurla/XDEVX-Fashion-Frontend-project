import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import '../static/Home.css';

const products = [
  { id: 1, name: 'Everyday Linen Shirt', category: 'MEN', price: '₹1,499', image: 'photo-1596755094514-f87e34085b2c', tag: 'BESTSELLER' },
  { id: 2, name: 'Soft Knit Co-ord', category: 'WOMEN', price: '₹1,899', image: 'photo-1483985988355-763728e1935b', tag: 'NEW' },
  { id: 3, name: 'Classic Weekend Jacket', category: 'MEN', price: '₹2,499', image: 'photo-1523398002811-999ca8dec234', tag: 'POPULAR' },
  { id: 4, name: 'Mini Explorer Set', category: 'KIDS', price: '₹999', image: 'photo-1519238263530-99b5f7e5b2f7', tag: 'JUST IN' },
];

export function ProductGrid({ items = products, onAddToCart }) {
  return <div className="product-grid">{items.map((product) => <article className="product-card" key={product.id}>
    <div className="product-image-wrap"><img src={product.image ? `https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=800&q=85` : 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85'} alt={product.name} loading="lazy" /><span className="product-tag">{product.tag}</span></div>
    <div className="product-meta"><span>{product.category}</span><span>{product.price}</span></div>
    <h3>{product.name}</h3>
    <button className="add-button" type="button" onClick={onAddToCart}>Add to bag <span>＋</span></button>
  </article>)}</div>;
}

export default function Home({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  useEffect(() => { api.products().then(data => setProducts(data.products)).catch(err => console.error('Could not load products:', err)); }, []);
  const displayProducts = products.map(p => ({ ...p, category: String(p.category).toUpperCase(), price: `₹${Number(p.price).toLocaleString('en-IN')}`, tag: p.tag || 'NEW' }));
  return <div className="home-page">
    <section className="hero-section">
      <div className="hero-copy"><p className="eyebrow">THE EVERYDAY EDIT · 2026</p><h1>Wear what<br />feels <em>like you.</em></h1><p className="hero-description">Considered essentials, easy layers and feel-good pieces made for wherever the day takes you.</p><div className="hero-actions"><a className="button button-dark" href="#new-arrivals">Shop the collection <span>↗</span></a><Link className="text-link" to="/women">Explore women</Link></div><div className="hero-note"><span className="note-stars">★★★★★</span><span>Loved for comfort. Made for real life.</span></div></div>
      <div className="hero-visual"><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1300&q=90" alt="Friends enjoying a relaxed fashion day"/><div className="hero-sticker"><span>GOOD</span><span>STYLE</span><span>GOOD DAY ↗</span></div><div className="hero-image-caption">A little less ordinary.</div></div>
    </section>
    <section className="benefits-row"><div><span>01</span><p>Thoughtful everyday design</p></div><div><span>02</span><p>Comfort comes first</p></div><div><span>03</span><p>Easy returns, easy living</p></div></section>
    <section className="collection-section" id="new-arrivals"><div className="section-heading"><div><p className="eyebrow">FRESH FINDS</p><h2>Meet your new favourites.</h2></div><Link className="text-link" to="/women">View all pieces ↗</Link></div><ProductGrid items={displayProducts.length ? displayProducts : products} onAddToCart={onAddToCart}/></section>
    <section className="category-banner"><div><p className="eyebrow">YOUR STYLE, YOUR RULES</p><h2>Good things<br/><em>come in every size.</em></h2><p>Find the fit, colour and feeling that works for you.</p></div><div className="category-links"><Link to="/men">Shop men <span>↗</span></Link><Link to="/women">Shop women <span>↗</span></Link><Link to="/kids">Shop kids <span>↗</span></Link></div></section>
  </div>;
}
