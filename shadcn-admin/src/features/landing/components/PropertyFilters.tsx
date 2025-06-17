import { useState, useEffect, useMemo } from 'react'
import { SearchIcon, X } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import { useSearchNavigate } from '@/hooks/useSearchNavigate'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { PropertySearchParams } from '../properties/schemas'

// --- Constants ---
const propertyTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'Apartment', label: 'Apartment' },
  { value: 'Condo', label: 'Condo' },
  { value: 'House', label: 'House' },
  { value: 'Land', label: 'Land' },
]

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'For Sale', label: 'For Sale' },
  { value: 'For Rent', label: 'For Rent' },
]

// NEW: Options for the items per page dropdown
const limitOptions = [
  { value: '8', label: '8 per page' },
  { value: '12', label: '12 per page' },
  { value: '16', label: '16 per page' },
  { value: '24', label: '24 per page' },
]

interface PropertyFiltersProps {
  searchParams: PropertySearchParams
}

export function PropertyFilters({ searchParams }: PropertyFiltersProps) {
  const navigateWithSearch = useSearchNavigate()
  const [searchTerm, setSearchTerm] = useState(searchParams.propertyName || '')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    // Only update if the search term actually changed
    if (debouncedSearchTerm.trim() !== (searchParams.propertyName || '')) {
      navigateWithSearch({
        propertyName: debouncedSearchTerm.trim() || undefined,
      })
    }
  }, [debouncedSearchTerm, searchParams.propertyName, navigateWithSearch])

  useEffect(() => {
    setSearchTerm(searchParams.propertyName || '')
  }, [searchParams.propertyName])

  const handleFilterChange = (
    key: keyof PropertySearchParams,
    value: string | number
  ) => {
    if (key === 'limit') {
      const numericLimit = value === 'all' ? undefined : Number(value)
      navigateWithSearch({ [key]: numericLimit })
    } else {
      navigateWithSearch({ [key]: value === 'all' ? undefined : value })
    }
  }

  const removeFilter = (key: keyof PropertySearchParams) => {
    if (key === 'propertyName') setSearchTerm('')
    navigateWithSearch({ [key]: undefined })
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    navigateWithSearch({
      status: undefined,
      propertyType: undefined,
      propertyName: undefined,
      limit: 12,
    })
  }

  const activeFilters = useMemo(() => {
    const filters = []
    if (searchParams.propertyName) {
      filters.push({
        key: 'propertyName',
        label: `Search: "${searchParams.propertyName}"`,
      })
    }
    if (searchParams.propertyType) {
      const type = propertyTypes.find(
        (t) => t.value === searchParams.propertyType
      )
      if (type) filters.push({ key: 'propertyType', label: type.label })
    }
    if (searchParams.status) {
      const status = statusOptions.find((s) => s.value === searchParams.status)
      if (status) filters.push({ key: 'status', label: status.label })
    }
    return filters
  }, [searchParams])

  return (
    <div className='bg-card text-card-foreground mb-8 space-y-4 rounded-lg border p-4 shadow-sm'>
      {/* --- Main Filter Controls --- */}
      {/* UPDATED: Grid layout to accommodate the new filter */}
      <div className='grid grid-cols-1 items-end gap-4 md:grid-cols-2 lg:grid-cols-12'>
        {/* Search Input */}
        <div className='md:col-span-2 lg:col-span-5'>
          <label htmlFor='search-input' className='text-sm font-medium'>
            Search by Name
          </label>
          <div className='relative mt-1'>
            <SearchIcon className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
            <Input
              id='search-input'
              placeholder='e.g. "Beachfront Villa"'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-9'
            />
          </div>
        </div>

        {/* Property Type Select */}
        <div className='lg:col-span-2'>
          <label htmlFor='property-type-select' className='text-sm font-medium'>
            Property Type
          </label>
          <Select
            value={searchParams.propertyType || 'all'}
            onValueChange={(value) => handleFilterChange('propertyType', value)}
          >
            <SelectTrigger id='property-type-select' className='mt-1 w-full'>
              <SelectValue placeholder='Select type' />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Select */}
        <div className='lg:col-span-2'>
          <label htmlFor='status-select' className='text-sm font-medium'>
            Status
          </label>
          <Select
            value={searchParams.status || 'all'}
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger id='status-select' className='mt-1 w-full'>
              <SelectValue placeholder='Select status' />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* NEW: Limit Select */}
        <div className='lg:col-span-3'>
          <label htmlFor='limit-select' className='text-sm font-medium'>
            Show
          </label>
          <Select
            value={String(searchParams.limit || '10')}
            onValueChange={(value) =>
              handleFilterChange('limit', Number(value))
            }
          >
            <SelectTrigger id='limit-select' className='mt-1 w-full'>
              <SelectValue placeholder='Items per page' />
            </SelectTrigger>
            <SelectContent>
              {limitOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* --- Active Filters Display --- */}
      {activeFilters.length > 0 && (
        <div className='flex flex-wrap items-center gap-2 border-t pt-4'>
          <span className='text-sm font-semibold'>Active Filters:</span>
          {activeFilters.map((filter) => (
            <ActiveFilterPill
              key={filter.key}
              label={filter.label}
              onRemove={() =>
                removeFilter(filter.key as keyof PropertySearchParams)
              }
            />
          ))}
          <Button
            variant='link'
            size='sm'
            onClick={clearAllFilters}
            className='text-muted-foreground'
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  )
}

// Sub-component for Active Filter "Pills" (remains the same)
function ActiveFilterPill({
  label,
  onRemove,
}: {
  label: string
  onRemove: () => void
}) {
  return (
    <span className='bg-primary/10 text-primary flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium'>
      {label}
      <button onClick={onRemove} className='rounded-full hover:bg-black/10'>
        <X className='h-3 w-3' />
      </button>
    </span>
  )
}
