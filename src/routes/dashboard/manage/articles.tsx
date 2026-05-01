import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/manage/articles')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/manage/articles"!</div>
}
