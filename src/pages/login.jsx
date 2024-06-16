import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api-ultimate-catalog.onrender.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Save the token in localStorage
      localStorage.setItem('user', JSON.stringify(data.user)); // Save user data in localStorage
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-page">
      <Link to="/" className="back-to-home">
        <img src="https://cdn-icons-png.flaticon.com/128/45/45699.png" alt="Back to home" /> Retornar à página inicial
      </Link>
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <h3>Conecte-se agora a sua conta <strong>SeeMy Games</strong> e acesse os recursos disponiveis em nosso site!</h3>
          <div className="form__group field">
            <input type="email" className="form__field" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="email" className="form__label">Email</label>
          </div>
          <div className="form__group field">
            <input type="password" className="form__field" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label htmlFor="password" className="form__label">Senha</label>
          </div>
          <button type="submit" className="btn-log">Fazer Login</button>
          <p>
            Não possui uma conta ainda? <Link to="/create">Clique aqui</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
