// src/components/layout/breadcrumbMap.ts
// Static breadcrumb map for routes

export const breadcrumbMap: Record<
  string,
  { label: string; to: string | null }
> = {
  '/': { label: 'Home', to: '/' },
  '/landing/properties': { label: 'Properties', to: '/landing/properties' },
  // Add more routes as needed
}
