import cn from 'classnames'

import css from './InputField.module.css'

export type Props = {
    className?: string
    onChange?: (entered: string) => void
    type?: 'text' | 'password' | 'search' | 'tel' | 'email' | 'number' | 'date'
    name?: string
    value?: string
    placeholder?: string
    maxLength?: number
    min?: number
    max?: number
    step?: number
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
}: Props) => {

    return (
        <input
            className={cn(
                css.inputField,
                className
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
    )
}

