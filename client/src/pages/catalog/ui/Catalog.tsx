import cn from 'classnames'
import { createRef, forwardRef, RefObject, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import css from './Catalog.module.css';

import { Breadcrumbs } from 'widgets/breadcrumbs';
import { Icon, Pagination } from 'shared/ui';
import { ResponseData, PaginationMeta } from 'shared/model';
import { FormatString } from 'shared/utils';

import { ProductDto, ProductCard } from 'entities/product/';
import { CatalogFilter, FilterInputs } from 'widgets/catalog-filter';
import { useForm } from 'react-hook-form';

const INIT_PAGE = 1
const INIT_PAGE_SIZE = 12
const INIT_TOTAL_PAGES = INIT_PAGE
const filterUrlTemplate = `${process.env.REACT_APP_API_SOURCE}/search/products?page={0}&pageSize={1}`

export const Catalog = () => {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<ProductDto[] | null>(null)
    const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
        Page: INIT_PAGE, PageSize: INIT_PAGE_SIZE, TotalPages: INIT_TOTAL_PAGES
    })

    const {
        control,
        handleSubmit,
        getValues,
        // watch,
        // formState: { errors },
    } = useForm<FilterInputs>()

    // watch((value, { name, type }) => {
    //     // console.log(value, name, type)
    //     if (name == "categoryIds" && type == 'change') {
    //         // setCategoryIds(value.categoryIds)
    //     }
    // })

    const anchorRef = useRef<HTMLDivElement>(null);

    async function fetchProducts() {
        const url = FormatString(filterUrlTemplate, INIT_PAGE, INIT_PAGE_SIZE)
        const response = await axios.get<ResponseData>(url)
        setProducts(response.data.Data as ProductDto[])
        setPaginationMeta(response.data.Meta as PaginationMeta)
        setLoading(false)
    }

    async function onFilterChange(data: FilterInputs, page: number) {
        // setLoading(true)

        // console.log(data)

        const body = JSON.stringify(data)
        const url = FormatString(filterUrlTemplate, page, paginationMeta.PageSize)
        const response = await axios.post<ResponseData>(url, body)
        setPaginationMeta(response.data.Meta as PaginationMeta)
        setProducts(response.data.Data as ProductDto[])

        // setLoading(false)
    }

    async function onPaginationPageChange(value: number) {
        // console.log(value)
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
                        products?.map((suggest: ProductDto) => (
                            <ProductCard
                                dto={suggest}
                                key={crypto.randomUUID()}
                                className={css.productCard}
                            />
                        ))
                    )
                }
            </div>

            <Pagination paginationMeta={paginationMeta} onChange={onPaginationPageChange} />
        </div>
    )
}