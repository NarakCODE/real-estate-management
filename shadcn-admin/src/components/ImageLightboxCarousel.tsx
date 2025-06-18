import * as React from 'react'
import { Image } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ImageLightboxCarouselProps {
  images: string[]
  triggerClassName?: string
  initialIndex?: number
  alt?: string
}

export function ImageLightboxCarousel({
  images,
  triggerClassName,
  initialIndex = 0,
  alt = 'Gallery image',
}: ImageLightboxCarouselProps) {
  const [open, setOpen] = React.useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [api, setApi] = React.useState<any>()
  const [current, setCurrent] = React.useState(initialIndex)

  React.useEffect(() => {
    if (!api) return

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })

    // Set initial slide
    if (initialIndex > 0 && initialIndex < images.length) {
      api.scrollTo(initialIndex)
    }
  }, [api, initialIndex, images.length])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!open) return

      if (event.key === 'Escape') {
        setOpen(false)
      } else if (event.key === 'ArrowLeft') {
        api?.scrollPrev()
      } else if (event.key === 'ArrowRight') {
        api?.scrollNext()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, api])

  if (!images || images.length === 0) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            'focus:ring-ring relative flex h-full w-full items-center justify-center overflow-hidden rounded-md transition-opacity hover:opacity-80 focus:ring-2 focus:ring-offset-2 focus:outline-none',
            triggerClassName
          )}
          aria-label={`Open gallery with ${images.length} images`}
        >
          <img
            src={images[0] || '/placeholder.svg'}
            alt={`${alt} 1`}
            className='h-full w-full object-cover'
          />
          {images.length > 1 && (
            <div className='h-full w-full'>
              <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
                <div className='flex items-center gap-2 rounded bg-black/80 px-3 py-2 text-sm text-white'>
                  <Image className='h-5 w-5' />
                  {images.length}
                </div>
              </div>
            </div>
          )}
        </button>
      </DialogTrigger>

      <DialogContent className='flex h-[calc(100vh-4rem)] min-w-[calc(100vw-4rem)] flex-col justify-between gap-0 p-0'>
        <DialogTitle className='sr-only'>Image Gallery</DialogTitle>
        <DialogDescription className='sr-only'>
          View and navigate through the image gallery
        </DialogDescription>
        <div className='relative flex h-full w-full items-center justify-center p-2'>
          {/* Image counter */}
          <div className='bg-accent-foreground text-muted absolute top-4 left-4 z-50 rounded-full px-3 py-1 text-sm'>
            {current + 1} / {images.length}
          </div>

          <Carousel
            setApi={setApi}
            className='h-full w-full overflow-hidden rounded-md'
            opts={{
              align: 'center',
              loop: true,
            }}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className='flex h-full w-full items-center justify-center'
                >
                  <img
                    src={image || '/placeholder.svg'}
                    alt={`${alt} ${index + 1}`}
                    className='w=full h-full object-contain'
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            {images.length > 1 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>

          {/* Thumbnail strip for multiple images */}
          {images.length > 1 && (
            <div className='absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2'>
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    'h-12 w-12 overflow-hidden rounded border-2 transition-all',
                    current === index
                      ? 'border-white'
                      : 'border-transparent opacity-60 hover:opacity-80'
                  )}
                  aria-label={`Go to image ${index + 1}`}
                >
                  <img
                    src={image || '/placeholder.svg'}
                    alt={`${alt} ${index + 1} thumbnail`}
                    className='h-full w-full object-cover'
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
