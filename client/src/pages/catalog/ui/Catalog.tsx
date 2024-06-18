import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
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

const { GetCatalogProducts, GetCatalogProductsByFilter } = apiProduct
type PaginationMeta = typesApi.PaginationMeta
type FilterForm = typesForms.FilterForm

const PAGE_SIZE = 12

const INIT_PAGE = 1
const INIT_TOTAL_PAGES = INIT_PAGE

export const Catalog = () => {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<ProductDto[] | null>(null)
    const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
        Page: INIT_PAGE, PageSize: PAGE_SIZE, TotalPages: INIT_TOTAL_PAGES
    })

    const {
        control,
        handleSubmit,
        getValues,
    } = useForm<FilterForm>()

    const anchorRef = useRef<HTMLDivElement>(null)

    async function fetchProducts() {
        const response = await GetCatalogProducts(INIT_PAGE, PAGE_SIZE)
        setProducts(response.data.Data as ProductDto[])
        setPaginationMeta(response.data.Meta as PaginationMeta)
        setLoading(false)
    }

    async function onFilterChange(filter: FilterForm, page: number) {
        const response = await GetCatalogProductsByFilter(filter, page, PAGE_SIZE)
        setPaginationMeta(response.data.Meta as PaginationMeta)
        setProducts(response.data.Data as ProductDto[])
    }

    async function onPaginationPageChange(value: number) {
        await onFilterChange(getValues(), value)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

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
                control={control}
                handleSubmit={handleSubmit}
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