interface SectionTitleProps {
  title: string
  description?: string
}

const SectionTitle = ({ title, description }: SectionTitleProps) => {
  return (
    <div className='relative z-10 mx-auto mb-12 max-w-2xl text-center sm:text-center'>
      <h2 className='font-geist text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl'>
        {title}
      </h2>
      <p className='font-geist text-foreground/60 mt-3'>{description}</p>
    </div>
  )
}

export default SectionTitle
