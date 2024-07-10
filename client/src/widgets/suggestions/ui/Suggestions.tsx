import { useEffect, useState } from 'react'

import css from './Suggestions.module.css'

import { Icon } from 'shared/ui'
import { GetSuggestedProducts, IProductPreview } from 'shared/api/product'

import { ProductCard } from 'widgets/product'

const suggestionsLimit = 3

export const SuggestionsBlock = () => {
    const [loading, setLoading] = useState(true);
    const [suggestions, setSuggestions] = useState<IProductPreview[] | null>(null);

    const fetchSuggestions = async () => {
        await GetSuggestedProducts(suggestionsLimit)
            .then(response => response.data)
            .then(data => {
                setSuggestions(data.payload)
                setLoading(false)
            })
            .catch(error => console.error('Error fetching data:', error))
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
                        <Icon type='loading-animated' size='xxl' />
                    ) : (
                        suggestions?.map(suggest => (
                            <ProductCard
                                product={suggest}
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