import cn from 'classnames'

import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { UseFormRegisterReturn } from 'react-hook-form';

import css from './InputSelect.module.css'

type Option = { title: string; value: string };

export type SelectProps = {
    className?: string
    name?: string
    size?: 'small' | 'medium' | 'large'

    onChange?: (selected: Option['value']) => void
    onClose?: () => void
    options: Option[]
    selected: Option | null
    placeholder?: string
    mode?: 'rows' | 'cells'
    status?: 'default' | 'invalid'
}

export const InputSelect = ({
    className,
    name,
    size = 'small',
    onChange,
    onClose,
    options,
    selected,
    placeholder = "Абярыце опцыю",
    mode = 'rows',
    status = 'default',
}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(selected?.value)
    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setSelectedValue(selected?.value)
    }, [selected])

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const { target } = event;
            if (target instanceof Node && !rootRef.current?.contains(target)) {
                isOpen && onClose?.()
                setIsOpen(false)
            }
        };

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, [isOpen])

    const handleOptionClick = (value: Option['value']) => {
        setIsOpen(false)
        setSelectedValue(value)
        onChange?.(value)
    }

    const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
        setIsOpen((prev) => !prev)
    }

    return (
        <div
            className={cn(
                css.dropdown,
                className,
                isOpen && css.active
            )}
            ref={rootRef}
        >
            <div
                className={cn(
                    css.dropdownButton,
                    css[`${size}`]
                )}
                onClick={handlePlaceHolderClick}
                role="button"
                tabIndex={0}
            >
                <span className={css.selectedText}>
                    {options.find(o => o.value === selectedValue)?.title || placeholder}
                </span>
                <div className={css.icon} style={{ backgroundImage: `url("/svg/chevron-down.svg")` }}></div>
            </div>

            {isOpen && (
                <ul className={css.dropdownContent}>
                    {
                        options.map((option) => (
                            <OptionElement
                                key={crypto.randomUUID()}
                                size={size}
                                option={option}
                                onClick={handleOptionClick}
                            />
                        ))
                    }
                </ul>
            )}
        </div>
    )
}

type OptionProps = {
    option: Option;
    size?: 'small' | 'medium' | 'large'
    onClick: (value: Option['value']) => void;
}

const OptionElement = ({
    option: { value, title },
    size = 'small',
    onClick
}: OptionProps) => {

    const handleClick = (clickedValue: Option['value']): MouseEventHandler<HTMLLIElement> =>
        () => {
            onClick(clickedValue);
        };

    return (
        <li
            className={cn(
                css.dropdownOption,
                css[`${size}`]
            )}
            value={value}
            onClick={handleClick(value)}
            tabIndex={0}
        >
            {title}
        </li>
    )
}