import { createFileRoute, redirect } from '@tanstack/react-router'
import { Profile } from '@/features/auth/profile/profile'

export const Route = createFileRoute('/auth/profile')({
  beforeLoad: ({ context }) => {
    if (context.auth?.isPending) {
      return
    }
  
    if (!context.auth?.isAuthenticated) {
      throw redirect({
        to: '/auth/sign-in',
      })
    }
  },
  component: Profile,
})