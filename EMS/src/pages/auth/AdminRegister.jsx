import React, { useState } from 'react';
import AuthLayout from '../../components/auth/AuthLayout.jsx';
import { useApp } from '../../context/AppContext.jsx';

const AdminRegister = () => {
  const { register } = useApp();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      register({ ...form, role: 'admin', skills: [] });
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout role="admin" mode="register">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="auth-input"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="auth-input"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="auth-input"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="auth-submit">
          Register Admin
        </button>
        {error && <div className="auth-error">{error}</div>}
      </form>
    </AuthLayout>
  );
};

export default AdminRegister;

