import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './details.css'; // Manter o arquivo de estilos para outros estilos

function Details() {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);

  useEffect(() => {
    fetch(`https://api-ultimate-catalog.onrender.com/game/${id}`)
      .then(response => response.json())
      .then(data => setGameDetails(data))
      .catch(error => console.error('Erro ao buscar detalhes do jogo:', error));
  }, [id]);

  if (!gameDetails) {
    return (
      <div className="loading-container">
        <img src="https://i.pinimg.com/originals/8c/ca/f4/8ccaf44f2a5af2e59dc72decab31a6b8.gif" alt="Loading" />
        <p>Carregando.. aguarde</p>
      </div>
    );
  }

  const getIdadeClassify = (classification) => {
    switch (classification) {
      case 'L':
        return { backgroundColor: 'green' };
      case '10':
        return { backgroundColor: 'blue' };
      case '12':
        return { backgroundColor: 'yellow' };
      case '14':
        return { backgroundColor: 'orange' };
      case '16':
        return { backgroundColor: 'red' };
      case '18':
        return { backgroundColor: 'black' };
      default:
        return {};
    }
  };

  return (
    <div className="details-container">
      <div className="game-data-main">
        <img src={gameDetails.imageUrl} alt={gameDetails.title} width={"200px"} />
        <div className="game-data-titles">
          <h3>{gameDetails.title}</h3>
          <h4>lançado em: {gameDetails.anoLancamento}</h4>
          <div className="bloco-idade" style={getIdadeClassify(gameDetails.classificacaoEtaria)}>
            <h3>{gameDetails.classificacaoEtaria}</h3>
          </div>
        </div>
      </div>
      <h4> <strong>plataforma(s): {gameDetails.plataforma}</strong></h4>
      <h4> <strong>gênero: {gameDetails.genero}</strong></h4>
      <p>{gameDetails.description}</p>
      <h3>Confira logo abaixo o trailer do jogo:</h3>
      <iframe src={gameDetails.trailerUrl}></iframe>
    </div>
  );
}

export default Details;
