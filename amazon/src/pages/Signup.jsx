import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Signup = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <header className="auth-header">
          <h2>Sign Up</h2>
          <p>Create your account to track progress and save games.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            Full name
            <input type="text" name="name" placeholder="Your name" required />
          </label>
          <label className="auth-field">
            Email
            <input type="email" name="email" placeholder="you@example.com" required />
          </label>
          <label className="auth-field">
            Password
            <input type="password" name="password" placeholder="Create a password" required />
          </label>
          <label className="auth-field">
            Confirm password
            <input type="password" name="confirmPassword" placeholder="Repeat your password" required />
          </label>
          <button type="submit" className="auth-submit">Create account</button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
