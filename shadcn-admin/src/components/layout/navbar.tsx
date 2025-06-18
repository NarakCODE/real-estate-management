import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { Icon } from '@/components/ui/icon'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ThemeSwitch } from '../theme-switch'
import { Button, buttonVariants } from '../ui/button'
import { UserNav } from './UserNav'

interface RouteProps {
  href: string
  label: string
}

const routeList: RouteProps[] = [
  {
    href: '/properties',
    label: 'Properties',
  },
  {
    href: '#testimonials',
    label: 'Testimonials',
  },
  {
    href: '#pricing',
    label: 'Pricing',
  },
  {
    href: '#faq',
    label: 'FAQ',
  },
]

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <header className='dark:bg-background bg-background sticky top-0 z-50 w-full border-b-[1px]'>
      <NavigationMenu className='mx-auto'>
        <NavigationMenuList className='container flex h-14 w-screen justify-between px-4'>
          <NavigationMenuItem className='flex font-bold'>
            <a
              rel='noreferrer noopener'
              href='/landing'
              className='ml-2 flex text-xl font-bold'
            >
              <Icon name='House' color='black' size={24} />
              JustHome
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className='flex md:hidden'>
            <ThemeSwitch />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className='px-2'>
                <Menu
                  className='flex h-5 w-5 md:hidden'
                  onClick={() => setIsOpen(true)}
                >
                  <span className='sr-only'>Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={'left'}>
                <SheetHeader>
                  <SheetTitle className='text-xl font-bold'>
                    Shadcn/React
                  </SheetTitle>
                </SheetHeader>
                <nav className='mt-4 flex flex-col items-center justify-center gap-2'>
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel='noreferrer noopener'
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: 'ghost' })}
                    >
                      {label}
                    </a>
                  ))}

                  <Button asChild size={'lg'}>
                    <Link to='/sign-in'>Login</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className='hidden gap-2 md:flex'>
            {routeList.map((route: RouteProps, i) => (
              <a
                rel='noreferrer noopener'
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: 'ghost',
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <div className='hidden gap-2 md:flex'>
            <ThemeSwitch />
            <Button asChild variant={'secondary'}>
              <Link to='/sign-up'>Sign Up</Link>
            </Button>

            <UserNav />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
