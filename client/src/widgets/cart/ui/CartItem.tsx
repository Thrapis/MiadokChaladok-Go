import css from './CartItem.module.css'

import { IMAGES_SOURCE, ROUTE_CONSTANTS } from 'shared/config'
import { Button, Icon, Link, NumericUpDown } from 'shared/ui'
import { ICartItemDescription } from 'shared/api/cart'

type CartItemProps = {
    onRemove?: (item: ICartItemDescription) => void
    onQuantityChange?: (item: ICartItemDescription, quantity: number) => void
    item: ICartItemDescription
    quantity: number
}

export const CartItem = ({
    onRemove,
    onQuantityChange,
    item,
    quantity
}: CartItemProps) => {

    return (
        <div className={css.wrapper}>
            <Link className={css.imageWrapper} href={ROUTE_CONSTANTS.PRODUCT.ROUTE.replace(":productId", `${item.product.id}`)}>
                <img className={css.image} src={`${IMAGES_SOURCE}${item.product.imagePath}`} />
            </Link>
            <div className={css.content}>
                <div className={css.description}>
                    <div className={css.naming}>
                        <h3>{item.product.name}</h3>
                        <span>{item.name}</span>
                    </div>
                    <div className={css.availibility}>
                        <span className={css.availibilityLabel}>У наяўнасці:</span>
                        <span className={css.availibilityCount}>
                            {item.availibility[0].inStock + item.availibility[0].inStorage} адз.
                        </span>
                    </div>
                </div>
                <div className={css.priceAndControl}>
                    <div className={css.quantityControlBlock}>
                        <NumericUpDown
                            className={css.quantityControl}
                            min={1}
                            max={99}
                            value={quantity}
                            onChange={(quantity) => onQuantityChange?.(item, quantity)}
                        />
                    </div>
                    <div className={css.priceBlock}>
                        <span className={css.price}>{(item.price * quantity).toFixed(2)} р.</span>
                    </div>
                </div>
                <div className={css.removeSection}>
                    <Button theme='text' size='medium' onClick={() => onRemove?.(item)}>
                        <Icon type='x' size='l' />
                    </Button>
                </div>
            </div>
        </div>
    )
}