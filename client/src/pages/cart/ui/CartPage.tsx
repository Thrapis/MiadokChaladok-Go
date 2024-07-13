import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import css from './CartPage.module.css'

import { Icon } from 'shared/ui'
import { GetCartItems, IOptionItem } from 'shared/api/cart'

import { changeItemQuantityInCart, removeItemFromCart, selectCart } from 'entities/cart'

import { CartControl, CartItem } from 'widgets/cart'
import { Breadcrumbs } from 'widgets/breadcrumbs'

export const CartPage = () => {
    const dispatch = useDispatch()
    const [items, setItems] = useState<IOptionItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const cart = useSelector(selectCart)

    const quantityOfItem = (optionId: number) => cart.find(i => i.optionId === optionId)?.quantity || 0

    const totalPrice = () => cart.reduce((p, c) => {
        return p + c.quantity * (items.find(i => i.id === c.optionId)?.price || 0)
    }, 0)

    const changeQuantity = (item: IOptionItem, quantity: number) => {
        dispatch(changeItemQuantityInCart({ optionId: item.id, quantity: quantity }))
    }

    const removeItem = (item: IOptionItem) => {
        dispatch(removeItemFromCart({ optionId: item.id }))
        setItems(items.filter(i => i.id !== item.id))
    }

    const fetchCartItems = async () => {
        const form = {optionIds: cart.map(i => i.optionId)}
        
        await GetCartItems(form)
            .then(response => response.data)
            .then(data => {
                setItems(data.payload || [])
                setIsLoading(false)
            })
            .catch(error => console.error('Error fetching data:', error))
    }

    useEffect(() => {
        if (cart.length !== 0) {
            fetchCartItems()
        } else {
            setIsLoading(false)
        }
    }, []);

    return (
        <div className={css.pageContent}>
            <Breadcrumbs />

            <div className={css.titleSpace}>
                <h2>Ваш кошык:</h2>
            </div>
            {
                isLoading ? (
                    <div className={css.loadingBlock}>
                        <Icon type='loading-animated' size='xxxl' />
                    </div>
                ) : (
                    cart.length === 0 ? (
                        <div className={css.emptyCartBlock}>
                            Ваш кошык пусты. Дадайце ў кошык тое, што выс цікавіць
                        </div>
                    ) : (
                        <>
                            <div className={css.itemList}>
                                {
                                    items?.map(i => (
                                        <CartItem
                                            item={i}
                                            quantity={quantityOfItem(i.id)}
                                            key={crypto.randomUUID()}
                                            onQuantityChange={changeQuantity}
                                            onRemove={removeItem}
                                        />
                                    ))
                                }
                            </div>
                            <CartControl
                                totalPrice={totalPrice()}
                                methods={items?.[0]?.shipmentMethods || []}
                            />
                        </>
                    )
                )
            }
        </div>
    )
}