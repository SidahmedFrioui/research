import { redirect } from '@tanstack/react-router';
import type { Role } from '#/types/user';

interface GuardOptions {
  isAuthenticated: boolean;
  userRole?: Role;
  requiredRole?: Role | Role[];
  fallback?: string;
}

export const authGuard = ({ 
  isAuthenticated, 
  currentPath, 
  fallback = '/auth/sign-in' 
}: GuardOptions & { currentPath: string }) => {
  
  // If already at the fallback, don't redirect again
  if (currentPath.includes(fallback)) return;

  if (!isAuthenticated) {
    throw redirect({
      to: fallback,
      search: {
        redirect: currentPath,
      },
    });
  }
};