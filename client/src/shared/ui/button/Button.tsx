import cn from 'classnames';
import {ReactNode} from 'react';

import css from './Button.module.css';

type Props = {
    className?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    children: ReactNode
    type?: 'button' | 'submit' | 'reset'
    size?: 'small' | 'medium' | 'large'
    width?: 'height' | 'fluid'
    shape?: 'square' | 'round'
    theme?: 'contained' | 'outlined' | 'text'
    disabled?: boolean
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
    disabled = false
} : Props) => {
    return (
        <button 
            type={type}
            className={cn(
                css.button,
                css[`${size}Size`],
                css[`${width}Width`],
                css[`${shape}Shape`],
                css[`${theme}Theme`],
                className
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}   
        </button>
    );
};