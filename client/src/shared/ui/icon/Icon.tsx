import cn from 'classnames'

import css from './Icon.module.css'

export type IconType =
    | 'cart'
    | 'check'
    | 'filter'
    | 'sort'
    | 'magniglass'
    | 'x'
    | 'star-empty'
    | 'star-full'
    | 'chevron-up'
    | 'chevron-right'
    | 'chevron-down'
    | 'chevron-left'
    | 'instagram'
    | 'pinterest'
    | 'telegram'
    | 'twitter'
    | 'loading-animated'
    | 'tent-colored'
    | 'box-colored'
    | 'truck-colored'

export type Props = {
    className?: string
    iconClassName?: string
    type: IconType
    renderType?: 'image' | 'mask'
    size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'
    orientation?: 'inline' | 'block'
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export const Icon = ({
    className,
    iconClassName,
    type,
    renderType = 'image',
    size = 'm',
    orientation = 'block',
    onClick
}: Props) => {

    let selectedStyles = {}

    switch (renderType) {
        case 'image':
            selectedStyles = { backgroundImage: `url("/svg/${type}.svg")` }
            break
        case 'mask':
            selectedStyles = { maskImage: `url("/svg/${type}.svg")` }
            break
    }

    return (
        <i
            className={cn(
                css.root, 
                css[`${orientation}Orientation`], 
                className
            )}
            onClick={onClick}
        >
            <div
                className={cn(
                    css.icon, 
                    css[`${size}Size`], 
                    css[`${renderType}Render`], 
                    iconClassName
                )}
                style={selectedStyles}
            />
        </i>
    )
} 