import cn from 'classnames'

import React, { useState } from "react";

import css from './Dropdown.module.css'

type Option = {
    id: number
} | null

export type Props = {
    optionList: Option[]
    className?: string
    onChange?: () => void
    name?: string
    size?: 'small' | 'medium' | 'large'
    placeholder?: string
    // multiple?: boolean
    defaultValue?: Option
}

//'Абярыце опцыю (ці некалькі)' : 'Абярыце опцыю'

export const Dropdown = ({
    optionList,
    className,
    onChange,
    name,
    size = 'small',
    placeholder = "Абярыце опцыю",
    defaultValue = null,
}: Props) => {
    const [isActive, setIsActive] = useState(false);
    const [selectedValue, setSelectedValue] = useState<Option>(defaultValue);

    const activateDropdown = (event: React.MouseEvent) => {
        event.preventDefault();
        setIsActive(!isActive);
    }
    
    const onOptionSelect = (option: Option) => {
        if (option !== selectedValue) {
            setSelectedValue(option);
            if (onChange != undefined) {
                onChange();
            }
        }
        setIsActive(!isActive); 
    }

    return(
        <div 
            className={cn(
                css.dropdown,
                className,
                isActive && css.active
            )}
        >
            <select 
                className={css.select} 
                name={name} 
                value={selectedValue?.id}
            >
                <option value=""></option>
                {
                    optionList.map((option, index) => (
                        <option key={index} value={option?.id}></option>
                    ))
                }
            </select>

            <div 
                className={cn(
                    css.dropdownButton,
                    css[`${size}`]
                )} 
                onClick={activateDropdown}
            >
                <span className={css.selectedText}>
                    {selectedValue ? selectedValue.toString() : placeholder}
                </span>
                <div className={css.icon} style={{ backgroundImage: `url("/svg/chevron-down.svg")` }} ></div>
            </div>

            <div className={css.dropdownContent}>
                {
                    optionList.map((option, index) => (
                        <div 
                            className={cn(
                                css.dropdownOption,
                                css[`${size}`]
                            )} 
                            key={index} 
                            onClick={() => onOptionSelect(option)}
                        >
                            {option?.toString()}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}