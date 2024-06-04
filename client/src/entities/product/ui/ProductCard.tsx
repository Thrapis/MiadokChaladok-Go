import cn from 'classnames';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { Button, RadioGroup } from "shared/ui";

import { ProductDto } from 'entities/product/';

import css from './ProductCard.module.css';
import { SOURCES } from 'shared/config/sources';
import axios from 'axios';
import { Option } from 'entities/Option';

type Inputs = {
    productId: number
    optionId: number
}

export type Props = {
    className?: string
    dto: ProductDto
}

export const isRequired = (value: number) => {
    return value ? true : 'This is a required input, can not escape';
}

export const ruleSet = {
    isRequired
}

export const ProductCard = ({
    className,
    dto
}: Props) => {
    // const [selectedId, setSelectedId] = useState<number>()

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
        getValues
    } = useForm<Inputs>()

    useEffect(() => {
        watch((value, { name, type }) => {
            // console.log(value.optionId, name, type)
            if (name === "optionId" && type === 'change') {
                // setSelectedId(value.optionId)
            }
        })
    }, [watch])

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        // console.log(data)
        let body = JSON.stringify(data)
        axios.post(`${SOURCES.API}/to-cart/product/`, body)
    }

    return (
        <form
            className={cn(css.card, className)}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Controller
                control={control}
                name="productId"
                rules={{
                    required: true,
                }}
                defaultValue={dto.productId}
                render={(fields) => <input type={'hidden'} defaultValue={fields.field.value} />}
            />

            <img className={css.image}
                src={`${SOURCES.IMAGES}${dto.imagePath}`}
                title={dto.productName}
                alt={dto.productName}
            />
            <div className={css.control}>
                <div className={css.nameAndVolume}>
                    <div className={css.name}>
                        {dto.productName}
                    </div>
                    <Controller
                        control={control}
                        name="optionId"
                        defaultValue={dto.optionList.length === 1 ? dto.optionList[0].id : undefined}
                        rules={{
                            validate: {isRequired: ruleSet.isRequired}
                        }}
                        render={
                            ({ field: { onChange, name, value } }) => {
                                const onlyOption = dto.optionList.length === 1
                                const options = dto.optionList.map(
                                    (option: Option) => ({ 'value': `${option.id}`, 'title': option.name })
                                )
                                return (
                                    <RadioGroup
                                        type='radio'
                                        size='small'
                                        theme='button'
                                        selected={`${value}`}
                                        name={name}
                                        options={options}
                                        onChange={newValue => onChange(parseInt(newValue))}
                                        className={css.volumeList}
                                        optionClassName={onlyOption ? css.volumeOnlyOption : css.volumeOption}
                                    />
                                )
                            }
                        }
                    />
                </div>
                <div className={css.priceAndCartButton}>
                    <div className={css.price}>
                        {
                            getValues().optionId ?
                                dto.optionList.find(o => o.id === getValues().optionId)?.price.toFixed(2)
                                :
                                dto.priceSpread
                        } р.
                    </div>
                    <Button
                        type='submit'
                        shape='round'
                        size='small'
                        className={css.cartButton}
                    >
                        у кошык
                    </Button>
                </div>
            </div>
            <div>{errors.optionId?.message}</div>
        </form>
    )
}