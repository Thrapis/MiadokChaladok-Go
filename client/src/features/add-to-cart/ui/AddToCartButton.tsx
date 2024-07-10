import { Bounce, toast } from 'react-toastify'
import { ReactNode } from "react"
import { useDispatch } from "react-redux"

import { addToCart, ICartItem } from "entities/cart"
import { Button } from "shared/ui"

type Props = {
    className?: string
    item?: ICartItem
    children: ReactNode
}

export const AddToCartButton = ({
    className,
    item,
    children
}: Props) => {
    const dispatch = useDispatch()

    const addProductOptionToCart = () => {
        if (item) {
            dispatch(addToCart(item))
            toast.success("Прадукт паспяхова даданы ў кошык")
        }
    }

    return (
        <Button
            className={className}
            onClick={addProductOptionToCart}
            disabled={!item}
        >
            {children}
        </Button>
    )
}