import { SubmitArticle } from '#/features/dashboard/article/submit'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/submit')({
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
  component: SubmitArticle,
})