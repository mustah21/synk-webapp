import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to='/' className='navbar_Link'>
        <span className="navbar_logo">SYNK</span>
      </Link>
      <div className="navbar_links">
        {/* <Link to="/events">Events</Link>
        <Link to="/communities">Communities</Link> */}

        <Link href="discover">Discover</Link>

        {isAuth ? (
          <button className="navbar_cta" onClick={handleLogout}>Log out</button>
        ) : (
          <Link to='/auth'><button className="navbar_cta">Sign in</button></Link>
        )}
      </div>
    </nav>
  );
}