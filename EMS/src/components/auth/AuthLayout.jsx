import React from 'react';
import { Link } from 'react-router-dom';
import './AuthLayout.css';

const roleLabel = (role) => {
  if (role === 'admin') return 'Admin';
  if (role === 'manager') return 'Manager';
  if (role === 'employee') return 'Employee';
  return 'User';
};

const AuthLayout = ({ role, mode, children }) => {
  const oppositeMode = mode === 'login' ? 'register' : 'login';
  const oppositeLabel = mode === 'login' ? 'Create one' : 'Already registered?';

  const base = `/${role}`;

  return (
    <section className="auth-page">
      <div className="auth-card">
        <header className="auth-header">
          <p className="role-tag">{roleLabel(role)} Portal</p>
          <h2>{mode === 'login' ? 'Sign in' : 'Register'}</h2>
          <p className="auth-sub">
            {mode === 'login'
              ? 'Access your dashboard and manage tasks.'
              : 'Create an account for the role below.'}
          </p>
        </header>
        <div className="auth-body">{children}</div>
        <footer className="auth-footer">
          <span>{oppositeLabel}</span>{' '}
          <Link to={`${base}/${oppositeMode}`}>
            {mode === 'login' ? 'Register' : 'Login'}
          </Link>
        </footer>
      </div>
    </section>
  );
};

export default AuthLayout;

