import { useEffect, useState } from 'react'
import { ReactFitty } from 'react-fitty'

import Lightbox from "yet-another-react-lightbox"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"

import css from './ProductBlock.module.css'

import { IMAGES_SOURCE, ROUTE_CONSTANTS } from 'shared/config'
import { Icon, Link, NumericUpDown, RadioGroup } from 'shared/ui'
import { IProductDescription } from 'shared/api/product'

import { AddToCartButton } from 'features/cart'

import { GetDisplayPrice } from '../model/PriceSpreading'

export type Props = {
    product: IProductDescription
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
    product: IProductDescription
}

const InfoTable = ({
    product
}: InfoTableProps) => {

    return (
        <table className={css.infoTable}>
            <tbody>
                <tr>
                    <th><h4>Наяўнасць:</h4></th>
                    <td>
                        {product.isInStock ? `Зараз ёсць у нашай краме` : (
                            product.isInStorage ? `Зараз ёсць на складзе` : `Няма ў наяўнасці`
                        )}
                    </td>
                </tr>
                <tr>
                    <th><h4>Дастаўка:</h4></th>
                    <td>
                        {product.shipmentMethodNames.map((smName, i, arr) => (
                            `${smName}${i < arr.length - 2 ? `, ` : (
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
                    <td>{product.tasteDescription}</td>
                </tr>
            </tbody>
        </table>
    )
}

type MediaSectionProps = {
    product: IProductDescription
}

const MediaSection = ({
    product
}: MediaSectionProps) => {
    const [selectedMediaPath, setSelectedMediaPath] = useState<string | null>(null)

    function getImageSet(mediaPath: string) {
        const mediaSet = product.mediaPaths.map(mPath => ({ src: `${IMAGES_SOURCE}${mPath}` }))
        const selectedIndex = product.mediaPaths.findIndex(mPath => mPath === mediaPath)
        return mediaSet.slice(selectedIndex, mediaSet.length).concat(mediaSet.slice(0, selectedIndex))
    }

    return (
        <>
            <div className={css.mediaCollection}>
                {
                    product.mediaPaths?.map((mPath, index) => (
                        <button
                            className={css.mediaWrapper}
                            type="button"
                            onClick={() => {
                                setSelectedMediaPath(mPath)
                            }}
                            key={crypto.randomUUID()}
                        >
                            <img
                                className={css.media}
                                src={`${IMAGES_SOURCE}${mPath}`}
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
                open={selectedMediaPath != null}
                close={() => setSelectedMediaPath(null)}
                slides={selectedMediaPath != null ? getImageSet(selectedMediaPath) : []}
            />
        </>
    )
}