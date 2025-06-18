import { Link } from '@tanstack/react-router'
import { Sparkles } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '../ui/button'

const DashboardButton = () => {
  const { user } = useAuthStore()

  return (
    <>
      {user?.roleName === 'Admin' && (
        <Button asChild variant='outline' className='hidden sm:flex'>
          <Link to='/'>
            <Sparkles className='mr-2 size-4' />
            Dashboard
          </Link>
        </Button>
      )}
    </>
  )
}

export default DashboardButton
