import React from 'react';
import { Navigate } from 'react-router-dom';
import { useInspectorStore } from '@/stores/inspector.store';
import { type AuthRoleType } from '@/common/types/auth-role.type';
import RouteLoading from '@/components/common/loadings/route.loading';

interface PrivateRouteProps {
  children: React.ReactNode;
  roles: AuthRoleType[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const { inspector } = useInspectorStore();

  if (inspector === undefined) {
    return <RouteLoading />;
  }

  if (!inspector || !inspector.auth || !inspector.auth.role) {
    return <Navigate to="/auth/login" replace />;
  }

  const userRole = inspector.auth.role;

  if (roles.includes('super_admin')) {
    if (userRole === 'super_admin') {
      return <>{children}</>;
    }
  }

  if (!roles.includes(userRole)) {
    return <Navigate to="/404" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;