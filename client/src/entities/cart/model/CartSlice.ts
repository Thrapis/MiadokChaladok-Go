import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ICartItem } from './Types'

const initialState: { cart: ICartItem[] } = {
    cart: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartItem>) => {
            const itemIndex = state.cart?.findIndex(
                (item) => item.optionId === action.payload.optionId
            )

            if (itemIndex === -1) {
                state.cart = [action.payload, ...state.cart]
                return state
            }

            state.cart[itemIndex].quantity += action.payload.quantity
            return state
        },
        changeItemQuantityInCart: (
            state,
            action: PayloadAction<{ 
                optionId: number
                quantity: number 
            }>
        ) => {
            const itemIndex = state.cart?.findIndex(
                (item) => item.optionId === action.payload.optionId
            )

            state.cart[itemIndex].quantity = action.payload.quantity
        },
        removeItemFromCart: (
            state,
            action: PayloadAction<{ optionId: number }>
        ) => {
            state.cart = state.cart.filter(
                (item) => item.optionId !== action.payload.optionId
            )

            return state
        },
    },
})

export const { addToCart, changeItemQuantityInCart, removeItemFromCart } = cartSlice.actions
export default cartSlice.reducer