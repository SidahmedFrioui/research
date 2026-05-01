import { createFileRoute, redirect } from '@tanstack/react-router'
import { SubmitDecision } from '@/features/dashboard/reviews/submit-decision'

export const Route = createFileRoute('/dashboard/submit-decision')({
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
  component: SubmitDecision,
})