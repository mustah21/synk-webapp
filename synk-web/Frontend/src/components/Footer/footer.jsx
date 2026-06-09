import './footer.css';

export default function Footer() {
  return (

    <footer className="footer">
      <div className="footer_inner">
        <span className="footer_logo">SYNK</span>
        <p>© 2026 Synk. All rights reserved.</p>
        <nav className="footer_links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        
        </nav>
      </div>
    </footer>
  );
}