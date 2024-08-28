import { useState } from 'react';
import { LoginContainer, LoginForm, Input, Button } from '../styles/Login';
import { setStorage } from '../utils/Stage';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateInputs = () => {
    if (!username || !password) {
      setError('Username and password are required.');
      return false;
    }
    if (username.length < 3 || password.length < 6) {
      setError('Username must be at least 3 characters and password at least 6 characters.');
      return false;
    }
    setError('');
    return true;
  };

  const validateResponse = (data) => {
    if (!data || typeof data.token !== 'string') {
      throw new Error('Invalid response from server.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateInputs()) return;

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const { token } = await response.json();
      validateResponse({ token });  // Valida a resposta do servidor

      setStorage('token', token); // Armazena o token no localStorage
      onLogin(); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button type="submit">Login</Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;

