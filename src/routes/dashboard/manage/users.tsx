import { Users } from '#/features/dashboard/users'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/manage/users')({
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
  component: Users,
})