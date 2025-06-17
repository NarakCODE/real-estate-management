import { Separator } from '@/components/ui/separator'

const OurAchievements = () => {
  // Renamed from OurStatus to OurAchievements for real estate context
  return (
    <section className='py-32'>
      <div className='container'>
        <div className='flex flex-col gap-6 text-center'>
          <p className='font-medium'>500+ Happy Homeowners & Investors</p>
          <h2 className='text-4xl font-medium md:text-5xl'>
            Real Success Stories from Our Clients
          </h2>
        </div>
        <div className='mt-20'>
          <div className='grid gap-16 lg:grid-cols-3 xl:gap-24'>
            <div className='border-border flex flex-col gap-10 sm:flex-row lg:col-span-2 lg:border-r lg:pr-16 xl:pr-24'>
              <img
                src='https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600' // Example: A nice house exterior
                alt='Dream home purchased'
                className='aspect-video h-full w-full max-w-60 rounded-2xl object-cover sm:aspect-29/35'
              />
              <div className='flex h-full flex-col justify-between gap-10'>
                <q className='sm:text-xl'>
                  Finding our dream home felt overwhelming until we connected
                  with this team. Their local market knowledge and negotiation
                  skills were invaluable. We secured our perfect house at a
                  great price!
                </q>
                <div className='flex items-end gap-6'>
                  <div className='flex flex-col gap-1'>
                    <p className='text-primary text-lg font-semibold'>
                      The Thompson Family
                    </p>
                    <p className='text-muted-foreground'>Proud Homeowners</p>
                  </div>
                  {/* Optional: You can remove this logo or use a generic "satisfied client" badge */}
                </div>
              </div>
            </div>
            <div className='flex gap-10 self-center lg:flex-col'>
              <div className='flex flex-col gap-2'>
                <p className='text-primary text-4xl font-medium sm:text-5xl'>
                  98%
                </p>
                <p className='text-primary font-semibold'>
                  Client Satisfaction
                </p>
                <p className='text-muted-foreground'>
                  From verified transactions
                </p>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-primary text-4xl font-medium sm:text-5xl'>
                  $50M+
                </p>
                <p className='text-primary font-semibold'>
                  In Property Value Transacted
                </p>
                <p className='text-muted-foreground'>In the last year alone</p>
              </div>
            </div>
          </div>
          <Separator className='my-20' />
          <div className='grid gap-16 lg:grid-cols-3 xl:gap-24'>
            <div className='border-border flex flex-col gap-10 sm:flex-row lg:col-span-2 lg:border-r lg:pr-16 xl:pr-24'>
              <img
                src='https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=600' // Example: A sold sign or happy sellers
                alt='Property sold successfully'
                className='aspect-video h-full w-full max-w-60 rounded-2xl object-cover sm:aspect-29/35'
              />
              <div className='flex h-full flex-col justify-between gap-10'>
                <q className='sm:text-xl'>
                  Selling our property was remarkably smooth and efficient. The
                  marketing was top-notch, attracting multiple offers, and they
                  guided us to the best one. Exceeded our expectations!
                </q>
                <div className='flex items-end gap-6'>
                  <div className='flex flex-col gap-1'>
                    <p className='text-primary text-lg font-semibold'>
                      David & Sarah Chen
                    </p>
                    <p className='text-muted-foreground'>Satisfied Sellers</p>
                  </div>
                  {/* Optional: You can remove this logo or use a generic "top realtor" badge */}
                </div>
              </div>
            </div>
            <div className='flex gap-10 self-center lg:flex-col'>
              <div className='flex flex-col gap-2'>
                <p className='text-primary text-4xl font-medium sm:text-5xl'>
                  21 Days
                </p>
                <p className='text-primary font-semibold'>Avg. Time to Offer</p>
                <p className='text-muted-foreground'>
                  Faster than market average
                </p>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-primary text-4xl font-medium sm:text-5xl'>
                  105%
                </p>
                <p className='text-primary font-semibold'>
                  Avg. Sale to List Price
                </p>
                <p className='text-muted-foreground'>
                  Maximizing client returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurAchievements
