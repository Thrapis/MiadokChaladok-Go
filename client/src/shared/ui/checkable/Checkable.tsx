import cn from 'classnames';

import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import css from './Checkable.module.css';

export type Props = {
    labelClassName?: string
    onChange?: () => void
    type: 'checkbox' | 'radio'
    theme?: 'default' | 'button'
    name?: string
    defaultValue?: string
    defaultChecked?: boolean
    labelText?: string
    register?: UseFormRegisterReturn
    errorMessage?: string
}

export const Checkable = ({
    labelClassName,
    onChange, 
    type, 
    name,
    theme = 'default',
    defaultValue,
    defaultChecked = false, 
    labelText,
    register,
    errorMessage
}: Props) => {
    return(
        <label className={cn(css.wrapper, css[`${theme}Theme`])}>
            <input
                className={cn(css.input)}
                onChange={onChange}
                type={type}
                name={name}
                defaultValue={defaultValue}
                defaultChecked={defaultChecked}
                {...register}
            />
            <span className={css.checkmark}></span>
            <span className={cn(css.label, labelClassName)}>
                {labelText}
            </span>
        </label>
    )
}