import { useEffect, useState } from 'react'

import css from './Suggestions.module.css'

import { Icon } from 'shared/ui'
import { apiProduct } from 'shared/api'

import { Product } from 'entities'

import { productCardUi } from 'widgets/product-card'

const { GetSuggestedProducts } = apiProduct
const { ProductCard } = productCardUi

export const SuggestionsBlock = () => {
    const [loading, setLoading] = useState(true);
    const [suggestions, setSuggestions] = useState<Product[] | null>(null);

    async function fetchSuggestions() {
        const response = await GetSuggestedProducts(3)
        setSuggestions(response.data.payload as Product[])
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
                        <Icon type='loading-animated' size='xxl' />
                    ) : (
                        suggestions?.map((suggest: Product) => (
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