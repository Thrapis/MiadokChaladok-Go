import cn from 'classnames'
import { useEffect, useState } from 'react';
import axios from 'axios';

import css from './Catalog.module.css';

import { SOURCES } from 'shared/config/sources';
import { Breadcrumbs } from 'widgets/breadcrumbs';
import { Button, Link, Icon } from 'shared/ui';

import { ProductDto, ProductCard } from 'entities/product/';
import { CatalogFilter } from 'widgets/catalog-filter';

type SearchResponse = {
    products: ProductDto[]
}

export const Catalog = () => {
    const [loading, setLoading] = useState(true);
    const [suggestions, setSuggestions] = useState<ProductDto[] | null>(null);

    async function fetchSuggestions() {
        const response = await axios.get<SearchResponse>(`${SOURCES.API}/product/search/12`)
        setSuggestions(response.data.products)
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