import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/manage/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/manage/users"!</div>
}
