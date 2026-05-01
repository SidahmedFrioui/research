import { createFileRoute, redirect } from '@tanstack/react-router'
import { Reviews } from '@/features/dashboard/reviews'

export const Route = createFileRoute('/dashboard/reviews')({
  beforeLoad: ({ context, location }) => {
      if (context.auth?.isPending) {
        return
      }
  
      if (!context.auth?.isAuthenticated) {
        throw redirect({
          to: '/auth/sign-in',
          search: {
            redirect: location.pathname,
          },
        })
      }
    },
  component: Reviews,
})