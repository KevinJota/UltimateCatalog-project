import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './user.css';
import CardGame from '../components/CardGame';

function User() {
  const [user, setUser] = useState(null);
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      fetchFavoriteGames(user._id);
    } else {
      navigate('/login'); // Redirecionar para o login se o usuário não estiver logado
    }
  }, [navigate]);

  const fetchFavoriteGames = async (userId) => {
    try {
      const response = await fetch(`https://api-ultimate-catalog.onrender.com/user/${userId}/favorites`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar jogos favoritos');
      }

      const games = await response.json();
      setFavoriteGames(games);
    } catch (error) {
      console.error('Erro ao buscar jogos favoritos:', error);
    } finally {
      setLoading(false); // Marcar o carregamento como concluído, independentemente do resultado
    }
  };

  const handleUnfavorite = (gameId) => {
    setFavoriteGames((prevFavorites) => prevFavorites.filter((game) => game._id !== gameId));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <img src="https://i.pinimg.com/originals/66/89/dc/6689dc331be27e66349ce9a4d15ddff3.gif" alt="Loading" />
        <p>Carregando... aguarde</p>
      </div>
    );
  }

  return (
    <div className="user-container">
      <div className="logo-user">
        <div className="data-user">
          <img src="https://cdn-icons-png.flaticon.com/128/7915/7915522.png" alt="User Logo" />
        </div>
        <div className="data-user">
          <h1>{user.username}</h1>
          <h2>{user.email}</h2>
        </div>
      </div>

      <h2>Confira aqui os seus Jogos Favoritos:</h2>

      {favoriteGames.length > 0 ? (
        <div className="games-container">
          {favoriteGames.map((game) => (
            <CardGame
              key={game._id}
              id={game._id}
              title={game.title}
              description={game.description}
              imageUrl={game.imageUrl}
              onUnfavorite={handleUnfavorite}
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


