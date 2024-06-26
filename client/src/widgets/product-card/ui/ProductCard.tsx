import cn from 'classnames'

import css from './ProductCard.module.css'

import { IMAGES_SOURCE, ROUTE_CONSTANTS } from 'shared/config'

import { ProductDto } from 'entities'

import { addToCartUi } from 'features/add-to-cart'
import { Link } from 'shared/ui'

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
            <Link 
                size='fit'
                className={css.linkOnImage}
                href={ROUTE_CONSTANTS.PRODUCT.ROUTE.replace(":productId", `${dto.productId}`)}
            >
                <img className={css.image}
                    src={`${IMAGES_SOURCE}${dto.imagePath}`}
                    title={dto.productName}
                    alt={dto.productName}
                />
            </Link>
            <div className={css.control}>
                <CardAddToCart dto={dto} />
            </div>
        </div>
    )
}