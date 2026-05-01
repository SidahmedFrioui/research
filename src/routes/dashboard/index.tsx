import { Dashboard } from '#/features/dashboard/main'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: Dashboard,
})