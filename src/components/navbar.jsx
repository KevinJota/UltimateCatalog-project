// import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li className='main-title'>
          <Link to="/" className="navbar-link">
            <h2 className="navbar-subtitle">Ultimate Catalog</h2>
            <h1 className="navbar-title">SeeMy Games</h1>
          </Link>
        </li> 
        <li className='options-user'>
          <img
            className='favorite-logo'
            src="https://cdn-icons-png.flaticon.com/128/2195/2195143.png"
            alt="Favorite Logo"
            onClick={() => navigate('/User')}
            style={{ cursor: 'pointer' }}
          />
          <button className="login-button" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
