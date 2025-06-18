import React from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface PropertyImageCarouselProps {
  images: string[]
}

const PropertyImageCarousel = ({ images }: PropertyImageCarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className='relative h-full w-full max-w-full'>
      <Carousel className='relative h-full w-full' setApi={setApi}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <>
                <img
                  src={image}
                  alt={`Property image ${index + 1}`}
                  className='h-full w-full rounded-md object-cover'
                />
              </>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='absolute left-0' />
        <CarouselNext className='absolute right-0' />
      </Carousel>
      <div className='absolute right-0 bottom-0 left-0 flex items-center justify-end gap-2 p-4'>
        <span className='bg-muted text-muted-foreground rounded px-3 py-1 text-xs font-medium shadow'>
          {current} <span className='text-muted-foreground'>/</span> {count}
        </span>
      </div>
    </div>
  )
}

export default PropertyImageCarousel
