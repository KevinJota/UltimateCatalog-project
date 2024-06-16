import { useState, useEffect } from 'react';
import './App.css';
import CardGame from './components/CardGame';
import SearchBar from './components/SearchBar';
import Loading from './components/Loading';

function App() {
  const [recentGames, setRecentGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileGames, setMobileGames] = useState([]);
  const [games2024, setGames2024] = useState([]);
  const [psGames, setPsGames] = useState([]);
  const [switchGames, setSwitchGames] = useState([]);
  const [showMoreMobile, setShowMoreMobile] = useState(false);
  const [showMorePS, setShowMorePS] = useState(false);
  const [showMoreSwitch, setShowMoreSwitch] = useState(false);
  const [showMore2024, setShowMore2024] = useState(false);

  useEffect(() => {
    // isso aqui é fetch p/ jogos mais recentes adicionados ao catalog
    fetch('https://api-ultimate-catalog.onrender.com/game')
      .then(response => response.json())
      .then(data => {
        const reversedData = data.reverse();
        const limitedRecentGames = reversedData.slice(0, 6); // Limita a 6 jogos
        setRecentGames(limitedRecentGames);
        setLoading(false);
      })
      .catch(error => console.error(error));

    // Fetch para jogos de plataforma mobile
    fetch('https://api-ultimate-catalog.onrender.com/game/plataforma/mobile')
      .then(response => response.json())
      .then(data => setMobileGames(data))
      .catch(error => console.error(error));

    // Fetch para jogos lançados em 2024
    fetch('https://api-ultimate-catalog.onrender.com/game/ano/2024')
      .then(response => response.json())
      .then(data => setGames2024(data))
      .catch(error => console.error(error));

    // Fetch para jogos de plataforma PlayStation
    fetch('https://api-ultimate-catalog.onrender.com/game/plataforma/ps')
      .then(response => response.json())
      .then(data => setPsGames(data))
      .catch(error => console.error(error));

    // Fetch para jogos de plataforma Switch
    fetch('https://api-ultimate-catalog.onrender.com/game/plataforma/switch')
      .then(response => response.json())
      .then(data => setSwitchGames(data))
      .catch(error => console.error(error));
  }, []);

  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="app">
      <SearchBar /> 
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
        {mobileGames.slice(0, showMoreMobile ? mobileGames.length : 6).map(game => (
          <CardGame
            key={game._id}
            id={game._id}
            title={game.title}
            description={game.description}
            imageUrl={game.imageUrl}
          />
        ))}
      </div>
      <button id='view-more' onClick={() => setShowMoreMobile(!showMoreMobile)}>
        {showMoreMobile ? 'Ver Menos' : 'Ver Mais'}
      </button>

      <h2>Jogos Lançados em 2024:</h2>
      <div className="games-container">
        {games2024.slice(0, showMore2024 ? games2024.length : 6).map(game => (
          <CardGame
            key={game._id}
            id={game._id}
            title={game.title}
            description={game.description}
            imageUrl={game.imageUrl}
          />
        ))}
      </div>
      <button id='view-more' onClick={() => setShowMore2024(!showMore2024)}>
        {showMore2024 ? 'Ver Menos' : 'Ver Mais'}
      </button>

      <h2>Jogos para PlayStation</h2>
      <div className="games-container">
        {psGames.slice(0, showMorePS ? psGames.length : 6).map(game => (
          <CardGame
            key={game._id}
            id={game._id}
            title={game.title}
            description={game.description}
            imageUrl={game.imageUrl}
          />
        ))}
      </div>
      <button id='view-more' onClick={() => setShowMorePS(!showMorePS)}>
        {showMorePS ? 'Ver Menos' : 'Ver Mais'}
      </button>

      <h2>Jogos para Switch</h2>
      <div className="games-container">
        {switchGames.slice(0, showMoreSwitch ? switchGames.length : 6).map(game => (
          <CardGame
            key={game._id}
            id={game._id}
            title={game.title}
            description={game.description}
            imageUrl={game.imageUrl}
          />
        ))}
      </div>
      <button id='view-more' onClick={() => setShowMoreSwitch(!showMoreSwitch)}>
        {showMoreSwitch ? 'Ver Menos' : 'Ver Mais'}
      </button>
    </div>
  );
}

export default App;

