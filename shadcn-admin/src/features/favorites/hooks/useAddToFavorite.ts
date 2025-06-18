// src/features/favorites/api/useAddToFavorite.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { handleServerError } from '@/utils/handle-server-error'
import { addToFavorite } from '../api/favoritesAPI'

export function useAddToFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addToFavorite,
    onSuccess: (data) => {
      toast.success(data?.message || 'Property added to favorites!')
      // Optionally, invalidate queries that fetch favorite status to update the UI
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      queryClient.invalidateQueries({ queryKey: ['property'] }) // Or specific property queries
    },
    onError: (error) => {
      // This utility is perfect for showing API error messages.
      handleServerError(error)
    },
  })
}
