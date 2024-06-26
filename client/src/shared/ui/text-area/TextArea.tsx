import cn from 'classnames';

import css from './TextArea.module.css'

export type Props = {
    className?: string
    onChange?: (entered: string) => void
    name?: string
    value?: string
    rows?: number
    cols?: number
    maxLength?: number
    resize?: 'both' | 'vertical' | 'horizontal' | 'fixed'
    placeholder?: string
}

export const TextArea = ({
    className,
    onChange,
    name,
    value,
    rows,
    cols,
    maxLength,
    resize = 'both',
    placeholder
}: Props) => {
    return (
        <textarea
            className={cn(
                css.textArea,
                css[`${resize}Resize`],
                className
            )}
            onChange={(e) => onChange?.(e.target.value)}
            name={name}
            value={value}
            rows={rows}
            cols={cols}
            maxLength={maxLength}
            placeholder={placeholder}
        >
        </textarea>
    )
}