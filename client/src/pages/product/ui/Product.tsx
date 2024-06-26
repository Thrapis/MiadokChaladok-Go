import { useNavigate, useParams } from 'react-router'
import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import css from './Product.module.css'

import { ROUTE_CONSTANTS } from 'shared/config';
import { apiProduct, apiReview } from 'shared/api'
import { typesApi } from 'shared/types'
import { Button, Icon, Modal, Pagination } from 'shared/ui'

import { ProductDto, Review } from 'entities'

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

export const Product = () => {
    const [loading, setLoading] = useState(true)
    const [reviewLoading, setReviewLoading] = useState(true)
    const [isAddReviewModalOpened, setIsAddReviewModalOpened] = useState(false)
    const [productDto, setProductDto] = useState<ProductDto>()
    const [reviews, setReviews] = useState<Review[]>([])
    const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
        Page: INIT_PAGE, PageSize: PAGE_SIZE, TotalPages: 0
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

        const dto = response.data.Data as ProductDto
        if (dto === null) {
            naviagte(ROUTE_CONSTANTS.NOT_FOUND.ROUTE)
            return
        }

        setProductDto(response.data.Data as ProductDto)
        setLoading(false)
    }

    const fetchReviews = async (page: number) => {
        if (!productId) {
            return
        }
        const productIdParsed = parseInt(productId)
        const response = await GetReviewsByProductIdPaginated(productIdParsed, page, PAGE_SIZE)
        setReviews(response.data.Data as Review[])
        setPaginationMeta(response.data.Meta as PaginationMeta)
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
        setTimeout(() => {
            anchorRef.current?.scrollIntoView({
                block: "nearest",
                inline: "center",
                behavior: "smooth",
            })
        }, 50)
    }, [paginationMeta])

    return (
        <div className={css.pageContent}>
            <Breadcrumbs current={productDto?.productName} />
            {
                loading ? (
                    <Icon type='loading-animated' size='xxlarge' />
                ) : (
                    <>
                        <ProductBlock dto={productDto!} />

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

                            <div ref={anchorRef} data-name="anchor"></div>

                            <div className={css.reviewList}>
                                {
                                    reviewLoading ? (
                                        <Icon type='loading-animated' size='xxlarge' />
                                    ) : (
                                        paginationMeta.TotalPages > 0 ? (
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
                                        <Icon type='x' size='medium' />
                                    </Button>
                                </div>
                                <ModalAddReview
                                    productId={productDto!.productId}
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