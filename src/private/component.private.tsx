import React from 'react';
import { useInspectorStore } from '@/stores/inspector.store';
import { type AuthRoleType } from '@/common/types/auth-role.type';
import ComponentLoading from '@/components/common/loadings/component.loading';

interface PrivateComponentProps {
  children: React.ReactNode;
  roles: AuthRoleType[];
}

const PrivateComponent: React.FC<PrivateComponentProps> = ({ children, roles }) => {
  const { inspector } = useInspectorStore();

  if (inspector === undefined) {
    return <ComponentLoading />;
  }

  if (!inspector || !inspector.auth || !inspector.auth.role) {
    return null;
  }

  const userRole = inspector.auth.role;

  if (roles.includes('super_admin')) {
    if (userRole === 'super_admin') {
      return <>{children}</>;
    }
  }

  if (!roles.includes(userRole)) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateComponent;