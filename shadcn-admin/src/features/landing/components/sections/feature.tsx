import { FeatureReasons } from '../../data'
import SectionTitle from '../section-title'

interface Reason {
  title: string
  description: string
  icon: React.ReactNode
}

interface FeatureSectionProps {
  heading?: string
  reasons?: Reason[]
}

const FeatureSection = ({
  heading = 'Why Work With Us?',
  reasons = FeatureReasons,
}: FeatureSectionProps) => {
  return (
    <section className=''>
      <div className='container'>
        <div className='mb-10 md:mb-20'>
          <SectionTitle
            title={heading}
            description='Discover the best properties in your city. Buy, sell, or rent with confidence and ease.'
          />
        </div>
        <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
          {reasons.map((reason, i) => (
            <div key={i} className='flex flex-col'>
              <div className='bg-accent mb-5 flex size-16 items-center justify-center rounded-full'>
                {reason.icon}
              </div>
              <h3 className='mb-2 text-xl font-semibold'>{reason.title}</h3>
              <p className='text-muted-foreground'>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { FeatureSection }
