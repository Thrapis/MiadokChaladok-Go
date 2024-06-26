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
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
    orientation?: 'inline' | 'block'
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export const Icon = ({
    className,
    iconClassName,
    type,
    size = 'medium',
    orientation = 'block',
    onClick
}: Props) => {
    return(
        <div
            className={cn(css.root, css[`${orientation}Orientation`], className)}
            onClick={onClick}
        >
            <div
                className={cn(css.icon, css[`${size}Size`], iconClassName)}
                style={{ 
                    maskImage: `url("/svg/${type}.svg")`,
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    maskSize: 'contain'
                }}
            />
        </div>
    )
} 