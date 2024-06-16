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
  const [filters, setFilters] = useState({
    ano: 'Todos os anos',
    plataforma: 'Todas as plataformas',
    genero: 'Todos os gêneros'
  });
  const [filteredResults, setFilteredResults] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const query = useQuery().get('query');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let url = `https://api-ultimate-catalog.onrender.com/game/titulo/${encodeURIComponent(query)}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Falha ao buscar os jogos');
        }
        const data = await response.json();
        
        setSearchResults(data);
        setFilteredResults(data); // Inicialmente, os resultados filtrados são iguais aos resultados da pesquisa
        setFiltersApplied(false);
      } catch (error) {
        console.error('Erro ao buscar os jogos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [query]);

  const applyFilters = () => {
    let results = searchResults;

    if (filters.ano !== 'Todos os anos') {
      results = results.filter(game => game.anoLancamento === filters.ano);
    }
    if (filters.plataforma !== 'Todas as plataformas') {
      results = results.filter(game => game.plataforma.includes(filters.plataforma));
    }
    if (filters.genero !== 'Todos os gêneros') {
      results = results.filter(game => game.genero.includes(filters.genero));
    }

    setFilteredResults(results);
    setFiltersApplied(true);
  };

  return (
    <div className="search-page">
      <div className="search-bar-wrapper">
        <SearchBar /> {/* Barra de busca centralizada */}
      </div>

      <div className="filters">
        <div className="option-filters">
        <select name="ano" value={filters.ano} onChange={(e) => setFilters({ ...filters, ano: e.target.value })}>
          <option value="Todos os anos">Todos os anos</option>
          {Array.from({ length: 12 }, (_, i) => 2013 + i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select name="plataforma" value={filters.plataforma} onChange={(e) => setFilters({ ...filters, plataforma: e.target.value })}>
          <option value="Todas as plataformas">Todas as plataformas</option>
          <option value="PS4">PS4</option>
          <option value="PS5">PS5</option>
          <option value="Switch">Switch</option>
          <option value="Xbox One">Xbox One</option>
          <option value="PC">PC</option>
          <option value="Mobile">Mobile</option>
        </select>
        <select name="genero" value={filters.genero} onChange={(e) => setFilters({ ...filters, genero: e.target.value })}>
          <option value="Todos os gêneros">Todos os gêneros</option>
          <option value="Ação">Ação</option>
          <option value="RPG">RPG</option>
          <option value="Aventura">Aventura</option>
          <option value="Estratégia">Estratégia</option>
        </select>
        </div>
        <button onClick={applyFilters} className="btn-filter">Adicionar Filtro</button>
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
          {filtersApplied && filteredResults.length === 0 && (
            <h3 className="search-results-message">
              Nenhum resultado encontrado para os filtros aplicados.
            </h3>
          )}
          {(filtersApplied ? filteredResults : searchResults).length > 0 ? (
            <div className="games-container">
              {(filtersApplied ? filteredResults : searchResults).map((game) => (
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
