import { createFileRoute } from '@tanstack/react-router'
import { CircleX } from 'lucide-react'
import { PageBreadcrumbs } from '@/components/layout/PageBreadcrumbs'
import LandingPageLayout from '@/components/layout/landing-layout'
import { useFavorites } from '@/features/favorites/hooks/useFavorites'
import { EmptyState } from '@/features/landing/components/EmptyState'
import { PageHeader } from '@/features/landing/components/PageHeader'
import { PropertyGridSkeleton } from '@/features/landing/components/PropertySkeleton'
import PropertyCard from '@/features/landing/components/property-card'

export const Route = createFileRoute('/landing/favorites/')({
  component: FavoritesPage,
})

function FavoritesPage() {
  const { data: favorites, isLoading, isError, error } = useFavorites()
  // Fallback to empty array if property is missing
  const properties = favorites?.data ?? []

  return (
    <LandingPageLayout>
      <div className='container mx-auto'>
        <PageBreadcrumbs
          customCrumbs={[{ label: 'Favorites', to: '/favorites' }]}
        />
        <PageHeader
          title={`Your Favorites (${properties.length})`}
          subtitle='Here are the properties you have saved for later.'
        />

        <div className='mt-8'>
          {isLoading ? (
            <PropertyGridSkeleton />
          ) : isError ? (
            <EmptyState
              icon={<CircleX className='text-destructive h-16 w-16' />}
              title='We couldn’t find any favorites'
              description={error?.message || 'Failed to fetch favorites'}
            />
          ) : properties.length === 0 ? (
            <EmptyState
              title='No Favorites'
              description='You haven’t added any properties to your favorites. Start browsing to find your next home!'
              action={{
                label: 'Browse Properties',
                to: '/landing/properties',
                search: {},
                variant: 'outline',
              }}
            />
          ) : (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property.property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </LandingPageLayout>
  )
}
