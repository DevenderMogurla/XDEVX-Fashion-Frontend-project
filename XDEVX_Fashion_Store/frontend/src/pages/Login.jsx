import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../static/Login.css';
import { api } from '../services/api.js';

export default function Login() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [message, setMessage] = useState(''); const [success, setSuccess] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await api.login({ email, password });
      setSuccess(true); setMessage(result.message);
      localStorage.setItem('xdevx_user', JSON.stringify(result.user));
    } catch (err) { setSuccess(false); setMessage(err.message); }
  };
  return <div className="auth-page login-page"><div className="auth-aside"><p className="eyebrow">GOOD TO SEE YOU AGAIN</p><h1>Style that<br/>feels like<br/><em>coming home.</em></h1><p>Your everyday favourites are waiting.</p><div className="aside-mark">X.</div></div><div className="login-container"><form className="login-form" onSubmit={handleSubmit}><p className="eyebrow">WELCOME BACK</p><h2 className="login-title">Log in to XDEVX</h2><p className="form-subtitle">Pick up right where you left off.</p><label className="login-label">Email address<input className="login-input" type="email" name="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required /></label><label className="login-label">Password<input className="login-input" type="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required /></label>{message && <p className={`form-message ${success ? 'success' : 'error'}`} role="status">{message}</p>}<button className="login-btn" type="submit">Log in <span>↗</span></button><p className="auth-switch">New to XDEVX? <Link to="/reg">Create an account</Link></p><p className="demo-note">Login is verified by the XDEVX backend.</p></form></div></div>;
}
