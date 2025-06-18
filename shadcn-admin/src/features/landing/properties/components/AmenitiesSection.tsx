import {
  IconPool,
  IconWifi,
  IconParking,
  IconGymnastics,
  IconAirConditioning,
  IconToolsKitchen2,
  IconCircle,
} from '@tabler/icons-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Amenity } from '../types'

const iconMap: { [key: string]: React.ElementType } = {
  'Swimming Pool': IconPool,
  'Wi-Fi': IconWifi,
  Parking: IconParking,
  Gym: IconGymnastics,
  'Air Conditioning': IconAirConditioning,
  Kitchen: IconToolsKitchen2,
}

export function AmenitiesSection({ amenities }: { amenities: Amenity[] }) {
  if (!amenities || amenities.length === 0) {
    return null
  }

  return (
    <Card className='bg-background'>
      <CardHeader>
        <CardTitle>Amenities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
          {amenities.map((amenity) => {
            const IconComponent = iconMap[amenity.name] || IconCircle
            return (
              <div key={amenity._id} className='flex items-center space-x-2'>
                <IconComponent className='text-primary h-5 w-5' />
                <span className='text-sm'>{amenity.name}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
