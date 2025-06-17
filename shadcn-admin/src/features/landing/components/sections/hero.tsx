import PropertySearch from '../property-search'

// 1. Content is extracted for easier updates and potential localization.
const heroContent = {
  title: 'Find Your Dream Home',
  subtitle:
    'Discover the best properties in your city. Buy, sell, or rent with confidence and ease.',
  backgroundImage: {
    avif: '/images/hero-image-1.avif',
    webp: '/images/hero-image-1.webp', // Assumed webp fallback
    fallback: '/images/hero-image-1.jpg', // Assumed jpg fallback
    alt: 'A beautiful modern house with a pool at dusk', // More descriptive alt text
  },
}

export const HeroSection = () => {
  return (
    <section className='relative flex min-h-screen w-full items-center justify-center'>
      {/* 2. Background Image: Optimized for performance and compatibility */}
      <div aria-hidden='true' className='absolute inset-0 z-0'>
        <picture>
          <source srcSet={heroContent.backgroundImage.avif} type='image/avif' />
          <source srcSet={heroContent.backgroundImage.webp} type='image/webp' />
          <img
            src={heroContent.backgroundImage.fallback}
            alt={heroContent.backgroundImage.alt}
            className='h-full w-full object-cover'
            // 3. Performance hints for critical, above-the-fold images
            loading='eager'
            fetchPriority='high'
          />
        </picture>

        {/* Overlay for text contrast */}
        <div className='absolute inset-0 bg-black/50' />
      </div>

      {/* 4. Centered Content Container */}
      <div className='relative z-10 flex w-full max-w-4xl flex-col items-center justify-center px-4 text-center'>
        <div className='text-white'>
          <h1 className='text-4xl font-extrabold tracking-tight drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl'>
            {heroContent.title}
          </h1>
          <p className='mt-6 max-w-2xl text-lg text-white/90 drop-shadow-md md:text-xl'>
            {heroContent.subtitle}
          </p>
        </div>

        {/* Property Search Component */}
        <div className='mt-8 w-full'>
          <PropertySearch />
        </div>
      </div>
    </section>
  )
}
