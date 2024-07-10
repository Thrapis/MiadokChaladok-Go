import css from './CartItem.module.css'

import { apiProduct } from 'shared/api'
import { IMAGES_SOURCE } from 'shared/config'
import { Button, Icon, NumericUpDown } from 'shared/ui'
import { FormatPrice } from 'entities/price/PriceFormat'

type Item = apiProduct.ICartOption

type CartItemProps = {
    onRemove?: (item: Item) => void
    onQuantityChange?: (item: Item, quantity: number) => void
    item: Item
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
            <div className={css.imageWrapper}>
                <img className={css.image} src={`${IMAGES_SOURCE}${item.product.imagePath}`} />
            </div>
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
                            value={quantity} 
                            onChange={(quantity) => onQuantityChange?.(item, quantity)}
                        />
                    </div>
                    <div className={css.priceBlock}>
                        <span className={css.price}>{FormatPrice(item.price * quantity)} р.</span>
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