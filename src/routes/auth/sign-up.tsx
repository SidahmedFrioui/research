import { createFileRoute } from '@tanstack/react-router'
import { SignUp } from '@/features/auth/signup/signup'

export const Route = createFileRoute('/auth/sign-up')({
  component: SignUp,
})
