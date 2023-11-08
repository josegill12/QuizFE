import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import QuizComponent from './components/QuizComponent';
import Home from './components/HomePage';
import Nav from './components/Nav';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';




function App() {
  return (
    <Router>
        <Nav />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quiz" element={<QuizComponent />} />
        </Routes>
      </div>
      <div><p>
        <Link to="/">Home</Link> | <Link to="/quiz">Quiz</Link>
        </p>
        </div>
      </Router>
   
  );
}

export default App;
