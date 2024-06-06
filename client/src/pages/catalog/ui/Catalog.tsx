import cn from 'classnames'
import { useEffect, useState } from 'react';
import axios from 'axios';

import css from './Catalog.module.css';

import { Breadcrumbs } from 'widgets/breadcrumbs';
import { Icon } from 'shared/ui';
import { ResponseData } from 'shared/model';

import { ProductDto, ProductCard } from 'entities/product/';
import { CatalogFilter } from 'widgets/catalog-filter';

export const Catalog = () => {
    const [loading, setLoading] = useState(true);
    const [suggestions, setSuggestions] = useState<ProductDto[] | null>(null);

    async function fetchSuggestions() {
        const url = `${process.env.REACT_APP_API_SOURCE}/product/search/12`
        const response = await axios.get<ResponseData>(url)
        setSuggestions(response.data.Data as ProductDto[])
        setLoading(false)
    }

    useEffect(() => {
        fetchSuggestions()
    }, [])

    return (
        <div className={cn(css.pageContent)}>
            <Breadcrumbs />

            <CatalogFilter />

            <div className={css.productsList}>
                {
                    loading ? (
                        <Icon type='loading-animated' size='xxlarge' />
                    ) : (
                        suggestions?.map((suggest: ProductDto) => (
                            <ProductCard
                                dto={suggest}
                                key={crypto.randomUUID()}
                                className={css.productCard}
                            />
                        ))
                    )
                }
            </div>

        </div>
    )
}