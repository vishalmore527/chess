import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ChessGame from '../components/ChessGame';
import Tutorials from '../components/Tutorials';
import './Home.css';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.hash]);

  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-hero-content">
          <div className="home-hero-text">
            <p className="home-badge">Welcome</p>
            <h2 className="home-title">Welcome to Chess Game</h2>
            <p className="home-subtitle">
              Play a quick match, learn the basics, and sharpen your skills.
            </p>
            <div className="home-actions">
              <Link to="/signup" className="home-action primary">
                Create Account
              </Link>
              <Link to="/login" className="home-action secondary">
                Login
              </Link>
            </div>
          </div>
          <div className="home-hero-card">
            <h3>Ready to play?</h3>
            <p>Jump into the board and start practicing right away.</p>
            <a href="#game" className="home-anchor">
              Start Playing
            </a>
          </div>
        </div>
      </section>

      <ChessGame />
      <Tutorials />
    </div>
  );
};

export default Home;
