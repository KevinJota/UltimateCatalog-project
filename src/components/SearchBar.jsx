import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import "../pages/search.css"

function SearchBar() {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const searchQuery = event.target.elements.searchInput.value;
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form className="busca-form" onSubmit={handleSearch}>
      <input
        type="text"
        name="searchInput"
        placeholder="Busque por um jogo"
      />
      <button type="submit">
        <BiSearchAlt2 />
      </button>
    </form>
  );
}

export default SearchBar;
