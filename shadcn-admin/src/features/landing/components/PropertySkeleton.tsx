import { Skeleton } from '@/components/ui/skeleton'
import LandingPageLayout from '@/components/layout/landing-layout'

/**
 * The main skeleton for the entire properties page,
 * used as the `pendingComponent` in the route definition.
 */
export function PropertiesPageSkeleton() {
  return (
    <LandingPageLayout>
      <div className='container mx-auto py-8'>
        {/* Header Skeleton */}
        <div className='mb-8 space-y-2'>
          <Skeleton className='h-8 w-64' />
          <Skeleton className='h-4 w-96' />
        </div>

        {/* Filters Skeleton */}
        <div className='mb-8 space-y-4'>
          <Skeleton className='h-6 w-32' />
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <div className='flex flex-wrap gap-2'>
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className='h-8 w-20' />
              ))}
            </div>
            <Skeleton className='h-10 w-[140px]' />
          </div>
        </div>

        <PropertyGridSkeleton />
      </div>
    </LandingPageLayout>
  )
}

/**
 * A more specific skeleton for just the grid of property cards.
 * This can be reused if you have other views that show a property grid.
 */
export function PropertyGridSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {/* Create 9 skeleton cards for a balanced 3x3 grid on large screens */}
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className='space-y-3'>
          <Skeleton className='aspect-square h-64 w-full rounded-lg' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-3/4' />
          </div>
        </div>
      ))}
    </div>
  )
}
