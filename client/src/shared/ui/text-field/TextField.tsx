import cn from 'classnames'

import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import css from './TextField.module.css'

export type Props = {
    onChange?: () => void
    type?: 'text' | 'password' | 'search' | 'tel' | 'email'
    name?: string
    defaultValue?: string
    placeholder?: string
    maxLength?: number
    register?: UseFormRegisterReturn
    errorMessage?: string;
}

export const TextField = ({
    onChange,
    type = 'text',
    name,
    defaultValue = '',
    placeholder,
    maxLength,
    register,
    errorMessage
}: Props) => {

    const hasError = errorMessage != undefined;

    return(
        <div className={hasError ? css.incorrect : undefined}>
            <input
                className={cn(
                    css.textField, 
                )}
                onChange={onChange}
                type={type} 
                name={name}
                defaultValue={defaultValue}
                placeholder={placeholder} 
                maxLength={maxLength}
                {...register}
            />
            { hasError ? <div className={css.annotation}>{errorMessage}</div> : undefined }
        </div>
    )
}

