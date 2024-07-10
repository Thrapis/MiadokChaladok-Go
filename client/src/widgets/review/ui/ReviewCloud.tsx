import cn from 'classnames'

import css from './ReviewCloud.module.css'

import { StarRating } from 'shared/ui'
import { IReviewDescription } from 'shared/api/review/Types'

type Props = {
    className?: string
    review: IReviewDescription
}

export const ReviewCloud = ({
    className,
    review
}: Props) => {

    return (
        <div 
            className={cn(
                css.reviewWrapper,
                className
            )}
        >
            <div className={css.baseDataContainer}>
                <div className={css.authorName}>{review.authorName}</div>
                <div className={css.buyDate}>
                    {new Date(review.buyDate).toLocaleDateString('be-BY', {
                        day: '2-digit', month: '2-digit', year: 'numeric'
                    })}
                </div>
                <StarRating 
                    className={css.starRating} 
                    stars={5} 
                    value={review.rating} 
                    readonly 
                />
            </div>
            <div className={css.commentContainer}>
                {review.comment}
            </div>
        </div>
    )
}