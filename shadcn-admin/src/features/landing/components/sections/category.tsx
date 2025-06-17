import { galleryData } from '../../data/index'
import { Gallery } from '../gallery'

const CategorySection = () => {
  return (
    <section id='category'>
      <Gallery
        items={galleryData}
        title='Find Properties in These Cities'
        description='Discover the best properties in your city. Buy, sell, or rent with confidence and ease.'
      />
    </section>
  )
}

export default CategorySection
