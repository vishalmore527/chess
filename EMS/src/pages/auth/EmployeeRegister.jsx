import React, { useState } from 'react';
import AuthLayout from '../../components/auth/AuthLayout.jsx';
import { useApp } from '../../context/AppContext.jsx';

const EmployeeRegister = () => {
  const { register } = useApp();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    skills: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const skills = form.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: 'employee',
        skills,
      });
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout role="employee" mode="register">
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
        <div className="auth-field">
          <label htmlFor="skills">Skills (comma separated)</label>
          <input
            id="skills"
            name="skills"
            type="text"
            className="auth-input"
            placeholder="javascript, react, sql"
            value={form.skills}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="auth-submit">
          Register Employee
        </button>
        {error && <div className="auth-error">{error}</div>}
      </form>
    </AuthLayout>
  );
};

export default EmployeeRegister;

