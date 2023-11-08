import React, { useState, useEffect } from 'react';

const token = localStorage.getItem('authToken');
const Profile = () => {
 const [isEditing, setIsEditing] = useState(false);
 const [profile, setProfile] = useState({ username: '', email: '' });

 useEffect(() => {
  // Fetch the user's profile from the server and set it to the state
  // This is just a placeholder. Replace it with your actual API call
  fetch('http://localhost:8000/users/users/4/',{ headers: { 'Content-Type': 'application/json','Authorization': `Token ${token}` },})
    .then(response => response.json())
    .then(data => setProfile(data));
 }, []);
 
 const handleChange = (event) => {
  setProfile({ ...profile, [event.target.name]: event.target.value });
 };

 const handleSubmit = (event) => {
  event.preventDefault();
  // Save the updated profile to the server
  // This is just a placeholder. Replace it with your actual API call
  fetch('http://localhost:8000/users/users/4/', { 
  method: 'PUT',
    headers: { 'Content-Type': 'application/json',
    'Authorization': `Token ${token}` 
  },
    body: JSON.stringify(profile),
  });
  setIsEditing(false);
 };

 const handleDelete = () => {
  // Delete the user's profile from the server
  // This is just a placeholder. Replace it with your actual API call
  fetch('http://localhost:8000/users/users/4/', { 
  method: 'DELETE',
    headers: { 'Content-Type': 'application/json',
    'Authorization': `Token ${token}` 
  },
  }).then(() => {
    // Redirect to the home page
    window.location.href = '/';
  });
 };

 return (
  <div>
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