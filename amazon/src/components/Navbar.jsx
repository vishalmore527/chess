import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `navbar-link${isActive ? ' active' : ''}`;
  const ctaLinkClass = ({ isActive }) =>
    `navbar-link navbar-cta${isActive ? ' active' : ''}`;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ♔ Chess Game
        </Link>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/#game" className="navbar-link">Play</Link>
          </li>
          <li className="navbar-item">
            <Link to="/#tutorials" className="navbar-link">Tutorials</Link>
          </li>
          <li className="navbar-item">
            <NavLink to="/login" className={navLinkClass}>Login</NavLink>
          </li>
          <li className="navbar-item">
            <NavLink to="/signup" className={ctaLinkClass}>Sign Up</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
