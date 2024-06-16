import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css'; // Reutilizar o mesmo arquivo CSS da página de login

function CreateLogin() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const criarConta = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setErrors({ password: 'A senha deve ter pelo menos 8 caracteres.' });
      return;
    }

    // Limpar erros de validação de antws
    setErrors({});

    try {
      const response = await fetch('https://api-ultimate-catalog.onrender.com/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar conta');
      }

      // Redirecionar para a página de login após criar a conta
      navigate('/login');
    } catch (error) {
      console.error('Erro ao criar conta:', error);
      if (error.message.includes('email')) {
        setErrors({ email: 'Este email já está sendo usado.' });
      } else {
        setErrors({ general: error.message || 'Erro ao criar conta. Por favor, tente novamente.' });
      }
    }
  };

  return (
    <div className="login-page">
      <Link to="/" className="back-to-home">
        <img src="https://cdn-icons-png.flaticon.com/128/45/45699.png" alt="Back to home" /> Retornar à página inicial
      </Link>
      <div className="login-container">
        <form onSubmit={criarConta}>
          <h3>Crie sua nova conta <strong>SeeMy Games!</strong></h3>
          <div className="form__group field">
            <input
              type="text"
              className="form__field"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username" className="form__label">Nome de usuário</label>
          </div>
          <div className="form__group field">
            <input
              type="email"
              className="form__field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email" className="form__label">Email</label>
            {errors.general && <p className="error-label">{errors.general}</p>}
          </div>
          <div className="form__group field">
            <input
              type="password"
              className="form__field"
              placeholder="Senha (mínimo 8 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password" className="form__label">Senha (mínimo 8 caracteres)</label>
            {errors.password && <label className="error-label">{errors.password}</label>}
          </div>
          <button type="submit" className="btn-log">Criar Conta</button>
          <p>
            Já possui uma conta em nosso site? <Link to="/login">Faça login aqui</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CreateLogin;
