import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/articles/$articleId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/articles/$articleId"!</div>
}
