import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  


  const handleLogin = async (event) => {
    event.preventDefault();

    // Get the values from your form inputs
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    try {
      // Send a POST request to your login API endpoint
      const response = await axios.post('http://localhost:8000/users/users/id/', {
        username, // or email
        password,
      });

      // If login is successful, redirect to the profile page.
      const authToken = response.data.access_token;
      localStorage.setItem('authToken', authToken);

      // Redirect to the profile page
      navigate('/profile');
     
    } catch (error) {
      // Handle errors here
      if (error.response) {
        setError(error.response.data.message || 'Login failed!');
      } else if (error.request) {
        console.log(error.request);
        setError('No response from the server.');
      } else {
        console.log('Error', error.message);
        setError('Login request failed.');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;