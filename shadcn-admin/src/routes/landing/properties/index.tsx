import { createFileRoute } from '@tanstack/react-router'
// UI Components
import LandingPageLayout from '@/components/layout/landing-layout'
import { EmptyPropertiesState } from '@/features/landing/components/EmptyPropertiesState'
import { PageHeader } from '@/features/landing/components/PageHeader'
import { PropertyFilters } from '@/features/landing/components/PropertyFilters'
import { PropertyGrid } from '@/features/landing/components/PropertyGrid'
import PropertyPagination from '@/features/landing/components/PropertyPagination'
import { PropertyGridSkeleton } from '@/features/landing/components/PropertySkeleton'
import { useProperties } from '@/features/landing/properties/hooks/useProperties'
import { propertySearchSchema } from '@/features/landing/properties/schemas'
import type { PropertiesResponse } from '@/features/landing/properties/types'

export const Route = createFileRoute('/landing/properties/')({
  validateSearch: propertySearchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ deps: { search } }) => ({ search }),
  // pendingComponent is no longer needed here
  component: PropertiesPage,
})

function PropertiesPage() {
  const searchParams = Route.useSearch()
  // console.log('searchParams', searchParams)

  const { data: propertiesData, isPending } = useProperties(searchParams) as {
    data?: PropertiesResponse
    isPending: boolean
  }

  const hasProperties =
    !isPending && propertiesData?.data && propertiesData.data.length > 0

  return (
    <LandingPageLayout>
      <div className='container mx-auto py-8'>
        <PageHeader
          title='Properties'
          subtitle='Explore our curated collection of properties'
        />
        {/* The filters component remains unchanged */}
        <PropertyFilters searchParams={searchParams} />

        <div className='mt-8'>
          {isPending ? (
            <PropertyGridSkeleton />
          ) : hasProperties ? (
            <div className='space-y-8'>
              <PropertyGrid properties={propertiesData.data} />

              <PropertyPagination pagination={propertiesData.pagination} />
            </div>
          ) : (
            <EmptyPropertiesState />
          )}
        </div>
      </div>
    </LandingPageLayout>
  )
}
