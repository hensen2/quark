import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/products')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_public/products"!</div>
}
