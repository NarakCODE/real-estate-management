import { Link } from '@tanstack/react-router'
import { Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Assuming Button is in your shared UI library

export function EmptyPropertiesState() {
  return (
    <div className='border-border bg-muted/30 flex min-h-[50vh] flex-col items-center justify-center rounded-lg border-2 border-dashed py-16 text-center'>
      <Home className='text-muted-foreground/60 mx-auto h-16 w-16' />
      <h3 className='text-foreground mt-6 text-xl font-semibold'>
        No Properties Available
      </h3>
      <p className='text-muted-foreground mt-2 max-w-md text-sm'>
        We could not find any properties matching your current search criteria.
        Please try adjusting your filters or check back later for new listings.
      </p>
      <Button variant='outline' className='mt-6' asChild>
        {/* This Link resets the search parameters to their default state */}
        <Link to='/landing/properties' search={{}}>
          Clear All Filters
        </Link>
      </Button>
    </div>
  )
}
