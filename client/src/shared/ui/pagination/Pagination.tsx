import cn from 'classnames'

import css from './Pagination.module.css'

import { typesApi } from "shared/types"

type PaginationMeta = typesApi.PaginationMeta

type Props = {
    paginationMeta: PaginationMeta
    onChange?: (value: number) => void
    firstRadius?: number
    currentRadius?: number
    lastRadius?: number
}

const FIRST_RADIUS = 2
const CURRENT_RADIUS = 2
const LAST_RADIUS = 2

export const Pagination = ({
    paginationMeta,
    onChange,
    firstRadius = FIRST_RADIUS,
    currentRadius = CURRENT_RADIUS,
    lastRadius = LAST_RADIUS,
}: Props) => {

    const isHidden = (value: number) => {
        return (1 + firstRadius < value) &&
            (paginationMeta.Page - currentRadius > value || paginationMeta.Page + currentRadius < value) &&
            (paginationMeta.TotalPages - lastRadius > value)
    }

    return (
        <div className={css.list}>
            <div className={cn(css.element, paginationMeta.Page - 1 < 1 && css.disabled)}>
                <div 
                    className={css.button} 
                    onClick={() => onChange?.(paginationMeta.Page - 1)}
                >
                    {"<"}
                </div>
            </div>
            {
                Array.from({ length: paginationMeta.TotalPages }, (_, i) => i + 1).map((value) =>
                    <div
                        className={cn(
                            css.element,
                            isHidden(value) && css.hidden,
                            value === paginationMeta.Page && css.current
                        )}
                        key={crypto.randomUUID()}
                    >
                        <div className={css.button} onClick={() => onChange?.(value)}>{value}</div>
                    </div>
                )
            }
            <div className={cn(css.element, paginationMeta.Page + 1 > paginationMeta.TotalPages && css.disabled)}>
                <div 
                    className={css.button} 
                    onClick={() => onChange?.(paginationMeta.Page + 1)}
                >
                    {">"}
                </div>
            </div>
        </div>
    )
}