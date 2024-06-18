import cn from 'classnames'

import css from './ProductCard.module.css'

import { IMAGES_SOURCE } from 'shared/config'

import { ProductDto } from 'entities'

import { addToCartUi } from 'features/add-to-cart'

const { CardAddToCart } = addToCartUi

export type Props = {
    className?: string
    dto: ProductDto
}

export const ProductCard = ({
    className,
    dto
}: Props) => {
    return (
        <div className={cn(css.card, className)}>
            <img className={css.image}
                src={`${IMAGES_SOURCE}${dto.imagePath}`}
                title={dto.productName}
                alt={dto.productName}
            />
            <div className={css.control}>
                <CardAddToCart dto={dto} />
            </div>
        </div>
    )
}