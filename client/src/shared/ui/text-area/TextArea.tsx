import cn from 'classnames';

import css from './TextArea.module.css'

export type Props = {
    className?: string
    onChange?: () => void
    name?: string
    rows?: number
    cols?: number
    maxLength?: number
    resize?: 'both' | 'vertical' | 'horizontal' | 'fixed'
    placeholder?: string
    annotation?: string
}

export const TextArea = (props: Props) => {
    const resize = props.resize ? props.resize : 'both'
    return(
        <div 
            className={cn(
                css.wrapper,
                props.className
            )}
        >
            <textarea 
                className={cn(
                    css.textArea,
                    css[`${resize}Resize`]
                )}
                onChange={props.onChange}
                name={props.name}
                rows={props.rows}
                cols={props.cols}
                maxLength={props.maxLength}
                placeholder={props.placeholder}
            >
            </textarea>
            <div className={css.annotation}>
                {props.annotation}
            </div>
        </div>
    )
}