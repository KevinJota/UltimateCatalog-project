// CardGame.jsx
import { Link } from 'react-router-dom';
import './cardgame.css';

// eslint-disable-next-line react/prop-types
const CardGame = ({ id, title, description, imageUrl }) => {
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
      </div>
    </Link>
  );
};

export default CardGame;




