import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    try {
      // Adjust the URL to match the Djoser's token login endpoint
      const response = await axios.post('http://localhost:8000/auth/token/login/', {
        username,
        password,
      });
      // Save user ID if login is successful
      const userId = response.data.id;
      localStorage.setItem('userId', userId);
      // Djoser returns a token named 'auth_token', not 'access_token'
      const authToken = response.data.auth_token;
      localStorage.setItem('authToken', authToken);

      // Optionally set the token to axios defaults here if you use axios throughout the app
      axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;

      navigate('/profile');
    } catch (error) {
      if (error.response) {
        // Djoser sends non_field_errors in the response when login fails
        setError(error.response.data.non_field_errors[0] || 'Login failed!');
      } else {
        // Network error or no response from the server
        setError('Login request failed.');
      }
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;