import React, { useEffect, useState } from "react";

import css from './StarRating.module.css'

type Prop = {
    stars?: number
    name?: string
    defaultValue?: number
    onChange?: (selected: number) => void
}

export const StarRating = ({
    stars = 5,
    name,
    defaultValue = 0,
    onChange
}: Prop) => {
    const [totalStars, setTotalStars] = useState(stars);
    const [rating, setRating] = useState(defaultValue <= stars ? defaultValue : stars);
    const [hover, setHover] = useState(0);

    return(
        <div className={css.block}>
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