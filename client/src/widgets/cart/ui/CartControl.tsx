import { useState } from 'react'
import cn from 'classnames'

import css from './CartControl.module.css'

import { IShipmentMethod } from 'shared/api/Types'
import { Button, InputField, InputSelect } from 'shared/ui'
import { FormatPrice } from 'shared/lib/price'

import { PromoCheckButton } from 'features/promo'

type ShipmentMethod = IShipmentMethod

type CartControlProps = {
    totalPrice: number
    methods: ShipmentMethod[]
}

export const CartControl = ({
    totalPrice,
    methods
}: CartControlProps) => {
    const [promocode, setPromocode] = useState<string>('')
    const [shipmentMethodId, setShipmentMethodId] = useState<number|undefined>(methods.length > 0 ? methods[0].id : undefined)

    const methodOptions = methods.map(m => (
        { "title": `${m.name}`, "value": `${m.id}` }
    ))

    return (
        <div className={css.control}>
            <div className={css.controlCell}>
                <h2 className={css.label}>Прамакод:</h2>
                <InputField
                    className={css.promoInput}
                    size='large'
                    value={promocode}
                    onChange={newValue => setPromocode(newValue.toUpperCase())}
                />
                <PromoCheckButton
                    className={css.promoButton}
                    promocode={promocode}
                />
            </div>
            <div className={cn(css.controlCell, css.centerCell)}>
                <h2 className={css.label}>Агульны кошт: <span className={css.totalPrice}>{FormatPrice(totalPrice)} р.</span></h2>
            </div>
            <div className={css.controlCell}>
                <h2 className={css.label}>Спосаб дастаўкі:</h2>
                <InputSelect
                    className={css.shipmentSelect}
                    options={methodOptions}
                    selected={methodOptions.find(o => o.value === `${shipmentMethodId}`)||null}
                    onChange={newValue => setShipmentMethodId(parseInt(newValue))}
                    size='large'
                />
            </div>
            <div className={css.controlCell}>
                <Button 
                    className={css.submitButton}
                    shape='round' 
                    size='large'
                >
                    Аформіць заказ
                </Button>
            </div>
        </div>
    )
}