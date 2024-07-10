import { ReactFitty } from 'react-fitty'
import { useEffect, useState } from 'react'
import cn from 'classnames'

import css from './ProductCard.module.css'

import { Link, RadioGroup } from 'shared/ui'
import { IMAGES_SOURCE, ROUTE_CONSTANTS } from 'shared/config'
import { IProductPreview } from 'shared/api/product'

import { AddToCartButton } from 'features/cart'

import { GetDisplayPrice } from '../model/PriceSpreading'

export type Props = {
    className?: string
    product: IProductPreview
}

export const ProductCard = ({
    className,
    product
}: Props) => {
    const onlyOption = product.options.length === 1

    const [selectedOptionId, setSelectedOptionId] = useState<number|undefined>(
        onlyOption ? product.options[0].id : undefined
    )
    const [optionPrice, setOptionPrice] = useState<string>(GetDisplayPrice(product.options, selectedOptionId))

    const options = product.options.map(
        option => ({ 'value': `${option.id}`, 'title': option.name })
    )

    useEffect(() => {
        const price = GetDisplayPrice(product.options, selectedOptionId)
        setOptionPrice(price)
    }, [selectedOptionId])

    return (
        <div className={cn(css.card, className)}>
            <Link
                size='fit'
                className={css.linkOnImage}
                href={ROUTE_CONSTANTS.PRODUCT.ROUTE.replace(":productId", `${product.id}`)}
            >
                <img className={css.image}
                    src={`${IMAGES_SOURCE}${product.imagePath}`}
                    title={product.name}
                    alt={product.name}
                />
            </Link>
            <div className={css.control}>
                <div className={cn(css.container)}>
                    <div className={css.controlWrapper}>
                        <div className={css.nameAndVolume}>
                            <div className={css.name}>
                                <ReactFitty minSize={12} maxSize={22}>
                                    {product.name}
                                </ReactFitty>
                            </div>

                            <RadioGroup
                                size='small'
                                theme='button'
                                selected={`${selectedOptionId}`}
                                options={options}
                                onChange={newValue => setSelectedOptionId(parseInt(newValue))}
                                className={css.volumeList}
                                optionClassName={onlyOption ? css.volumeOnlyOption : css.volumeOption}
                            />
                        </div>
                        <div className={css.priceAndCartButton}>
                            <div className={css.price}>
                                <ReactFitty minSize={12} maxSize={22}>
                                    {`${optionPrice} р.`}
                                </ReactFitty>  
                            </div>
                            <AddToCartButton 
                                className={css.addToCartButton}
                                item={
                                    selectedOptionId ? {
                                        productId: product.id,
                                        optionId: selectedOptionId, 
                                        quantity: 1
                                    } : undefined
                                }
                            >
                                у кошык
                            </AddToCartButton>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}