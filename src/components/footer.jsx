
import './footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
      <ul className="menu">
        <li className="menu__item"><Link className="menu__link" to="/">Home</Link></li>
        <li className="menu__item"><a className="menu__link" href="https://github.com/KevinJota/UltimateCatalog-project" target="_blank" rel="noopener noreferrer">Github</a></li>
      </ul>
      <p>&copy;2024 Seemy_Games</p>
    </footer>
  );
}

export default Footer;


