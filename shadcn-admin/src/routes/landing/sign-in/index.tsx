import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/landing/sign-in/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/landing/sign-in/"!</div>
}
