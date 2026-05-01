import { createFileRoute, redirect } from '@tanstack/react-router'
import { SignUp } from '@/features/auth/signup/signup'

export const Route = createFileRoute('/auth/sign-up')({
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
  component: SignUp,
})
