import cn from 'classnames';

import css from './Checkable.module.css';

export type Props = {
    labelClassName?: string
    onChange?: (checked: boolean) => void
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
    type: 'checkbox' | 'radio'
    size?: 'small' | 'medium' | 'large'
    theme?: 'default' | 'button'
    name?: string
    value?: string
    checked?: boolean
    labelText?: string
    errorMessage?: string
}

export const Checkable = ({
    labelClassName,
    onChange, 
    onClick, 
    type,
    size = 'medium',
    theme = 'default',
    name,
    value,
    checked = false, 
    labelText
}: Props) => {
    return(
        <label className={cn(css.wrapper, css[`${theme}Theme`], css[`${size}Size`])}>
            <input
                className={cn(css.input)}
                onChange={(e) => {onChange?.(e.target.checked)}}
                onClick={onClick}
                type={type}
                name={name}
                value={value}
                checked={checked}
            />
            <span className={css.checkmark}></span>
            <span className={cn(css.label, labelClassName)}>
                {labelText}
            </span>
        </label>
    )
}