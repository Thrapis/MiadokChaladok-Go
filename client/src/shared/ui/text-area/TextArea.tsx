import cn from 'classnames';

import css from './TextArea.module.css'

export type Props = {
    className?: string
    onChange?: (entered: string) => void
    name?: string
    rows?: number
    cols?: number
    maxLength?: number
    resize?: 'both' | 'vertical' | 'horizontal' | 'fixed'
    placeholder?: string
    annotation?: string
}

export const TextArea = ({
    className,
    onChange,
    name,
    rows,
    cols,
    maxLength,
    resize = 'both',
    placeholder,
    annotation
}: Props) => {
    return(
        <div 
            className={cn(
                css.wrapper,
                className
            )}
        >
            <textarea 
                className={cn(
                    css.textArea,
                    css[`${resize}Resize`]
                )}
                onChange={(e) => onChange?.(e.target.value)}
                name={name}
                rows={rows}
                cols={cols}
                maxLength={maxLength}
                placeholder={placeholder}
            >
            </textarea>
            <div className={css.annotation}>
                {annotation}
            </div>
        </div>
    )
}