import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  // State for signup form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Separate state for confirm password
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to store error messages
  const navigate = useNavigate();

  // Handle change in form fields
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value); // Separate handler for confirm password
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear previous errors

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      return; // Prevent the form from being submitted
    }

    const endpoint = 'http://localhost:8000/users/users/';
    const data = { username, email, password, re_password: confirmPassword };

    try {
      const response = await axios.post(endpoint, data);
      console.log('Signup Success:', response.data);
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      if (error.response) {
        // Extract error message from server response
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('Failed to sign up. Please try again later.');
      }
      console.error('Error during signup', error);
    }
  };

  // Form for signup
  return (
    <div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Username"
        />
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;