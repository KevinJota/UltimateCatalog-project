import { useState, useEffect } from 'react';
import './App.css';
import CardGame from './components/CardGame';
import { BiSearchAlt2 } from "react-icons/bi";

function App() {
  const [recentGames, setRecentGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileGames, setMobileGames] = useState([]);
  const [games2018, setGames2018] = useState([]);

  useEffect(() => {
    // Fetch para pegar todos os jogos e inverter a ordem para mostrar os mais recentes primeiro
    fetch('https://api-ultimate-catalog.onrender.com/game')
      .then(response => response.json())
      .then(data => {
        const reversedData = data.reverse();
        const limitedRecentGames = reversedData.slice(0, 5); // Limita a 5 jogos
        setRecentGames(limitedRecentGames);
        setLoading(false);
      })
      .catch(error => console.error(error));

    // Fetch para jogos de luta
    fetch('https://api-ultimate-catalog.onrender.com/game/plataforma/mobile')
      .then(response => response.json())
      .then(data => setMobileGames(data))
      .catch(error => console.error(error));

    // Fetch para jogos lançados em 2018
    fetch('https://api-ultimate-catalog.onrender.com/game/ano/2024')
      .then(response => response.json())
      .then(data => setGames2018(data))
      .catch(error => console.error(error));
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <img src="https://i.pinimg.com/originals/8c/ca/f4/8ccaf44f2a5af2e59dc72decab31a6b8.gif" alt="Loading" />
        <p>Carregando... aguarde</p>
      </div>
    );
  }

  return (
    <div className="app">
      <form className="busca-form">
        <input
          type="text"
          placeholder="Busque por um jogo"
        />
        <button type="submit">
          <BiSearchAlt2 />
        </button>
      </form>

      <div className='filters'>
        <select name="Opcoes" id="caixa_options">
          <option value="ano">Todos os anos</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
        <select name="Opcoes" id="caixa_options">
          <option value="plataforma">Todas as plataformas</option>
          <option value="PS4">PS4</option>
          <option value="PS5">PS5</option>
        </select>
        <select name="Opcoes" id="caixa_options">
          <option value="genero">Todos os gêneros</option>
          <option value="acao">Ação</option>
          <option value="rpg">RPG</option>
        </select>
      </div>

      <h2>Jogos Recentemente Adicionados ao catálogo</h2>
      <div className="games-container">
        {recentGames.map(game => (
          <CardGame
            key={game._id}
            id={game._id}
            title={game.title}
            description={game.description}
            imageUrl={game.imageUrl}
          />
        ))}
      </div>

      <h2>Confira a nossa sessão de jogos Mobile!</h2>
      <div className="games-container">
        {mobileGames.map(game => (
          <CardGame
            key={game._id}
            id={game._id}
            title={game.title}
            description={game.description}
            imageUrl={game.imageUrl}
          />
        ))}
      </div>

      <h2>Jogos Lançados em 2024:</h2>
      <div className="games-container">
        {games2018.map(game => (
          <CardGame
            key={game._id}
            id={game._id}
            title={game.title}
            description={game.description}
            imageUrl={game.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
