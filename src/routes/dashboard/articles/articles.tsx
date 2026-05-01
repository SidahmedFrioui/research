import { ArticlesList } from '#/features/dashboard/articles'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/articles/articles')({
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
  component: ArticlesList,
})