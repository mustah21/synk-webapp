import './navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">

      <Link href='/' className='navbar_Link'><span className="navbar_logo">SYNK</span></Link>
      <div className="navbar_links">
        <Link href="discover">Discover</Link>
        <button className="navbar_cta">Sign up</button>
      </div>

    </nav>
  );
}