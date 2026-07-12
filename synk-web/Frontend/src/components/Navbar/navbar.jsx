import './navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">

      <Link href='/' className='navbar_Link'><span className="navbar_logo">SYNK</span></Link>
      <div className="navbar_links">
        <Link href="discover">Discover</Link>
        <Link to='/auth'><button className="navbar_cta">Sign in</button></Link>      </div>

    </nav>
  );
}