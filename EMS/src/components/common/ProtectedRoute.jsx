import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';

const ProtectedRoute = ({ allowedRoles }) => {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    const fallback =
      currentUser.role === 'admin'
        ? '/admin'
        : currentUser.role === 'manager'
        ? '/manager'
        : '/employee';
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

