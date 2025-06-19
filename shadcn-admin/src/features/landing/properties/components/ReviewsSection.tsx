import { formatDistanceToNow } from 'date-fns'
import { StarIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Review } from '../types'

interface ReviewsSectionProps {
  reviews: Review[]
}

export const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  if (!reviews || reviews.length === 0) {
    return <div className='text-muted-foreground text-sm'>No reviews yet</div>
  }

  return (
    <div className='space-y-4'>
      <h3 className='font-medium'>Reviews ({reviews.length})</h3>
      <div className='space-y-3'>
        {reviews.map((review) => (
          <div key={review._id} className='border-b pb-3 last:border-0'>
            <div className='mb-1 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Avatar>
                  <AvatarImage src={review.authorId.avatarUrl || ''} />
                  <AvatarFallback className='text-sm'>
                    {review.authorId.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className='text-sm font-medium'>
                  {review.authorId.name}
                </span>
              </div>
              <span className='text-muted-foreground text-sm'>
                {formatDistanceToNow(new Date(review.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <div className='mb-1 flex items-center gap-2'>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-3.5 w-3.5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                  />
                ))}
              </div>
            </div>
            <p className='text-sm'>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewsSection
