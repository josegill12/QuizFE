import React, { useState } from 'react';
// import "./App.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  // State for login form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle change in forms fields
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = 'http://localhost:8000/users/token/login/';
    const data = { email: username, password,  };
   
    try {
      const response = await axios.post(endpoint, data);
      const token = response.data;
   
      localStorage.setItem('authToken', token.auth_token);
   
      // Include the JWT in the Authorization header for subsequent requests
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
   
      console.log('Success:', token);
      navigate('/profile');
    } catch (error) {
      console.error('Error during form submission', error);
    }
  };

  // Form for login
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default HomePage;