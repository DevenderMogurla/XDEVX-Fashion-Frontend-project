import { Link, NavLink } from 'react-router-dom';
import '../static/Nav.css';

export default function Nav({ cartCount = 0 }) {
  return (
    <header className="site-header">
      <nav className="nav" aria-label="Main navigation">
        <Link className="nav-logo" to="/" aria-label="XDEVX home">XDEVX<span className="logo-dot">.</span></Link>
        <div className="nav-link">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/men">Men</NavLink>
          <NavLink to="/women">Women</NavLink>
          <NavLink to="/kids">Kids</NavLink>
        </div>
        <div className="nav-btn">
          <Link className="nav-login" to="/login">Log in</Link>
          <Link className="nav-register" to="/reg">Sign up</Link>
          <span className="cart-pill" title="Demo cart count">Bag ({cartCount})</span>
        </div>
      </nav>
    </header>
  );
}
