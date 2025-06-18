import type React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Bath,
  BedDouble,
  Building,
  Heart,
  MapPin,
  Phone,
  Ruler,
  Share2,
  MoreHorizontal,
  Play,
} from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { ImageLightboxCarousel } from '@/components/ImageLightboxCarousel'
import { PageBreadcrumbs } from '@/components/layout/PageBreadcrumbs'
import LandingPageLayout from '@/components/layout/landing-layout'
import PropertyImageCarousel from '@/features/landing/components/PropertyImageCarousel'
import { useProperty } from '@/features/landing/properties/hooks/useProperties'

export const Route = createFileRoute('/landing/properties/$propertiesId')({
  component: PropertyDetailsPage,
  pendingComponent: PropertyDetailsSkeleton,
})

function PropertyDetailsPage() {
  const { propertiesId } = Route.useParams()
  const { data: property, isLoading, isError } = useProperty(propertiesId)

  const { agentId } = property || {}

  if (isLoading) {
    return <PropertyDetailsSkeleton />
  }

  if (isError || !property) {
    return (
      <LandingPageLayout>
        <div className='container mx-auto p-6 text-center'>
          <h2 className='text-2xl font-bold'>Property not found</h2>
          <p>We couldn't find the property you were looking for.</p>
        </div>
      </LandingPageLayout>
    )
  }

  return (
    <LandingPageLayout>
      <div className='container mx-auto'>
        <PageBreadcrumbs customCrumbs={[{ label: property.title }]} />

        {/* Main Layout */}
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          {/* Main Image Section */}
          <div className='h-full w-full lg:col-span-2'>
            <PropertyImageCarousel images={property.images} />
          </div>

          {/* Sidebar */}
          {/* Additional Images */}
          <div className='space-y-3'>
            <div className='relative'>
              <img
                src={
                  // property.videoTourUrl ||
                  property.images[0] || '/placeholder.svg?height=200&width=300'
                }
                alt='Property exterior'
                className='h-full w-full rounded-lg object-cover'
              />
              <Button
                size='sm'
                className='absolute inset-0 m-auto h-12 w-12 rounded-full bg-black/70 hover:bg-black/80'
              >
                <Play className='h-4 w-4 text-white' />
              </Button>
            </div>

            <div className='relative'>
              <ImageLightboxCarousel images={property.images} />
            </div>
          </div>
        </div>

        {/* Property Details Section */}
        <div className='mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Main Content */}
          <div className='space-y-6 lg:col-span-2'>
            {/* Price and Title */}
            <div className='flex items-start justify-between'>
              <div>
                <h1 className='mb-2 text-4xl font-bold'>
                  {formatPrice(property.price)}
                </h1>
                <h2 className='mb-2 text-xl font-semibold'>{property.title}</h2>
                <div className='flex items-center gap-2'>
                  <MapPin className='h-4 w-4' />
                  <span className='text-sm'>
                    {property.location.city}, {property.location.state}
                  </span>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Button variant='ghost' size='sm'>
                  <Share2 className='h-4 w-4' />
                </Button>
                <Button variant='ghost' size='sm'>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </div>
            </div>

            {/* Property Features */}
            <div className='text-muted-foreground flex items-center gap-6'>
              <div className='flex items-center gap-2'>
                <BedDouble className='h-5 w-5' />
                <span className='font-medium'>
                  {property.features.bedrooms} Beds
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Bath className='h-5 w-5' />
                <span className='font-medium'>
                  {property.features.bathrooms} Bath
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Ruler className='h-5 w-5' />
                <span className='font-medium'>
                  {property.features.area} Sqft
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className='mb-3 text-xl font-semibold'>Description</h3>
              <p className='text-muted-foreground leading-relaxed'>
                {property.description}
              </p>
            </div>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
                <FeatureItem
                  icon={<BedDouble className='h-4 w-4' />}
                  label='Bedrooms'
                  value={property.features.bedrooms}
                />
                <FeatureItem
                  icon={<Bath className='h-4 w-4' />}
                  label='Bathrooms'
                  value={property.features.bathrooms}
                />
                <FeatureItem
                  icon={<Ruler className='h-4 w-4' />}
                  label='Area'
                  value={`${property.features.area} sqft`}
                />
                <FeatureItem
                  icon={<Building className='h-4 w-4' />}
                  label='Year Built'
                  value={property.features.yearBuilt}
                />
                <FeatureItem
                  icon={<Building className='h-4 w-4' />}
                  label='Lot Size'
                  value={`${property.features.lotSize} sqft`}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className='space-y-6'>
            {/* Property Agents */}
            <Card>
              <CardHeader>
                <CardTitle>Property Agents</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-12 w-12'>
                      {agentId?.avatarUrl ? (
                        <AvatarImage src={agentId.avatarUrl} />
                      ) : (
                        <AvatarImage
                          src={`https://i.pravatar.cc/150?u=${agentId?.email}`}
                        />
                      )}
                      <AvatarFallback>
                        {agentId?.name?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='font-semibold'>{agentId?.name}</p>
                      <p className='text-muted-foreground text-sm'>
                        {agentId?.email || 'No email provided'}
                      </p>
                    </div>
                  </div>
                  <div className='flex gap-2'>
                    <Button variant='ghost' size='sm'>
                      <Phone className='h-4 w-4' />
                    </Button>
                    <Button variant='ghost' size='sm'>
                      <Share2 className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className='flex gap-2'>
              <Button variant='outline' className='flex-1'>
                <Heart className='mr-2 h-4 w-4' /> Save
              </Button>
              <Button variant='outline' className='flex-1'>
                <Share2 className='mr-2 h-4 w-4' /> Share
              </Button>
            </div>

            {/* Badges */}
            <div className='flex flex-wrap gap-2'>
              <Badge variant='secondary'>{property.propertyType}</Badge>
              <Badge
                variant={
                  property.status === 'For Sale' ? 'default' : 'secondary'
                }
              >
                {property.status}
              </Badge>
              <Badge variant='outline'>{property.availability}</Badge>
            </div>
          </div>
        </div>
      </div>
    </LandingPageLayout>
  )
}

function FeatureItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
}) {
  return (
    <div className='text-muted-foreground flex flex-col gap-3'>
      <Label>{label}</Label>
      <div className='flex items-center gap-2'>
        {icon}
        <p className='text-base'>{value}</p>
      </div>
    </div>
  )
}

function PropertyDetailsSkeleton() {
  return (
    <LandingPageLayout>
      <div className='container mx-auto px-4 py-6'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <Skeleton className='h-[500px] w-full rounded-lg' />
          </div>
          <div className='space-y-4'>
            <Skeleton className='h-48 w-full rounded-lg' />
            <Skeleton className='h-48 w-full rounded-lg' />
          </div>
        </div>
        <div className='mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3'>
          <div className='space-y-6 lg:col-span-2'>
            <Skeleton className='h-8 w-3/4' />
            <Skeleton className='h-6 w-1/2' />
            <div className='flex gap-2'>
              <Skeleton className='h-6 w-20' />
              <Skeleton className='h-6 w-20' />
              <Skeleton className='h-6 w-20' />
            </div>
            <Skeleton className='h-32 w-full' />
          </div>
          <div className='space-y-6'>
            <Skeleton className='h-40 w-full' />
            <div className='flex gap-2'>
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
            </div>
          </div>
        </div>
      </div>
    </LandingPageLayout>
  )
}
