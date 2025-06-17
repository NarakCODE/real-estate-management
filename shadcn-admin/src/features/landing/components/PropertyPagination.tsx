import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination'
import type { PropertySearchParams } from '../properties/schemas'
import type { Pagination as PaginationType } from '../properties/types'

interface PropertyPaginationProps {
  pagination: PaginationType
}

export default function PropertyPagination({
  pagination: { currentPage, totalPages },
}: PropertyPaginationProps) {
  return (
    <div className='flex items-center justify-between gap-3'>
      <p className='text-muted-foreground grow text-sm' aria-live='polite'>
        Page <span className='text-foreground'>{currentPage}</span> of{' '}
        <span className='text-foreground'>{totalPages}</span>
      </p>
      <Pagination className='w-auto'>
        <PaginationContent className='gap-3'>
          <PaginationItem>
            <Button
              variant='outline'
              className='aria-disabled:pointer-events-none aria-disabled:opacity-50'
              aria-disabled={currentPage === 1 ? true : undefined}
              role={currentPage === 1 ? 'link' : undefined}
              asChild
            >
              <Link
                to='/landing/properties'
                search={(prev: Partial<PropertySearchParams>) => ({
                  ...prev,
                  page: Number(currentPage - 1),
                })}
                aria-disabled={currentPage === 1}
                tabIndex={currentPage === 1 ? -1 : 0}
              >
                Previous
              </Link>
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant='outline'
              className='aria-disabled:pointer-events-none aria-disabled:opacity-50'
              aria-disabled={currentPage === totalPages ? true : undefined}
              role={currentPage === totalPages ? 'link' : undefined}
              asChild
            >
              <Link
                to='/landing/properties'
                search={(prev: Partial<PropertySearchParams>) => ({
                  ...prev,
                  page: Number(currentPage + 1),
                })}
                aria-disabled={currentPage === totalPages}
                tabIndex={currentPage === totalPages ? -1 : 0}
              >
                Next
              </Link>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
