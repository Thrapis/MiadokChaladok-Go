import { useEffect, useState } from "react";
import cn from 'classnames'

import css from './StarRating.module.css'

type Prop = {
    className?: string
    stars?: number
    name?: string
    value?: number
    readonly?: boolean
    onChange?: (selected: number) => void
}

export const StarRating = ({
    className,
    stars = 5,
    name,
    value = 0,
    readonly = false,
    onChange
}: Prop) => {
    const [totalStars, setTotalStars] = useState(stars)
    const [rating, setRating] = useState(value <= stars ? value : stars)
    const [hover, setHover] = useState(0)

    useEffect(() => {
        setRating(value)
    }, [value])

    return(
        <div 
            className={cn(
                css.block,
                className,
                readonly && css.readOnly
            )}
        >
            {[...Array(totalStars)].map((star, index) => {
                const currentRating = index + 1;

                return (
                    <label 
                        className={css.singleWrapper}
                        key={index}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <input
                            className={css.input}
                            type="radio"
                            name={name}
                            value={currentRating}
                            onChange={() => {
                                setRating(currentRating)
                                onChange?.(currentRating)
                            }}
                            checked={rating === currentRating}
                        />
                        <div
                            className={css.star}
                            style={{
                                backgroundImage: `url("/svg/${currentRating <= (hover || rating) ? 'star-full' : 'star-empty'}.svg")`
                            }}
                        >
                        </div>
                    </label>
                );
            })}
        </div>
    )
}