import { Dashboard } from '#/features/dashboard/main'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
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
  component: Dashboard,
})