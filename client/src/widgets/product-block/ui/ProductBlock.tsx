import { useEffect, useState } from 'react'
import { ReactFitty } from 'react-fitty'

import Lightbox from "yet-another-react-lightbox"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"

import css from './ProductBlock.module.css'

import { IMAGES_SOURCE, ROUTE_CONSTANTS } from 'shared/config'
import { Icon, Link } from 'shared/ui'

import { ProductDto } from 'entities'

import { addToCartUi } from 'features'

const { BlockAddToCart } = addToCartUi

export type Props = {
    dto: ProductDto
}

export const ProductBlock = ({
    dto
}: Props) => {

    return (
        <>
            <div className={css.totalBlock}>
                <div className={css.imageBlock}>
                    <img
                        className={css.image}
                        src={`${IMAGES_SOURCE}${dto?.imagePath}`}
                        alt={dto.productName}
                    />
                </div>
                <div className={css.infoBlock}>
                    <div className={css.title}>
                        <ReactFitty minSize={12} maxSize={48}>
                            <h1>{dto.productName}</h1>
                        </ReactFitty>
                    </div>

                    <div className={css.content}>
                        <BlockAddToCart dto={dto} />
                        <InfoTable dto={dto} />
                    </div>
                </div>
            </div>
            <MediaSection dto={dto} />
        </>
    )
}

type InfoTableProps = {
    dto: ProductDto
}

const InfoTable = ({
    dto
}: InfoTableProps) => {
    const [isInStock, setIsInStock] = useState<boolean>(false)
    const [isInStorage, setIsInStorage] = useState<boolean>(false)

    useEffect(() => {
        setIsInStock(
            dto.optionList.some(o => {
                return o.availibility.some(a => {
                    return a.inStock > 0
                })
            })
        )
        setIsInStorage(
            dto.optionList.some(o => {
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
                        {dto.shipmentMethodList.map((sm, i, arr) => (
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
                    <td>{dto.expiration}</td>
                </tr>
                <tr>
                    <th><h4>Смак:</h4></th>
                    <td>{dto.taste.description}</td>
                </tr>
            </tbody>
        </table>
    )
}

type MediaSectionProps = {
    dto: ProductDto
}

const MediaSection = ({
    dto
}: MediaSectionProps) => {
    const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null)

    function getImageSet(mediaId: number) {
        const mediaSet = dto.mediaList.map(m => ({ src: `${IMAGES_SOURCE}${m.imagePath}` }))
        const selectedIndex = dto.mediaList.findIndex(m => m.id === mediaId)
        return mediaSet.slice(selectedIndex, mediaSet.length).concat(mediaSet.slice(0, selectedIndex))
    }

    return (
        <>
            <div className={css.mediaCollection}>
                {
                    dto.mediaList?.map((m, index) => (
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
                    iconClose: () => <Icon type='x' size='large' iconClassName={css.lightboxIcon} />,
                    iconPrev: () => <Icon type='chevron-left' size='xlarge' iconClassName={css.lightboxIcon} />,
                    iconNext: () => <Icon type='chevron-right' size='xlarge' iconClassName={css.lightboxIcon} />,
                }}
                className={css.miadokLightbox}
                open={selectedMediaId != null}
                close={() => setSelectedMediaId(null)}
                slides={selectedMediaId != null ? getImageSet(selectedMediaId) : []}
            />
        </>
    )
}