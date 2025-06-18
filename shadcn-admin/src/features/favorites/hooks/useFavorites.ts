import { useQuery } from '@tanstack/react-query'
import { FavoritesResponse, fetchFavorites } from '../api/favoritesAPI'

export function useFavorites() {
  return useQuery<FavoritesResponse>({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
  })
}
