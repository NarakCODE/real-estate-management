import { GalleryVerticalEnd } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='grid min-h-svh w-full lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <a href='#' className='flex items-center gap-2 font-medium'>
            <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
              <GalleryVerticalEnd className='size-4' />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className='flex w-full flex-1 items-center justify-center'>
          <div className='w-full max-w-md'>{children}</div>
        </div>
      </div>
      <div className='bg-muted relative hidden lg:block'>
        <img
          src='https://images.unsplash.com/photo-1518733057094-95b53143d2a7?q=80&w=665&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='Image'
          className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]'
        />
      </div>
    </div>
  )
}
