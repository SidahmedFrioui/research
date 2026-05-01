import { createFileRoute } from '@tanstack/react-router'
import { ArticleDetails } from '@/features/articles/details/details'

export const Route = createFileRoute('/articles/$articleId')({
  component: ArticleDetails,
})