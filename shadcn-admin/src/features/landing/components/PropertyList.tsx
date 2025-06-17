import React, { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { AlertTriangle, ArrowRight, Home } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
// Import Shadcn UI components
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useProperties } from '../properties/hooks/useProperties'
import type { PropertySearchParams } from '../properties/schemas'
import PropertyCard from './property-card'

const PropertyList: React.FC = () => {
  const [filters, setFilters] = useState<PropertySearchParams>({
    page: 1,
    limit: 6,
    sortBy: 'createdAt',
    propertyName: '',
    status: '',
    propertyType: '',
  })

  const { data, isLoading, isError, error, isFetching } = useProperties(filters)

  const handleFilterChange = (
    name: keyof PropertySearchParams,
    value: string | number
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
      page: 1, // Reset to first page on filter change
    }))
  }

  // The skeleton loader remains the same
  const renderSkeleton = () => (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {Array.from({ length: 9 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-40 w-full rounded-md' />
          </CardContent>
          <CardFooter>
            <Skeleton className='h-10 w-24' />
          </CardFooter>
        </Card>
      ))}
    </div>
  )

  // Main component render logic
  return (
    <div>
      {/* Filter Section */}
      <div className='mx-auto my-8 w-full'>
        <div className='flex items-center justify-center gap-2'>
          {['Apartment', 'Condo', 'House'].map((type) => (
            <Button
              key={type}
              variant={filters.propertyType === type ? 'default' : 'outline'}
              size='sm'
              onClick={() => handleFilterChange('propertyType', type)}
              className='capitalize'
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Content Area: Handles Loading, Error, Empty, and Data states */}
      {isLoading ? (
        renderSkeleton()
      ) : isError ? (
        <Alert variant='destructive' className='my-4'>
          <AlertTriangle className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was a problem fetching properties:{' '}
            {error ? error.message : 'Unknown error'}
          </AlertDescription>
        </Alert>
      ) : // NEW: Check for empty data array after loading/error states
      !data || data.data.length === 0 ? (
        <div className='py-16 text-center'>
          <Home className='mx-auto h-12 w-12 text-gray-400' />
          <h3 className='mt-2 text-sm font-medium text-gray-900'>
            No Properties Found
          </h3>
          <p className='mt-1 text-sm text-gray-500'>
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        // This block now only renders if data exists and has items
        <>
          {/* Property Grid */}
          <div
            className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ${isFetching ? 'opacity-50 transition-opacity' : ''}`}
          >
            {data.data.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>

          {/* Pagination Section - Now guaranteed to have data */}
          <div className='mt-8 flex items-center justify-center space-x-2'>
            <Button size={'lg'} asChild>
              <Link to='/landing/properties'>
                View All Properties <ArrowRight />
              </Link>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default PropertyList
