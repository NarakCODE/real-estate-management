import { PageBreadcrumbs } from '@/components/layout/PageBreadcrumbs'

export function PageHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <header className='mb-8'>
      <PageBreadcrumbs />
      <h1 className='text-foreground text-3xl font-bold tracking-tight'>
        {title}
      </h1>
      <p className='text-muted-foreground mt-2'>{subtitle}</p>
    </header>
  )
}
