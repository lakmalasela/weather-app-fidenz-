import React from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../api/authService';

export const ProtectedRoute = ({ children }) => {
  const token = authService.getAccessToken();

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};