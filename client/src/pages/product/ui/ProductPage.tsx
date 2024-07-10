import { useNavigate, useParams } from 'react-router'
import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import css from './ProductPage.module.css'

import { ROUTE_CONSTANTS } from 'shared/config';
import { apiProduct, apiReview } from 'shared/api'
import { typesApi } from 'shared/types'
import { Button, Icon, Modal, Pagination } from 'shared/ui'

import { Product, Review } from 'entities'

import { ModalAddReview } from 'features/add-review'

import { breadcrumbsUi } from "widgets/breadcrumbs"
import { productBlockUi } from 'widgets/product-block'
import { reviewCloudUi } from 'widgets/review-cloud'

const { GetProductById } = apiProduct
const { GetReviewsByProductIdPaginated } = apiReview

const { Breadcrumbs } = breadcrumbsUi
const { ProductBlock } = productBlockUi
const { ReviewCloud } = reviewCloudUi

type PaginationMeta = typesApi.PaginationMeta

const PAGE_SIZE = 10
const INIT_PAGE = 1

export const ProductPage = () => {
    const [loading, setLoading] = useState(true)
    const [reviewLoading, setReviewLoading] = useState(true)
    const [isAddReviewModalOpened, setIsAddReviewModalOpened] = useState(false)
    const [product, setProduct] = useState<Product>()
    const [reviews, setReviews] = useState<Review[]>([])
    const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
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
        const response = await GetProductById(productIdParsed)

        const dto = response.data.payload as Product
        if (dto === null) {
            naviagte(ROUTE_CONSTANTS.NOT_FOUND.ROUTE)
            return
        }

        setProduct(response.data.payload as Product)
        setLoading(false)
    }

    const fetchReviews = async (page: number) => {
        if (!productId) {
            return
        }
        const productIdParsed = parseInt(productId)
        const response = await GetReviewsByProductIdPaginated(productIdParsed, page, PAGE_SIZE)
        setReviews(response.data.payload as Review[])
        setPaginationMeta(response.data.meta as PaginationMeta)
        setReviewLoading(false)
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