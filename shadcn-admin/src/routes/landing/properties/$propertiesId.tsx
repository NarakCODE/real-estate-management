import type React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Bath,
  BedDouble,
  Building,
  MapPin,
  Phone,
  Ruler,
  MoreHorizontal,
  Play,
  Calendar,
  Eye,
  ArrowLeft,
  ExternalLink,
  Car,
  Home,
  Maximize,
} from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { ImageLightboxCarousel } from '@/components/ImageLightboxCarousel'
import { ShareButton } from '@/components/ShareButton'
import { PageBreadcrumbs } from '@/components/layout/PageBreadcrumbs'
import LandingPageLayout from '@/components/layout/landing-layout'
import { FavoriteToggleButton } from '@/features/favorites/components/FavoriteToggleButton'
import PropertyImageCarousel from '@/features/landing/components/PropertyImageCarousel'
import { AmenitiesSection } from '@/features/landing/properties/components/AmenitiesSection'
import { useAmenities } from '@/features/landing/properties/hooks/useAmenities'
import { useProperty } from '@/features/landing/properties/hooks/useProperties'

export const Route = createFileRoute('/landing/properties/$propertiesId')({
  component: PropertyDetailsPage,
  pendingComponent: PropertyDetailsSkeleton,
})

function PropertyDetailsPage() {
  const { propertiesId } = Route.useParams()
  const { data: property, isLoading, isError } = useProperty(propertiesId)
  const {
    data: amenitiesResponse,
    isLoading: isLoadingAmenities,
    isError: isErrorAmenities,
  } = useAmenities()

  const { agentId } = property || {}

  if (isLoading || isLoadingAmenities) {
    return <PropertyDetailsSkeleton />
  }

  if (isError || !property || isErrorAmenities) {
    return (
      <LandingPageLayout>
        <div className='container mx-auto text-center'>
          <div className='mx-auto max-w-md space-y-4'>
            <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-full'>
              <Home className='h-8 w-8' />
            </div>
            <h2 className='text-2xl font-bold'>Property not found</h2>
            <p className=''>
              We couldn't find the property you were looking for.
            </p>
            <Button variant='outline' onClick={() => window.history.back()}>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Go Back
            </Button>
          </div>
        </div>
      </LandingPageLayout>
    )
  }

  const formatFeatureValue = (value: number, suffix: string = '') => {
    return value > 0 ? `${value}${suffix}` : 'N/A'
  }

  const fullAddress = `${property.location.street}, ${property.location.city}, ${property.location.state} ${property.location.zipCode}`
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`

  return (
    <LandingPageLayout>
      <div className='min-h-screen'>
        <div className='container mx-auto'>
          <PageBreadcrumbs customCrumbs={[{ label: property.title }]} />

          {/* Hero Section */}
          <div className='mb-8'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-5'>
              {/* Main Image */}
              <div className='lg:col-span-3'>
                <div className='relative overflow-hidden rounded-2xl shadow-xl'>
                  <PropertyImageCarousel images={property.images} />
                  <div className='absolute top-4 left-4 flex gap-2'>
                    <Badge className=' '>{property.status}</Badge>
                    {property.isFeatured && (
                      <Badge variant='destructive'>Featured</Badge>
                    )}
                  </div>
                  <div className='absolute top-4 right-4 flex gap-2'>
                    <Button size='sm' variant='secondary' className=' '>
                      <Eye className='mr-1 h-4 w-4' />
                      {property.views}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Side Images & Video */}
              <div className='space-y-4 lg:col-span-2'>
                {/* Video Tour */}
                <div className='group relative cursor-pointer overflow-hidden rounded-xl shadow-lg'>
                  <img
                    src={
                      property.images[0] ||
                      '/placeholder.svg?height=200&width=300'
                    }
                    alt='Property video tour'
                    className='h-48 w-full object-cover transition-transform group-hover:scale-105'
                  />
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='group-/30 rounded-full p-4 backdrop-blur-sm transition-colors'>
                      <Play className='h-6 w-6' />
                    </div>
                  </div>
                  <div className='absolute bottom-3 left-3'>
                    <Badge variant='secondary' className=''>
                      Virtual Tour
                    </Badge>
                  </div>
                </div>

                {/* Additional Images */}
                <div className='relative overflow-hidden rounded-xl shadow-lg'>
                  <ImageLightboxCarousel images={property.images} />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
            {/* Property Information */}
            <div className='space-y-4 lg:col-span-2'>
              {/* Header */}
              <div className='bg-background rounded-2xl border p-4 shadow-sm'>
                <div className='mb-6 flex items-start justify-between'>
                  <div className='flex-1'>
                    <div className='mb-3 flex items-center gap-3'>
                      <h1 className='text-4xl font-bold'>
                        {formatPrice(property.price)}
                      </h1>
                      <span className=''>/{property.currency}</span>
                    </div>
                    <h2 className='mb-3 text-2xl font-semibold'>
                      {property.title}
                    </h2>

                    <div className='flex items-center gap-2'>
                      <MapPin className='h-5 w-5' />
                      <span className=''>
                        {property.location.street}, {property.location.city},{' '}
                        {property.location.state} {property.location.zipCode}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FavoriteToggleButton propertyId={propertiesId} />
                    <ShareButton
                      title='Share Property'
                      shareText={`Check out this amazing property: ${property.title}`}
                    />
                    <Button variant='outline' size='icon'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </div>
                </div>

                {/* Key Features */}
                <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                  <FeatureCard
                    icon={<BedDouble className='h-6 w-6' />}
                    label='Bedrooms'
                    value={formatFeatureValue(property.features.bedrooms)}
                    highlight={property.features.bedrooms > 0}
                  />
                  <FeatureCard
                    icon={<Bath className='h-6 w-6' />}
                    label='Bathrooms'
                    value={formatFeatureValue(property.features.bathrooms)}
                    highlight={property.features.bathrooms > 0}
                  />
                  <FeatureCard
                    icon={<Maximize className='h-6 w-6' />}
                    label='Area'
                    value={formatFeatureValue(property.features.area, ' sqft')}
                    highlight={true}
                  />
                  <FeatureCard
                    icon={<Car className='h-6 w-6' />}
                    label='Parking'
                    value={formatFeatureValue(
                      property.features.parkingSpots,
                      ' spots'
                    )}
                    highlight={property.features.parkingSpots > 0}
                  />
                </div>
              </div>

              {/* Description */}
              <Card className='text-muted-foreground bg-background'>
                <CardHeader>
                  <CardTitle className='text-foreground text-lg'>
                    About This Property
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='leading-relaxed'>{property.description}</p>
                </CardContent>
              </Card>

              {/* Detailed Features */}
              <Card className='text-muted-foreground bg-background'>
                <CardHeader>
                  <CardTitle className='text-foreground text-lg'>
                    Property Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <DetailItem
                      icon={<Building className='h-5 w-5' />}
                      label='Property Type'
                      value={property.propertyType}
                    />
                    <DetailItem
                      icon={<Calendar className='h-5 w-5' />}
                      label='Year Built'
                      value={property.features.yearBuilt || 'N/A'}
                    />
                    <DetailItem
                      icon={<Ruler className='h-5 w-5' />}
                      label='Lot Size'
                      value={
                        property.features.lotSize > 0
                          ? `${property.features.lotSize} sqft`
                          : 'N/A'
                      }
                    />
                    <DetailItem
                      icon={<MapPin className='h-5 w-5' />}
                      label='Availability'
                      value={property.availability}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* A */}
              <AmenitiesSection amenities={amenitiesResponse?.data || []} />

              {/* Location */}
              <Card className='text-muted-foreground bg-background'>
                <CardHeader>
                  <CardTitle className='text-foreground text-lg'>
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='flex items-start gap-3'>
                      <MapPin className='mt-1 h-5 w-5' />
                      <div className='grid grid-cols-3'>
                        <p className='font-medium'>
                          {property.location.street}
                        </p>
                        <p className=''>
                          {property.location.city}, {property.location.state}{' '}
                          {property.location.zipCode}
                        </p>
                        <p className=''>{property.location.country}</p>
                      </div>
                    </div>
                    <div className='flex h-full w-full items-center justify-center rounded-lg'>
                      {/* <div className='text-center'>
                        <MapPin className='mx-auto mb-2 h-8 w-8' />
                        <p>Interactive map would go here</p>
                        <p className='text-sm'>
                          Lat: {property.location.coordinates.lat}, Lng:{' '}
                          {property.location.coordinates.lng}
                        </p>
                      </div> */}
                      <div className='bg-background mt-4 w-full overflow-hidden rounded-lg border'>
                        <iframe
                          title='Google Map'
                          src={mapSrc}
                          width='100%'
                          height='400'
                          loading='lazy'
                          style={{ border: 0 }}
                          allowFullScreen
                          referrerPolicy='no-referrer-when-downgrade'
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className='sticky top-0 space-y-4'>
              {/* Agent Information */}
              <Card className='bg-background'>
                <CardHeader>
                  <CardTitle className='text-lg'>Listed by</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='flex items-center gap-4'>
                      <Avatar className='h-16 w-16 ring-2'>
                        {agentId?.avatarUrl ? (
                          <AvatarImage src={agentId.avatarUrl} />
                        ) : (
                          <AvatarImage
                            src={`https://i.pravatar.cc/150?u=${agentId?.email}`}
                          />
                        )}
                        <AvatarFallback className='font-semibold'>
                          {agentId?.name?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex-1'>
                        <p className='font-semibold'>{agentId?.name}</p>
                        <p className=''>
                          {agentId?.email || 'No email provided'}
                        </p>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <Button className='flex-1'>
                        <Phone className='mr-2 h-4 w-4' />
                        Contact Agent
                      </Button>
                      <Button variant='outline' size='icon'>
                        <ExternalLink className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Property Tags */}
              <Card className='bg-background'>
                <CardHeader>
                  <CardTitle className='text-lg'>Property Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-wrap gap-2'>
                    <Badge variant='secondary' className='px-3 py-1 text-sm'>
                      {property.propertyType}
                    </Badge>
                    <Badge
                      variant={
                        property.status === 'For Sale' ? 'default' : 'secondary'
                      }
                      className='px-3 py-1 text-sm'
                    >
                      {property.status}
                    </Badge>
                    <Badge variant='outline' className='px-3 py-1 text-sm'>
                      {property.availability}
                    </Badge>
                    {property.isFeatured && (
                      <Badge
                        variant='destructive'
                        className='px-3 py-1 text-sm'
                      >
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className='bg-background'>
                <CardHeader>
                  <CardTitle className='text-lg'>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className=''>Views</span>
                    <span className='font-semibold'>{property.views}</span>
                  </div>
                  <Separator />
                  <div className='flex items-center justify-between'>
                    <span className=''>Listed</span>
                    <span className='font-semibold'>
                      {new Date(property.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Separator />
                  <div className='flex items-center justify-between'>
                    <span className=''>Updated</span>
                    <span className='font-semibold'>
                      {new Date(property.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </LandingPageLayout>
  )
}

function FeatureCard({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-xl border p-4 transition-colors ${
        highlight
          ? 'dark:bg-background border-blue-500 bg-blue-50 dark:border'
          : 'border-border bg-muted dark:bg-background'
      }`}
    >
      <div
        className={`mb-2 flex items-center gap-2 ${
          highlight ? 'dark:text-muted-foreground text-blue-600' : ''
        }`}
      >
        {icon}
        <span className='text-sm font-medium'>{label}</span>
      </div>
      <p className='text-xl font-bold'>{value}</p>
    </div>
  )
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
}) {
  return (
    <div className='flex items-center gap-3 rounded-lg p-3'>
      <div className=''>{icon}</div>
      <div className='flex-1'>
        <p className='text-sm font-medium'>{label}</p>
        <p className='font-semibold'>{value}</p>
      </div>
    </div>
  )
}

function PropertyDetailsSkeleton() {
  return (
    <LandingPageLayout>
      <div className='relative min-h-screen'>
        <div className='container mx-auto px-4 py-6'>
          {/* Hero Section Skeleton */}
          <div className='mb-8'>
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-5'>
              <div className='lg:col-span-3'>
                <Skeleton className='h-[500px] w-full rounded-2xl' />
              </div>
              <div className='space-y-4 lg:col-span-2'>
                <Skeleton className='h-48 w-full rounded-xl' />
                <Skeleton className='h-48 w-full rounded-xl' />
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            <div className='space-y-8 lg:col-span-2'>
              <div className='space-y-4 rounded-2xl p-8'>
                <Skeleton className='h-10 w-3/4' />
                <Skeleton className='h-8 w-1/2' />
                <Skeleton className='h-6 w-2/3' />
                <div className='mt-6 grid grid-cols-4 gap-4'>
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className='h-20 w-full rounded-xl' />
                  ))}
                </div>
              </div>
              <Skeleton className='h-40 w-full rounded-2xl' />
              <Skeleton className='h-60 w-full rounded-2xl' />
            </div>
            <div className='space-y-6'>
              <Skeleton className='h-48 w-full rounded-2xl' />
              <div className='flex gap-3'>
                <Skeleton className='h-12 flex-1 rounded-xl' />
                <Skeleton className='h-12 flex-1 rounded-xl' />
              </div>
              <Skeleton className='h-32 w-full rounded-2xl' />
            </div>
          </div>
        </div>
      </div>
    </LandingPageLayout>
  )
}
