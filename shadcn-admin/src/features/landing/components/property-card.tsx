import { Link } from '@tanstack/react-router'
import { BedDouble, Bath, Ruler, MapPin } from 'lucide-react'
import { formatPrice, truncateString } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type Property = {
  _id: string
  title: string
  price: number
  status: string
  propertyType: string
  images: string[]
  location: {
    city: string
  }
  features: {
    bedrooms: number
    bathrooms: number
    area: number
  }
}

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      to='/landing/properties/$propertiesId'
      params={{ propertiesId: property._id }}
      className='group relative block overflow-hidden rounded-lg no-underline hover:no-underline'
    >
      <Card className='relative aspect-[4/5] w-full max-w-full min-w-[210px] overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md'>
        {/* Background Image */}
        <img
          src={property.images[0]}
          alt={property.title}
          className='absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
        />

        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />

        {/* Badges */}
        <div className='absolute top-2 right-2 left-2 z-10 flex justify-between px-2'>
          <Badge className='bg-green-800/90 px-2 py-0.5 text-xs text-white'>
            {property.status}
          </Badge>
          <Badge className='bg-white/80 px-2 py-0.5 text-xs text-black'>
            {property.propertyType}
          </Badge>
        </div>

        {/* Content Overlay */}
        <CardContent className='absolute bottom-0 z-10 flex w-full items-end justify-between gap-2 rounded-b-lg bg-black/50 p-3 text-white'>
          <div className='w-full space-y-1'>
            <h3 className='w-full max-w-sm text-base font-semibold'>
              {truncateString(property.title, 32)}
            </h3>
            <div className='mt-4 space-y-2'>
              <div className='flex items-center justify-between gap-2 text-sm'>
                <p className='flex items-center gap-1 text-xs text-gray-200'>
                  <MapPin className='h-4 w-4' /> {property.location.city}
                </p>
                <div className='text-base font-bold whitespace-nowrap'>
                  {formatPrice(property.price)}
                </div>
              </div>
              <div className='flex space-x-2 text-xs text-gray-200'>
                <span className='flex items-center gap-1'>
                  <BedDouble className='h-4 w-4' /> {property.features.bedrooms}
                </span>
                <Separator orientation='vertical' className='h-4' />
                <span className='flex items-center gap-1'>
                  <Bath className='h-4 w-4' /> {property.features.bathrooms}
                </span>
                <Separator orientation='vertical' className='h-4' />
                <span className='flex items-center gap-1'>
                  <Ruler className='h-4 w-4' /> {property.features.area} sqft
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default PropertyCard
