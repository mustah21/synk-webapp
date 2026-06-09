// Navbar.jsx
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">

      <span className="navbar_logo">SYNK</span>
      <div className="navbar_links">
        <a href="#">Discover</a>
        <a href="#">Pricing</a>
        <a href="#">App</a>
      </div>
      <button className="navbar_cta">Sign up</button>
    
    </nav>
  );
}