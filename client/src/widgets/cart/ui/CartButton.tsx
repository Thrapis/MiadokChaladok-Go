import cn from 'classnames'

import css from './CartButton.module.css'

import { ROUTE_CONSTANTS } from "shared/config"
import { Icon, Link } from "shared/ui"
import { useSelector } from 'react-redux'
import { selectCart } from 'entities/cart'

type Props = {
    
}

export const CartButton = ({
    
}: Props) => {
    const cart = useSelector(selectCart)

    const totalCountItems = cart.reduce(
        (total, current) => total + current.quantity,
        0
    )

    return(
        <Link className={cn(css.linkButton)} size='fit' theme='text' href={ROUTE_CONSTANTS.CART.ROUTE}>
            <Icon className={css.iconWrapper} type='cart' renderType='mask' size='xxxl' />
            <span className={cn(css.counter, totalCountItems === 0 && css.zero)}>{totalCountItems}</span>
        </Link>
    )
}