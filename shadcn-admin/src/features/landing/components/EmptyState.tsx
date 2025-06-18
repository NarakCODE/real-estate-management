import { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: {
    label: string
    to: string
    search?: Record<string, unknown>
    variant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive'
  }
  children?: ReactNode
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  children,
}: EmptyStateProps) {
  return (
    <div className='border-border bg-muted/30 flex min-h-[50vh] flex-col items-center justify-center rounded-lg border-2 border-dashed py-16 text-center'>
      {icon && (
        <div className='text-muted-foreground/60 mx-auto mb-4'>{icon}</div>
      )}

      <h3 className='text-foreground text-xl font-semibold'>{title}</h3>

      {description && (
        <p className='text-muted-foreground mt-2 max-w-md text-sm'>
          {description}
        </p>
      )}

      {action && (
        <Button variant={action.variant || 'outline'} className='mt-6' asChild>
          <Link to={action.to} search={action.search || {}}>
            {action.label}
          </Link>
        </Button>
      )}

      {children && <div className='mt-4'>{children}</div>}
    </div>
  )
}
