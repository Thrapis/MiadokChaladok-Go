import React, { useEffect, useState } from 'react';
import axios from 'axios';

import css from './Suggestions.module.css';

import { ProductDto, ProductCard } from 'entities/product/';
import { Icon } from 'shared/ui';
import { SOURCES } from 'shared/config/sources';

type SuggestsResponse = {
    products: ProductDto[]
}

export const SuggestionsBlock = () => {
    const [loading, setLoading] = useState(true);
    const [suggestions, setSuggestions] = useState<ProductDto[] | null>(null);

    async function fetchSuggestions() {
        const response = await axios.get<SuggestsResponse>(`${SOURCES.API}/product/suggestions/3`)
        setSuggestions(response.data.products)
        setLoading(false)
    }

    useEffect(() => {
        fetchSuggestions()
    }, [])

    return (
        <div className={css.bestSuggestions}>
            <h2 className={css.bestSuggestionsTitle}>Найлепшыя прапановы</h2>

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