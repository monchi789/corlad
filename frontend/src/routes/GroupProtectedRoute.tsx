import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../pages/dashboard/contexts/AuthContext';

interface GroupProtectedRouteProps {
  children: React.ReactElement;
  allowedGroups: string[];
}

export const GroupProtectedRoute: React.FC<GroupProtectedRouteProps> = ({ children, allowedGroups }) => {
  const { isAuthenticated, hasGroup } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  } 

  const hasAllowedGroup = allowedGroups.some(group => hasGroup(group));

  if (!hasAllowedGroup) {
    return <Navigate to="/no-autorizado" replace />;
  }

  return children;
};