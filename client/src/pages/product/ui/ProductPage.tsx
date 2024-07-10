import { useNavigate, useParams } from 'react-router'
import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import css from './ProductPage.module.css'

import { ROUTE_CONSTANTS } from 'shared/config'
import { Button, Icon, Modal, Pagination } from 'shared/ui'
import { IPaginationMeta } from 'shared/types'
import { IReviewDescription } from 'shared/api/review'
import { GetProductById, IProductDescription } from 'shared/api/product'
import { GetReviewsByProductIdPaginated } from 'shared/api/review'

import { ModalAddReview } from 'features/review'

import { ProductBlock } from 'widgets/product'
import { Breadcrumbs } from "widgets/breadcrumbs"
import { ReviewCloud } from 'widgets/review'

const PAGE_SIZE = 10
const INIT_PAGE = 1

export const ProductPage = () => {
    const [loading, setLoading] = useState(true)
    const [reviewLoading, setReviewLoading] = useState(true)
    const [isAddReviewModalOpened, setIsAddReviewModalOpened] = useState(false)
    const [product, setProduct] = useState<IProductDescription>()
    const [reviews, setReviews] = useState<IReviewDescription[]>([])
    const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta>({
        page: INIT_PAGE, pageSize: PAGE_SIZE, totalPages: 0
    })

    const naviagte = useNavigate()
    const { productId } = useParams()

    const anchorRef = useRef<HTMLDivElement>(null)

    const fetchProduct = async () => {
        if (!productId) {
            return
        }
        const productIdParsed = parseInt(productId)

        await GetProductById(productIdParsed)
            .then(response => response.data)
            .then(data => {
                if (data.payload === null) {
                    naviagte(ROUTE_CONSTANTS.NOT_FOUND.ROUTE)
                    return
                }
                setProduct(data.payload)
                setLoading(false)
            })
            .catch(error => console.error('Error fetching data:', error))
    }

    const fetchReviews = async (page: number) => {
        if (!productId) {
            return
        }
        const productIdParsed = parseInt(productId)

        await GetReviewsByProductIdPaginated(productIdParsed, page, PAGE_SIZE)
            .then(response => response.data)
            .then(data => {
                setReviews(data.payload)
                setPaginationMeta(data.meta)
                setReviewLoading(false)
            })
            .catch(error => console.error('Error fetching data:', error))
    }

    const onPaginationPageChange = async (page: number) => {
        await fetchReviews(page)
    }

    const onAddReviewSuccess = async () => {
        setIsAddReviewModalOpened(false)
        setReviewLoading(true)
        await fetchReviews(1)
    }

    useEffect(() => {
        fetchProduct()
        fetchReviews(INIT_PAGE)
    }, [productId])

    useEffect(() => {
        const bd = anchorRef.current?.getBoundingClientRect()
        if (bd && bd.top < window.screenTop) {
            setTimeout(() => {
                anchorRef.current?.scrollIntoView({
                    block: "nearest",
                    inline: "center",
                    behavior: "smooth",
                })
            }, 50)
        }
    }, [paginationMeta])

    return (
        <div className={css.pageContent}>
            <Breadcrumbs current={product?.name} />
            {
                loading ? (
                    <Icon type='loading-animated' size='xxl' />
                ) : (
                    <>
                        <ProductBlock product={product!} />

                        <div ref={anchorRef} data-name="anchor"></div>

                        <div className={css.reviewsBlock}>
                            <div className={css.reviewsTitleAndControl}>
                                <h2>Водгукі</h2>
                                <Button
                                    size='large'
                                    shape='round'
                                    onClick={() => setIsAddReviewModalOpened(true)}
                                >
                                    Дадаць водгук
                                </Button>
                            </div>

                            <div className={css.reviewList}>
                                {
                                    reviewLoading ? (
                                        <Icon type='loading-animated' size='xxl' />
                                    ) : (
                                        paginationMeta.totalPages > 0 ? (
                                            reviews.map(r => (
                                                <ReviewCloud review={r} key={crypto.randomUUID()} />
                                            ))
                                        ) : (
                                            <span className={css.noReviewsText}>Водгукаў пакуль няма</span>
                                        )
                                    )
                                }
                            </div>
                            <Pagination
                                className={cn(reviewLoading && css.hidden)}
                                paginationMeta={paginationMeta}
                                onChange={onPaginationPageChange}
                            />
                        </div>

                        <Modal isOpen={isAddReviewModalOpened} >
                            <div className={css.addReviewContent}>
                                <div className={css.addReviewContentHeader}>
                                    <h2 className={css.addReviewContentTitle}>Дадаць водгук</h2>
                                    <Button
                                        width='height'
                                        theme='text'
                                        onClick={() => setIsAddReviewModalOpened(false)}
                                    >
                                        <Icon type='x' size='m' />
                                    </Button>
                                </div>
                                <ModalAddReview
                                    productId={product!.id}
                                    onSubmitSuccess={onAddReviewSuccess}
                                />
                            </div>
                        </Modal>
                    </>
                )
            }
        </div>
    )
}