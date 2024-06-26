import cn from 'classnames'
import { MouseEventHandler, useEffect, useState } from 'react'

import css from './NumericUpDown.module.css'

type Props = {
    onChange?: (value: number) => void
    className?: string
    name?: string
    value: number
    min?: number
    max?: number
    step?: number
}

const CTRL_MULTI = 5

export const NumericUpDown = ({
    onChange,
    className,
    name,
    value,
    min = 0,
    max = 65535,
    step = 1
}: Props) => {
    const [currentValue, setCurrentValue] = useState<number>(value)

    useEffect(() => {
        setCurrentValue(value)
    }, [value])

    const onPlusClick: MouseEventHandler = (event) => {
        if (currentValue === max) {
            return
        }

        let multi = 1

        if (event.ctrlKey) {
            multi = CTRL_MULTI
        }
        currentValue + step * multi <= max ? onChange?.(currentValue + step * multi) : onChange?.(max)
    }

    const onMinusClick: MouseEventHandler = (event) => {
        if (currentValue === min) {
            return
        }

        let multi = 1
        
        if (event.ctrlKey) {
            multi = CTRL_MULTI
        }
        currentValue - step * multi >= min ? onChange?.(currentValue - step * multi) : onChange?.(min)
    }

    return(
        <div className={cn(css.wrapper, className)}>
            <input type='hidden' value={value} name={name} readOnly/>

            <button 
                type='button'
                className={css.button}
                onClick={onMinusClick}
            >
                <div className={css.icon} style={{ backgroundImage: `url("/svg/minus.svg")` }}></div>
            </button>

            <span className={css.indicator}>{currentValue}</span>

            <button 
                type='button'
                className={css.button} 
                onClick={onPlusClick}
            >
                <div className={css.icon} style={{ backgroundImage: `url("/svg/plus.svg")` }}></div>
            </button>
        </div>
    )
}