import React, { useState } from 'react';
import AuthLayout from '../../components/auth/AuthLayout.jsx';
import { useApp } from '../../context/AppContext.jsx';

const AdminLogin = () => {
  const { login } = useApp();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login({ ...form, role: 'admin' });
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout role="admin" mode="login">
      <form className="auth-form" onSubmit={handleSubmit}>
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
          Login as Admin
        </button>
        {error && <div className="auth-error">{error}</div>}
      </form>
    </AuthLayout>
  );
};

export default AdminLogin;

