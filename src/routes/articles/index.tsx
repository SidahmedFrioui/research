import { createFileRoute } from '@tanstack/react-router'
import { Articles } from '@/features/articles/list/list'

export const Route = createFileRoute('/articles/')({
  component: Articles,
})