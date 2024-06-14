import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CardGame from '../components/CardGame';
import SearchBar from '../components/SearchBar';
import './search.css'; // Certifique-se de ter um arquivo CSS para estilizar o componente

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery().get('query');

  useEffect(() => {
    if (query) {
      setLoading(true); // Inicia o carregamento
      const fetchData = async () => {
        try {
          const response = await fetch(`https://api-ultimate-catalog.onrender.com/game/titulo/${encodeURIComponent(query)}`);
          if (!response.ok) {
            throw new Error('Falha ao buscar os jogos');
          }
          const data = await response.json();
          setSearchResults(data);
        } catch (error) {
          console.error('Erro ao buscar os jogos:', error);
        } finally {
          setLoading(false); // Finaliza o carregamento
        }
      };
      fetchData();
    } else {
      setLoading(false); // Se não houver consulta, não está carregando
    }
  }, [query]);

  return (
    <div className="search-page">
      <div className="search-bar-wrapper">
        <SearchBar /> {/* Barra de busca centralizada */}
      </div>
      {loading ? (
        <div className="loading-container">
          <img src="https://i.pinimg.com/originals/8c/ca/f4/8ccaf44f2a5af2e59dc72decab31a6b8.gif" alt="Loading" />
          <p>Carregando... aguarde</p>
        </div>
      ) : (
        <div>
          {query && searchResults.length > 0 && (
            <h3 className="search-results-message">
              Resultados encontrados para: {query}
            </h3>
          )}
          {searchResults.length > 0 ? (
            <div className="games-container">
              {searchResults.map((game) => (
                <CardGame
                  key={game._id}
                  id={game._id}
                  title={game.title}
                  description={game.description}
                  imageUrl={game.imageUrl}
                />
              ))}
            </div>
          ) : (
            !loading && (
              <div className="no-results-container">
                <img src="https://i.pinimg.com/originals/01/ca/05/01ca051bd9cc85346b2144d218ad8e05.gif" alt="No Results" />
                <h2>Nenhum resultado foi encontrado.</h2>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Search;

