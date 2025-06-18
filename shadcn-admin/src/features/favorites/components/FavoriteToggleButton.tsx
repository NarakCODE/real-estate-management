import { useState, useEffect } from 'react'
import { useMemo } from 'react'
import { Bookmark, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useFavorites } from '@/features/favorites/hooks/useFavorites'
import { addToFavorite, removeFromFavorite } from '../api/favoritesAPI'

interface FavoriteToggleButtonProps {
  propertyId: string
}

export function FavoriteToggleButton({
  propertyId,
}: FavoriteToggleButtonProps) {
  const {
    data: favorites,
    refetch,
    isLoading: isFavoritesLoading,
  } = useFavorites()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  const properties = useMemo(() => favorites?.data ?? [], [favorites])

  // Check if current property is already favorited
  useEffect(() => {
    const favorited = properties.some((f) => f.property._id === propertyId)
    setIsFavorited(!!favorited)
  }, [properties, propertyId])

  const handleToggleFavorite = async () => {
    setIsSubmitting(true)
    try {
      if (isFavorited) {
        await removeFromFavorite(propertyId)
        toast.success('Property removed from favorites!')
      } else {
        await addToFavorite(propertyId)
        toast.success('Property added to favorites!')
      }
      await refetch() // Refresh favorites
    } catch (_error) {
      toast.error('Something went wrong!')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={handleToggleFavorite}
      disabled={isSubmitting || isFavoritesLoading}
    >
      {isSubmitting ? (
        <Loader2 className='h-5 w-5 animate-spin' />
      ) : (
        <Bookmark
          fill={isFavorited ? 'currentColor' : 'none'}
          className='text-blue-500'
        />
      )}
    </Button>
  )
}
