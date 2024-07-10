import { ReactNode } from 'react'
import cn from 'classnames'

import css from './Pagination.module.css'

interface IPaginationMeta {
    page: number
    pageSize: number
    totalPages: number
}

type PaginationProps = {
    className?: string
    paginationMeta: IPaginationMeta
    onChange?: (value: number) => void
    firstRadius?: number
    currentRadius?: number
    lastRadius?: number
}

const FIRST_RADIUS = 2
const CURRENT_RADIUS = 2
const LAST_RADIUS = 2

export const Pagination = ({
    className,
    paginationMeta,
    onChange,
    firstRadius = FIRST_RADIUS,
    currentRadius = CURRENT_RADIUS,
    lastRadius = LAST_RADIUS,
}: PaginationProps) => {

    const isHidden = (value: number) => {
        return (1 + firstRadius < value) &&
            (paginationMeta.page - currentRadius > value || paginationMeta.page + currentRadius < value) &&
            (paginationMeta.totalPages - lastRadius > value)
    }

    return (
        <div className={cn(css.pagination, paginationMeta.totalPages === 0 && css.hidden, className)}>
            <PaginationButton
                onClick={onChange}
                value={paginationMeta.page - 1}
                disabled={paginationMeta.page - 1 < 1}
                control={true}
            >
                <div className={css.iconWrapper}>
                    <div className={css.icon}
                        style={{
                            maskImage: `url("/svg/chevron-left.svg")`,
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            maskSize: 'contain'
                        }}
                    />
                </div>
            </PaginationButton>
            {
                Array.from({ length: paginationMeta.totalPages }, (_, i) => i + 1).map((value) =>
                    <PaginationButton
                        onClick={onChange}
                        value={value}
                        hidden={isHidden(value)}
                        current={value === paginationMeta.page}
                        key={crypto.randomUUID()}
                    >
                        {value}
                    </PaginationButton>
                )
            }
            <PaginationButton
                onClick={onChange}
                value={paginationMeta.page + 1}
                disabled={paginationMeta.page + 1 > paginationMeta.totalPages}
                control={true}
            >
                <div className={css.iconWrapper}>
                    <div className={css.icon}
                        style={{
                            maskImage: `url("/svg/chevron-right.svg")`,
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            maskSize: 'contain'
                        }}
                    />
                </div>
            </PaginationButton>
        </div>
    )
}

type PaginationButtonProps = {
    onClick?: (value: number) => void
    children: ReactNode
    value: number
    current?: boolean
    hidden?: boolean
    disabled?: boolean
    control?: boolean
}

const PaginationButton = ({
    onClick,
    children,
    value,
    current,
    hidden,
    disabled,
    control,
}: PaginationButtonProps) => {

    return (
        <div className={cn(css.buttonWrapper, hidden && css.hidden)}>
            <button
                className={cn(
                    css.button,
                    current && css.current,
                    control && css.control
                )}
                disabled={disabled}
                onClick={() => {
                    onClick?.(value)
                }}
            >
                {children}
            </button>
        </div>
    )
}