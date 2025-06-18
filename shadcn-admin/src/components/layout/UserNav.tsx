import { Link, useNavigate } from '@tanstack/react-router'
import { CreditCard, LogOut, Settings, User } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function UserNav() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  // This function handles the logout logic
  const handleLogout = () => {
    logout()
    // Redirect to the sign-in page after logout
    navigate({ to: '/landing/sign-in' })
  }

  // A helper function to generate initials from the user's name for the avatar fallback
  const getInitials = (name: string) => {
    const names = name.split(' ')
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  // If there's no user in the store, we can render nothing or a sign-in button
  if (!user) {
    return (
      <Button asChild>
        <Link to='/sign-in'>Sign In</Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            {/* The AvatarImage will display the user's avatar, if available */}
            <AvatarImage src={user.avatarUrl || ''} alt={user.name} />
            {/* The AvatarFallback will be shown if the image fails to load or doesn't exist */}
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>{user.name}</p>
            <p className='text-muted-foreground text-xs leading-none'>
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {/* TanStack Router's Link component for type-safe navigation */}
            {/* <Link to='/_authenticated/settings' search={{ tab: 'profile' }}> */}
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
            {/* </Link> */}
          </DropdownMenuItem>
          <DropdownMenuItem>
            {/* <Link to='/_authenticated/settings' search={{ tab: 'account' }}> */}
            <CreditCard className='mr-2 h-4 w-4' />
            <span>Billing</span>
            {/* </Link> */}
          </DropdownMenuItem>
          <DropdownMenuItem>
            {/* <Link to='/_authenticated/settings' search={{ tab: 'appearance' }}> */}
            <Settings className='mr-2 h-4 w-4' />
            <span>Settings</span>
            {/* </Link> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* The onSelect event is a safe way to handle actions in dropdowns */}
        <DropdownMenuItem onSelect={handleLogout}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
