import React, { useState, useEffect } from 'react';
import axios from 'axios';

// We'll assume you have a function to get the current user's profile URL
const getProfileUrl = () => 'http://localhost:8000/users/user/';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the user's profile from the server and set it to the state
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');
    if ( userId && token) {
      axios.get(`http://localhost:8000/users/${userId}/`, {
        headers: {
          'Authorization': `Token ${token}`,
        },
    })
    .then(response => {
      setProfile(response.data);
    })
    .catch(error => {
      console.error('Error fetching profile:', error);
      setError('Error fetching profile data');
    });
    }
  }, []);

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');
    if ( userId && token) {
    axios.put(`http://localhost:8000/users/${userId}/`, profile, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      setProfile(response.data);
      setIsEditing(false);
    })
    .catch(error => {
      console.error('Error updating profile:', error);
      setError('Error updating profile data');
    });
    }
  };

  const handleDelete = () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');
    if ( userId && token) {
    axios.delete(`http://localhost:8000/users/${userId}/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
    .then(() => {
      // Remove the token and redirect to home page after deletion
      localStorage.removeItem('authToken');
      window.location.href = '/';
    })
    .catch(error => {
      console.error('Error deleting profile:', error);
      setError('Error deleting profile data');
    });
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          UserName:
          <input type="text" name="username" value={profile.username} onChange={handleChange} readOnly={!isEditing} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={profile.email} onChange={handleChange} readOnly={!isEditing} />
        </label>
        <button type="button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        <button type="submit" disabled={!isEditing}>Save</button>
        <button type="button" onClick={handleDelete}>Delete Profile</button>
      </form>
    </div>
  );
};

export default Profile;