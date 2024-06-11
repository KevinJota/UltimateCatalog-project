import './login.css';
import { Link } from 'react-router-dom'; // Certifique-se de importar Link

function Login() {
  return (
    <div className="login-page">
      <Link to="/" className="back-to-home"> <img src="https://cdn-icons-png.flaticon.com/128/45/45699.png" alt="" /> Retornar à página inicial</Link>
      <div className="login-container">
        <form action="login">
          <div className="form__group field">
            <input type="text" className="form__field" placeholder="Email" required />
            <label htmlFor="name" className="form__label">Email</label>
          </div>
          <div className="form__group field">
            <input type="password" className="form__field" placeholder="Senha" required />
            <label htmlFor="name" className="form__label">Senha</label>
          </div>
          <a className="btn-log" href="#">Fazer Login</a>
          <p>
            Não possui uma conta ainda? <a href="#">Clique aqui</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

