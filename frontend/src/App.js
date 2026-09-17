import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import GiftList from './components/GiftList';

function App() {
  return (
    <Router>
      <div className="App">
        <header style={{ backgroundColor: '#4CAF50', padding: '20px', textAlign: 'center' }}>
          <h1 style={{ color: 'white', margin: '0' }}>GiftLink</h1>
          <p style={{ color: 'white', margin: '5px 0 0 0' }}>Share items, reduce waste, help the community</p>
          <nav style={{ marginTop: '15px' }}>
            <Link to="/" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Home</Link>
            <Link to="/register" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Register</Link>
            <Link to="/login" style={{ color: 'white', margin: '0 15px', textDecoration: 'none' }}>Login</Link>
          </nav>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/gifts" element={<GiftList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function LandingPage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px 20px' }}>
      <h2>Welcome to GiftLink</h2>
      <p style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '20px auto' }}>
        Connect with people who want to give away household items they no longer need.
        Find free items instead of purchasing new ones. Help reduce waste and build community.
      </p>
      <Link to="/gifts" style={{ 
        display: 'inline-block', 
        padding: '15px 30px', 
        backgroundColor: '#4CAF50', 
        color: 'white', 
        textDecoration: 'none', 
        borderRadius: '5px',
        fontSize: '18px',
        marginTop: '20px'
      }}>
        Get Started
      </Link>
    </div>
  );
}

export default App;
