// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/components/ui/carousel'
// import PropertyCard from '../property-card'
import PropertyList from '../PropertyList'
import SectionTitle from '../section-title'

const DiscoverSection = () => {
  return (
    <section className=''>
      <SectionTitle
        title='Discover Our Best Deals'
        description='Find the best deals for your next home.'
      />

      <PropertyList />
    </section>
  )
}

export default DiscoverSection
