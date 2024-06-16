import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const deslogar = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li className='main-title'>
          <Link to="/" className="title-link">
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
          {isLoggedIn ? (
            <button className="logout-button" onClick={deslogar}>
              Log Out
            </button>
          ) : (
            <button className="login-button" onClick={() => navigate('/login')}>
              Go to Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
