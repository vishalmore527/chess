import React from 'react';
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext.jsx';
import Navbar from './components/common/Navbar.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import AdminLogin from './pages/auth/AdminLogin.jsx';
import AdminRegister from './pages/auth/AdminRegister.jsx';
import ManagerLogin from './pages/auth/ManagerLogin.jsx';
import ManagerRegister from './pages/auth/ManagerRegister.jsx';
import EmployeeLogin from './pages/auth/EmployeeLogin.jsx';
import EmployeeRegister from './pages/auth/EmployeeRegister.jsx';
import AdminDashboard from './pages/dashboards/AdminDashboard.jsx';
import ManagerDashboard from './pages/dashboards/ManagerDashboard.jsx';
import EmployeeDashboard from './pages/dashboards/EmployeeDashboard.jsx';
import './App.css';

const Landing = () => {
  const { currentUser } = useApp();

  const defaultTarget =
    currentUser?.role === 'admin'
      ? '/admin'
      : currentUser?.role === 'manager'
      ? '/manager'
      : currentUser?.role === 'employee'
      ? '/employee'
      : null;

  if (defaultTarget) {
    return <Navigate to={defaultTarget} replace />;
  }

  return (
    <main className="landing">
      <div className="landing-inner">
        <section className="landing-copy">
          <h1>Role-based Task Allocation for Modern Teams</h1>
          <p>
            A minimal Employee Management System where Admins define work,
            Managers rebalance it, and Employees focus on execution. Difficulty
            and skills drive points, salary impact, and promotion readiness.
          </p>
          <div className="landing-actions">
            <Link className="primary-btn" to="/admin/login">
              Admin Portal
            </Link>
            <Link className="secondary-btn" to="/manager/login">
              Manager Portal
            </Link>
            <Link className="secondary-btn" to="/employee/login">
              Employee Portal
            </Link>
          </div>
        </section>
        <section className="landing-panels">
          <div className="panel">
            <h3>Admin</h3>
            <p>Create tasks with difficulty and skills. Auto-assign to the best
              employees.</p>
          </div>
          <div className="panel">
            <h3>Manager</h3>
            <p>Handle extension requests and reassign tasks to balance load.</p>
          </div>
          <div className="panel">
            <h3>Employee</h3>
            <p>See current tasks, request extensions, and track performance
              points.</p>
          </div>
        </section>
      </div>
    </main>
  );
};

const AppShell = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Landing />} />

      {/* Admin auth */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />

      {/* Manager auth */}
      <Route path="/manager/login" element={<ManagerLogin />} />
      <Route path="/manager/register" element={<ManagerRegister />} />

      {/* Employee auth */}
      <Route path="/employee/login" element={<EmployeeLogin />} />
      <Route path="/employee/register" element={<EmployeeRegister />} />

      {/* Protected dashboards */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
        <Route path="/manager" element={<ManagerDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['employee']} />}>
        <Route path="/employee" element={<EmployeeDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
);

const App = () => (
  <AppProvider>
    <AppShell />
  </AppProvider>
);

export default App;

