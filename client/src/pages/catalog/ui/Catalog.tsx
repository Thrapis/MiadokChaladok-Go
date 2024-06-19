import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import css from './Catalog.module.css'

import { Icon, Pagination } from 'shared/ui'
import { apiProduct } from 'shared/api'
import { typesApi, typesForms } from 'shared/types'

import { ProductDto } from 'entities'

import { productCardUi } from 'widgets/product-card'

import { breadcrumbsUi } from 'widgets/breadcrumbs'
import { catalogFilterUi } from 'features/catalog-filter'

const { Breadcrumbs } = breadcrumbsUi
const { CatalogFilter } = catalogFilterUi
const { ProductCard } = productCardUi

const { GetCatalogProductsByFilter } = apiProduct
type PaginationMeta = typesApi.PaginationMeta
type FilterForm = typesForms.FilterForm

const PAGE_SIZE = 12
const INIT_PAGE = 1
const INIT_TOTAL_PAGES = INIT_PAGE
const DEFAULT_FILTER = { ignoreFilters: true } as FilterForm

export const Catalog = () => {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<ProductDto[] | null>(null)
    const [lastFilterForm, setLastFilterForm] = useState<FilterForm>(DEFAULT_FILTER)
    const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
        Page: INIT_PAGE, PageSize: PAGE_SIZE, TotalPages: INIT_TOTAL_PAGES
    })

    const anchorRef = useRef<HTMLDivElement>(null)

    async function fetchProducts(filter: FilterForm, page: number) {
        const response = await GetCatalogProductsByFilter(filter, page, PAGE_SIZE)
        setPaginationMeta(response.data.Meta as PaginationMeta)
        setProducts(response.data.Data as ProductDto[])
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
        anchorRef.current?.scrollIntoView({
            block: "nearest",
            inline: "center",
            behavior: "smooth",
        })
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
                        <Icon type='loading-animated' size='xxlarge' />
                    ) : (
                        products?.map((dto: ProductDto) => (
                            <ProductCard
                                dto={dto}
                                key={crypto.randomUUID()}
                                className={css.productCard}
                            />
                        ))
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