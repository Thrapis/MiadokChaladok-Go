import { useEffect, useState } from 'react'
import { ReactFitty } from 'react-fitty'

import Lightbox from "yet-another-react-lightbox"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"

import css from './ProductBlock.module.css'

import { IMAGES_SOURCE, ROUTE_CONSTANTS } from 'shared/config'
import { Icon, Link, NumericUpDown, RadioGroup } from 'shared/ui'

import { Product } from 'entities'
import { GetDisplayPrice } from 'entities/price/PriceFormat'
import { AddToCartButton } from 'features'

export type Props = {
    product: Product
}

export const ProductBlock = ({
    product
}: Props) => {
    const onlyOption = product.options.length === 1

    const [selectedOptionId, setSelectedOptionId] = useState<number | undefined>(
        onlyOption ? product.options[0].id : undefined
    )
    const [quantity, setQuantity] = useState<number>(1)
    const [optionPrice, setOptionPrice] = useState<string>(GetDisplayPrice(product.options, selectedOptionId))

    const options = product.options.map(
        option => ({ 'value': `${option.id}`, 'title': `${option.name} (${option.price} р.)` })
    )

    useEffect(() => {
        const price = GetDisplayPrice(product.options, selectedOptionId)
        setOptionPrice(price)
    }, [selectedOptionId])

    return (
        <>
            <div className={css.totalBlock}>
                <div className={css.imageBlock}>
                    <img
                        className={css.image}
                        src={`${IMAGES_SOURCE}${product?.imagePath}`}
                        alt={product.name}
                    />
                </div>
                <div className={css.infoBlock}>
                    <div className={css.title}>
                        <ReactFitty minSize={12} maxSize={48}>
                            <h1>{product.name}</h1>
                        </ReactFitty>
                    </div>

                    <div className={css.content}>
                        {/* <BlockAddToCart product={product} /> */}

                        <div className={css.control}>
                            <h4>Аб'ём:</h4>
                            <RadioGroup
                                size='small'
                                selected={`${selectedOptionId}`}
                                options={options}
                                onChange={newValue => setSelectedOptionId(parseInt(newValue))}
                                className={css.radioGroup}
                            />

                            {/* <div className={css.formError}>{errors.optionId?.message}</div> */}

                            <div className={css.addToCartSpace}>
                                <div className={css.priceAndAmoutSpace}>
                                    <span className={css.price}>{`${optionPrice} р.`}</span>
                                    <NumericUpDown
                                        className={css.amountControl}
                                        value={quantity}
                                        min={1}
                                        max={99}
                                        step={1}
                                        onChange={newValue => setQuantity(newValue)}
                                    />
                                </div>
                                {/* <Button
                                    type='submit'
                                    size='large'
                                    shape='round'
                                    width='fluid'
                                    className={css.submitButton}
                                >
                                    Дадаць у кошык
                                </Button> */}
                                <AddToCartButton
                                    className={css.addToCartButton}
                                    item={
                                        selectedOptionId ? {
                                            productId: product.id,
                                            optionId: selectedOptionId,
                                            quantity: quantity
                                        } : undefined
                                    }
                                >
                                    Дадаць у кошык
                                </AddToCartButton>
                            </div>
                        </div>

                        <InfoTable product={product} />
                    </div>
                </div>
            </div>
            <MediaSection product={product} />
        </>
    )
}

type InfoTableProps = {
    product: Product
}

const InfoTable = ({
    product
}: InfoTableProps) => {
    const [isInStock, setIsInStock] = useState<boolean>(false)
    const [isInStorage, setIsInStorage] = useState<boolean>(false)

    useEffect(() => {
        setIsInStock(
            product.options.some(o => {
                return o.availibility.some(a => {
                    return a.inStock > 0
                })
            })
        )
        setIsInStorage(
            product.options.some(o => {
                return o.availibility.some(a => {
                    return a.inStorage > 0
                })
            })
        )
    }, [])

    return (
        <table className={css.infoTable}>
            <tbody>
                <tr>
                    <th><h4>Наяўнасць:</h4></th>
                    <td>
                        {isInStock ? `Зараз ёсць у нашай краме` : (
                            isInStorage ? `Зараз ёсць на складзе` : `Няма ў наяўнасці`
                        )}
                    </td>
                </tr>
                <tr>
                    <th><h4>Дастаўка:</h4></th>
                    <td>
                        {product.shipmentMethods.map((sm, i, arr) => (
                            `${sm.name}${i < arr.length - 2 ? `, ` : (
                                i === arr.length - 2 ? ` або ` : `. `
                            )}`
                        ))}
                        <Link
                            className={css.infoTableLink}
                            size='small'
                            href={ROUTE_CONSTANTS.CONTACTS_AND_DELIVERY.ROUTE}
                        >
                            Падрабязней тут
                        </Link>
                    </td>
                </tr>
                <tr>
                    <th><h4>Годны:</h4></th>
                    <td>{product.expiration}</td>
                </tr>
                <tr>
                    <th><h4>Смак:</h4></th>
                    <td>{product.taste.description}</td>
                </tr>
            </tbody>
        </table>
    )
}

type MediaSectionProps = {
    product: Product
}

const MediaSection = ({
    product
}: MediaSectionProps) => {
    const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null)

    function getImageSet(mediaId: number) {
        const mediaSet = product.media.map(m => ({ src: `${IMAGES_SOURCE}${m.imagePath}` }))
        const selectedIndex = product.media.findIndex(m => m.id === mediaId)
        return mediaSet.slice(selectedIndex, mediaSet.length).concat(mediaSet.slice(0, selectedIndex))
    }

    return (
        <>
            <div className={css.mediaCollection}>
                {
                    product.media?.map((m, index) => (
                        <button
                            className={css.mediaWrapper}
                            type="button"
                            onClick={() => {
                                setSelectedMediaId(m.id)
                            }}
                            key={crypto.randomUUID()}
                        >
                            <img
                                className={css.media}
                                src={`${IMAGES_SOURCE}${m.imagePath}`}
                                alt={`Выява ${index}`}
                            />
                        </button>
                    ))
                }
            </div>
            <Lightbox
                plugins={[Thumbnails]}
                render={{
                    iconClose: () => <Icon type='x' size='l' renderType='mask' iconClassName={css.lightboxIcon} />,
                    iconPrev: () => <Icon type='chevron-left' size='xl' renderType='mask' iconClassName={css.lightboxIcon} />,
                    iconNext: () => <Icon type='chevron-right' size='xl' renderType='mask' iconClassName={css.lightboxIcon} />,
                }}
                className={css.miadokLightbox}
                open={selectedMediaId != null}
                close={() => setSelectedMediaId(null)}
                slides={selectedMediaId != null ? getImageSet(selectedMediaId) : []}
            />
        </>
    )
}