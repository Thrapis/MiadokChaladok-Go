import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'

import css from './CatalogPage.module.css'

import { Icon, Pagination } from 'shared/ui'
import { IPaginationMeta } from 'shared/types'
import { IProductPreview } from 'shared/api/product'
import { GetProductsByFilterPaginated, IFilterForm } from 'shared/api/catalog'

import { CatalogFilter } from 'features/catalog'

import { ProductCard } from 'widgets/product'
import { Breadcrumbs } from 'widgets/breadcrumbs'

const PAGE_SIZE = 12
const INIT_PAGE = 1
const DEFAULT_FILTER = { ignoreFilters: true } as IFilterForm

export const CatalogPage = () => {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<IProductPreview[] | null>(null)
    const [lastFilterForm, setLastFilterForm] = useState<IFilterForm>(DEFAULT_FILTER)
    const [paginationMeta, setPaginationMeta] = useState<IPaginationMeta>({
        page: INIT_PAGE, pageSize: PAGE_SIZE, totalPages: 0
    })

    const anchorRef = useRef<HTMLDivElement>(null)

    const fetchProducts = async (filter: IFilterForm, page: number) => {
        await GetProductsByFilterPaginated(filter, page, PAGE_SIZE)
            .then(response => response.data)
            .then(data => {
                setPaginationMeta(data.pagination)
                setProducts(data.payload)
            })
            .catch(error => console.error('Error fetching data:', error))
            .finally(() => {
                if (filter === DEFAULT_FILTER) {
                    setLoading(false)
                    return
                }
            })
    }

    async function onFilterChange(filter: IFilterForm) {
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
                            products?.map(product => (
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