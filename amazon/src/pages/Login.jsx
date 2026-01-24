import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <header className="auth-header">
          <h2>Login</h2>
          <p>Welcome back to your chess training hub.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            Email
            <input type="email" name="email" placeholder="you@example.com" required />
          </label>
          <label className="auth-field">
            Password
            <input type="password" name="password" placeholder="Enter your password" required />
          </label>
          <button type="submit" className="auth-submit">Login</button>
        </form>
        <p className="auth-footer">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
