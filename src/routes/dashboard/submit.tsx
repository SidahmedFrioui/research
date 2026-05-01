import { SubmitArticle } from '#/features/dashboard/article/submit'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/submit')({
  component: SubmitArticle,
})