import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
    FixDesk
      </Link>
      <div className="nav-links">
        <Link to="/admin" className='nav-link'>Go to Admin Dashboard</Link>
        <Link to="/" className="nav-link">Tickets</Link>
        
      </div>
    </nav>
  );
}