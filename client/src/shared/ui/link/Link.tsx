import cn from 'classnames';
import { ReactNode } from 'react';
import { Link as ReactLink } from "react-router-dom";

import css from './Link.module.css';

type Props = {
    className?: string
    children: ReactNode
    href: string
    size?: 'small' | 'medium' | 'large' | 'fit'
    width?: 'height' | 'fluid'
    shape?: 'square' | 'round'
    theme?: 'contained' | 'outlined' | 'text'
}

export const Link = ({
    className,
    children,
    size = 'medium',
    width = 'fluid',
    shape = 'square',
    theme = 'text',
    href
}: Props) => {
    return (
        <ReactLink
            className={cn(
                css.link,
                css[`${size}Size`],
                css[`${width}Width`],
                css[`${shape}Shape`],
                css[`${theme}Theme`],
                className
            )}
            to={href}
        >
            {children}
        </ReactLink>
    )
};