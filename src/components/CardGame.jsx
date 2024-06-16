/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './cardgame.css';

const CardGame = ({ id, title, description, imageUrl, onUnfavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false); // Estado para controlar a exibição do alerta

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsFavorite(user.favoriteGames.includes(id));
    }
  }, [id]);

  const toggleFavorite = async (e) => {
    e.preventDefault(); // Previne a navegação ao clicar no ícone

    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      setShowLoginAlert(true); // Exibe o alerta personalizado
      return;
    }

    const user = JSON.parse(storedUser);
    try {
      if (isFavorite) {
        const response = await fetch(`https://api-ultimate-catalog.onrender.com/user/${user._id}/favorites/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao desfavoritar o jogo');
        }

        setIsFavorite(false);

        // Chamar a função onUnfavorite passada como prop
        if (onUnfavorite) {
          onUnfavorite(id);
        }
      } else {
        const response = await fetch(`https://api-ultimate-catalog.onrender.com/user/${user._id}/favorites/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao favoritar o jogo');
        }

        setIsFavorite(true);
      }

      // Atualiza o localStorage
      const updatedFavorites = isFavorite
        ? user.favoriteGames.filter(gameId => gameId !== id)
        : [...user.favoriteGames, id];
      const updatedUser = { ...user, favoriteGames: updatedFavorites };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Erro ao favoritar/desfavoritar o jogo:', error);
    }
  };

  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  return (
    <>
      {showLoginAlert && (
        <div className="alerta-fundo">
          <div className="alerta-box">
            <p>Você precisar estar logado em sua conta para favoritar jogos.</p>
            <button onClick={() => setShowLoginAlert(false)}>Ok</button>
          </div>
        </div>
      )}
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
    </>
  );
};

export default CardGame;
