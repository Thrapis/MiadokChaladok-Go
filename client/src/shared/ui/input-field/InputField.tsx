import cn from 'classnames'

import css from './InputField.module.css'

export type Props = {
    className?: string
    onChange?: (entered: string) => void
    type?: 'text' | 'password' | 'search' | 'tel' | 'email' | 'number'
    name?: string
    value?: string
    placeholder?: string
    maxLength?: number
    min?: number
    max?: number
    step?: number
    errorMessage?: string;
}

export const InputField = ({
    className,
    onChange,
    type = 'text',
    name,
    value,
    placeholder,
    maxLength,
    min,
    max,
    step,
    errorMessage
}: Props) => {

    const hasError = errorMessage != undefined;

    return(
        <div className={cn(
                hasError && css.incorrect, 
                className
            )}
        >
            <input
                className={cn(
                    css.inputField, 
                )}
                onChange={(e) => onChange?.(e.target.value)}
                type={type} 
                name={name}
                value={value}
                placeholder={placeholder} 
                maxLength={maxLength}
                min={min}
                max={max}
                step={step}
            />
            { hasError && (<div className={css.annotation}>{errorMessage}</div>)}
        </div>
    )
}

