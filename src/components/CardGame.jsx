// CardGame.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './cardgame.css';

// eslint-disable-next-line react/prop-types
const CardGame = ({ id, title, description, imageUrl, updateFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteGames')) || [];
    const isAlreadyFavorite = favorites.some(favorite => favorite.id === id);
    setIsFavorite(isAlreadyFavorite);
  }, [id]);

  const toggleFavorite = (e) => {
    e.preventDefault(); // Previne a navegação ao clicar no ícone
    const favorites = JSON.parse(localStorage.getItem('favoriteGames')) || [];
    const isAlreadyFavorite = favorites.some(favorite => favorite.id === id);

    let updatedFavorites;
    if (isAlreadyFavorite) {
      updatedFavorites = favorites.filter(favorite => favorite.id !== id);
      setIsFavorite(false);
    } else {
      const newFavorite = { id, title, description, imageUrl };
      updatedFavorites = [...favorites, newFavorite];
      setIsFavorite(true);
    }

    localStorage.setItem('favoriteGames', JSON.stringify(updatedFavorites));
    if (updateFavorites) {
      updateFavorites(updatedFavorites);
    }
  };

  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  return (
    <Link to={`/details/${id}`} className="card-link">
      <div className="card-container">
        <div className="flip">
          <div className="front" style={{ backgroundImage: `url(${imageUrl})` }}></div>
          <div className="back">
            <h3>{title}</h3>
            <p>{truncateDescription(description, 75)}</p>
          </div>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/128/4886/4886281.png"
          alt="Favorite"
          className={`favorite-icon ${isFavorite ? 'favorite-active' : ''}`}
          onClick={toggleFavorite}
        />
      </div>
    </Link>
  );
};

export default CardGame;

