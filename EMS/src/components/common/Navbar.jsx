import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useApp();

  const role = currentUser?.role;

  return (
    <header className="top-nav">
      <div className="top-nav-inner">
        <Link to="/" className="brand">
          EMS<span>Tasks</span>
        </Link>
        <nav className="top-links">
          <NavLink to="/admin" className="nav-link">
            Admin
          </NavLink>
          <NavLink to="/manager" className="nav-link">
            Manager
          </NavLink>
          <NavLink to="/employee" className="nav-link">
            Employee
          </NavLink>
        </nav>
        <div className="top-user">
          {currentUser ? (
            <>
              <span className="user-pill">
                <span className="user-name">{currentUser.name}</span>
                <span className="user-role">
                  {role && role.charAt(0).toUpperCase() + role.slice(1)}
                </span>
              </span>
              <button
                type="button"
                className="ghost-btn"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <div className="top-auth-links">
              <NavLink to="/admin/login" className="ghost-btn small">
                Admin Login
              </NavLink>
              <NavLink to="/employee/login" className="ghost-btn small">
                Employee Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

