import cn from 'classnames'

import css from './Icon.module.css'

export type IconType =
  | 'cart'
  | 'check'
  | 'magniglass'
  | 'x'
  | 'star-empty'
  | 'star-full'
  | 'chevron-down'
  | 'instagram'
  | 'pinterest'
  | 'telegram'
  | 'twitter'

export type Props = {
    className?: string
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
    type: IconType
}

export const Icon = (props: Props) => {
    return(
        <div
            className={cn(
                css.root,
                props.className
            )}
            onClick={props.onClick}
        >
            <div
                className={css.icon}
                style={{ backgroundImage: `url("/svg/${props.type}.svg")` }}
            />
        </div>
    )
} 