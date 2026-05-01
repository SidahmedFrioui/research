import { createFileRoute, redirect } from '@tanstack/react-router';
import { SignIn } from '@/features/auth/signin/signin';

export const Route = createFileRoute('/auth/sign-in')({ 
    
    beforeLoad: ({ context }) => {
          if (context.auth?.isPending) {
            return
          }
      
          if (!context.auth?.isAuthenticated) {
            throw redirect({
              to: '/',
              search: {},
            })
          }
        },
    component: SignIn })