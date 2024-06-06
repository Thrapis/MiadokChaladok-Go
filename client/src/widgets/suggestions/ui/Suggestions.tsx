import { useEffect, useState } from 'react';
import axios from 'axios';

import css from './Suggestions.module.css';

import { Icon } from 'shared/ui';
import { ResponseData } from 'shared/model';

import { ProductDto, ProductCard } from 'entities/product/';

export const SuggestionsBlock = () => {
    const [loading, setLoading] = useState(true);
    const [suggestions, setSuggestions] = useState<ProductDto[] | null>(null);

    async function fetchSuggestions() {
        const url = `${process.env.REACT_APP_API_SOURCE}/product/suggestions/3`
        const response = await axios.get<ResponseData>(url)
        setSuggestions(response.data.Data as ProductDto[])
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