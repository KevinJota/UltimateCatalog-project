import { useEffect, useState } from 'react';
import './user.css';
import CardGame from '../components/CardGame';

function User() {
  const [favoriteGames, setFavoriteGames] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteGames')) || [];
    setFavoriteGames(favorites);
  }, []);

  const updateFavorites = (updatedFavorites) => {
    setFavoriteGames(updatedFavorites);
  };

  return (
    <div className="user-container">
      <div className="logo-user">
        <div className="data-user">
          <img src="https://cdn-icons-png.flaticon.com/128/7915/7915522.png" alt="" />
        </div>
        <div className="data-user">
          <h1>Usuario 123</h1>
          <h2>email@gmail.com</h2>
        </div>
      </div>

      <h2>CONFIRA LOGO ABAIXO A SUA LISTA DE JOGOS FAVORITOS:</h2>

      {favoriteGames.length > 0 ? (
        <div className="games-container">
          {favoriteGames.map(game => (
            <CardGame
              key={game.id}
              id={game.id}
              title={game.title}
              description={game.description}
              imageUrl={game.imageUrl}
              updateFavorites={updateFavorites}
            />
          ))}
        </div>
      ) : (
        <div className="no-favorites">
          <img src="https://i.pinimg.com/originals/45/40/cf/4540cfd8909197c2559dd30a7234f63e.gif" alt="No favorites" />
          <h2>Aqui não tem nada.. Favorite os seus jogos preferidos para que eles apareçam aqui.</h2>
        </div>
      )}
    </div>
  );
}

export default User;
