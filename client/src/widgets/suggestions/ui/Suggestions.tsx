import { useEffect, useState } from 'react'

import css from './Suggestions.module.css'

import { Icon } from 'shared/ui'
import { apiProduct } from 'shared/api'

import { ProductDto } from 'entities'

import { productCardUi } from 'widgets/product-card'

const { GetSuggestedProducts } = apiProduct
const { ProductCard } = productCardUi

export const SuggestionsBlock = () => {
    const [loading, setLoading] = useState(true);
    const [suggestions, setSuggestions] = useState<ProductDto[] | null>(null);

    async function fetchSuggestions() {
        const response = await GetSuggestedProducts(3)
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