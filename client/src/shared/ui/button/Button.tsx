import cn from 'classnames';
import {ReactNode} from 'react';

import css from './Button.module.css';

type Props = {
    className?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    children: ReactNode
    type?: 'button' | 'submit' | 'reset' | 'link'
    size?: 'small' | 'medium' | 'large'
    width?: 'height' | 'fluid'
    shape?: 'square' | 'round'
    theme?: 'contained' | 'outlined' | 'text'
    disabled?: boolean
    href?: string
}

export const Button = ({
    className,
    onClick, 
    children,
    type = 'button', 
    size = 'medium', 
    width = 'fluid',
    shape = 'square',
    theme = 'contained', 
    disabled = false,
    href
} : Props) => {

    if (type == 'link') {
        return (
            <a
                className={cn(
                    css.button,
                    css[`${size}`], 
                    css[`${width}`], 
                    css[`${shape}`], 
                    css[`${theme}`],
                    className
                )}
                href={href}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button 
                type={type}
                className={cn(
                    css.button,
                    css[`${size}`], 
                    css[`${width}`], 
                    css[`${shape}`], 
                    css[`${theme}`],
                    className
                )}
                onClick={onClick}
                disabled={disabled}
            >
                {children}   
            </button>
        );
    }
};