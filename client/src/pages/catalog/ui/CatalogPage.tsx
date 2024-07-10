import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import css from './CatalogPage.module.css'

import { Icon, Pagination } from 'shared/ui'
import { apiProduct } from 'shared/api'
import { typesApi, typesForms } from 'shared/types'

import { Product } from 'entities'

import { productCardUi } from 'widgets/product-card'

import { breadcrumbsUi } from 'widgets/breadcrumbs'
import { catalogFilterUi } from 'features/catalog-filter'

const { Breadcrumbs } = breadcrumbsUi
const { CatalogFilter } = catalogFilterUi
const { ProductCard } = productCardUi

const { GetProductsByFilterPaginated } = apiProduct
type PaginationMeta = typesApi.PaginationMeta
type FilterForm = typesForms.FilterForm

const PAGE_SIZE = 12
const INIT_PAGE = 1
const DEFAULT_FILTER = { ignoreFilters: true } as FilterForm

export const CatalogPage = () => {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<Product[] | null>(null)
    const [lastFilterForm, setLastFilterForm] = useState<FilterForm>(DEFAULT_FILTER)
    const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
        page: INIT_PAGE, pageSize: PAGE_SIZE, totalPages: 0
    })

    const anchorRef = useRef<HTMLDivElement>(null)

    async function fetchProducts(filter: FilterForm, page: number) {
        const response = await GetProductsByFilterPaginated(filter, page, PAGE_SIZE)

        console.log(response.data)

        setPaginationMeta(response.data.meta as PaginationMeta)
        setProducts(response.data.payload as Product[])
        if (filter === DEFAULT_FILTER) {
            setLoading(false)
            return
        }
    }

    async function onFilterChange(filter: FilterForm) {
        setLastFilterForm(filter)
    }

    async function onPaginationPageChange(page: number) {
        await fetchProducts(lastFilterForm, page)
    }

    useEffect(() => {
        fetchProducts(lastFilterForm, 1)
    }, [lastFilterForm])

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
        <div className={cn(css.pageContent)}>
            <Breadcrumbs />

            <div ref={anchorRef} data-name="anchor"></div>

            <CatalogFilter
                onFilterChange={onFilterChange}
            />

            <div className={css.productsList}>
                {
                    loading ? (
                        <Icon type='loading-animated' size='xxl' />
                    ) : (
                        paginationMeta.totalPages > 0 ? (
                            products?.map((product: Product) => (
                                <ProductCard
                                    product={product}
                                    key={crypto.randomUUID()}
                                    className={css.productCard}
                                />
                            ))
                        ) : (
                            <span className={css.noProductsText}>
                                Прадуктаў па дадзеным фільтрам не знойдзена
                            </span>
                        )
                    )
                }
            </div>

            <Pagination
                paginationMeta={paginationMeta}
                onChange={onPaginationPageChange}
            />
        </div>
    )
}