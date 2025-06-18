// src/components/layout/nav-user.tsx
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  BoltIcon,
  ChevronDownIcon,
  CreditCard,
  LogOutIcon,
  UserPenIcon,
  Bell,
} from 'lucide-react'
import { toast } from 'sonner'
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
import { logout } from '@/features/auth/api/authAPI'
import { ConfirmDialog } from '../confirm-dialog'
import { Skeleton } from '../ui/skeleton'

export function NavUser() {
  const navigate = useNavigate()
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const { reset, user, isAuthenticated, isLoading } = useAuthStore()

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      toast.success(data.message)
      reset()
      navigate({ to: '/landing' })
    },
    onError: (error) => {
      toast.error(error.message || 'Logout failed.')
    },
  })

  const handleLogoutConfirm = () => {
    mutation.mutate()
    setShowLogoutDialog(false)
  }

  // Show skeleton while loading user/auth state
  if (isLoading) {
    return (
      <div className='flex space-x-2'>
        <Skeleton className='h-10 w-32 rounded-full' />
      </div>
    )
  }

  // We won't render anything if there's no authenticated user.
  if (!user && !isAuthenticated) {
    return (
      <div className='flex space-x-2'>
        <Button asChild variant={'secondary'} size={'lg'}>
          <Link to='/sign-up'>Sign Up</Link>
        </Button>
        <Button asChild size={'lg'}>
          <Link to='/sign-in'>Login</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className='flex space-x-2'>
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* This trigger is a simple button and has no dependency on the sidebar */}
            <Button
              variant='ghost'
              className='flex h-auto items-center gap-x-2 p-1 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
            >
              <Avatar className='size-8'>
                <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                <AvatarFallback>
                  {user?.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <ChevronDownIcon
                size={16}
                className='opacity-60'
                aria-hidden='true'
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-64' align='end' sideOffset={8}>
            <DropdownMenuLabel className='flex min-w-0 flex-col font-normal'>
              <span className='text-foreground truncate text-sm font-medium'>
                {user?.name}
              </span>
              <span className='text-muted-foreground truncate text-xs font-normal'>
                {user?.email}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to='/settings/account'>
                  <UserPenIcon
                    size={16}
                    className='mr-2 opacity-60'
                    aria-hidden='true'
                  />
                  <span>Account Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BoltIcon
                  size={16}
                  className='mr-2 opacity-60'
                  aria-hidden='true'
                />
                <span>Upgrade to Pro</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to='/settings'>
                  <CreditCard
                    size={16}
                    className='mr-2 opacity-60'
                    aria-hidden='true'
                  />
                  <span>Billing & Invoices</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to='/settings/notifications'>
                  <Bell
                    size={16}
                    className='mr-2 opacity-60'
                    aria-hidden='true'
                  />
                  <span>Notifications</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setShowLogoutDialog(true)}
              disabled={mutation.isPending}
              variant='destructive'
            >
              <LogOutIcon
                size={16}
                className='mr-2 opacity-60'
                aria-hidden='true'
              />
              <span>{mutation.isPending ? 'Logging out...' : 'Logout'}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
      <ConfirmDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        title='Sign Out'
        desc='Are you sure you want to sign out of your account?'
        confirmText='Sign Out'
        cancelBtnText='Cancel'
        destructive={true}
        isLoading={mutation.isPending}
        handleConfirm={handleLogoutConfirm}
      />
    </div>
  )
}
