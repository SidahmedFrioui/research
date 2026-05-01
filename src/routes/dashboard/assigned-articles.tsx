import { createFileRoute, redirect } from '@tanstack/react-router'
import { AssignedArticles } from '#/features/dashboard/assigned-articles'

export const Route = createFileRoute('/dashboard/assigned-articles')({
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
  component: AssignedArticles,
})