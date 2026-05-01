import { createFileRoute } from '@tanstack/react-router'
import { Profile } from '@/features/auth/profile/profile'

export const Route = createFileRoute('/auth/profile')({
  component: Profile,
})