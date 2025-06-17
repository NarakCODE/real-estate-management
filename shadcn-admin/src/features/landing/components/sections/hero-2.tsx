import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Hero2Section = () => {
  return (
    <section className="dark relative my-32 flex h-svh max-h-[1400px] w-full overflow-hidden bg-[url('https://images.unsplash.com/photo-1623298317883-6b70254edf31?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat font-sans after:absolute after:top-0 after:left-0 after:z-10 after:h-full after:w-full after:bg-black/20 after:content-[''] md:h-svh lg:my-48">
      <div className='relative z-30 m-auto flex max-w-[46.25rem] flex-col items-center justify-center gap-6 px-5'>
        <h1 className='text-foreground text-center font-serif text-4xl leading-tight md:text-6xl xl:text-[4.4rem]'>
          Discover the Beauty of Architecture
        </h1>
        <p className='text-foreground text-center text-base'>
          Explore our curated collection of stunning properties, from modern
          masterpieces to timeless classics. Whether you're looking to buy,
          sell, or simply admire, we have something for everyone.
        </p>
        <Button size={'lg'} asChild variant={'default'}>
          <Link to='/landing/properties'>
            View All Properties <ArrowRight />
          </Link>
        </Button>
      </div>
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-[url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/noise.png')] bg-repeat opacity-15" />
    </section>
  )
}

export default Hero2Section
