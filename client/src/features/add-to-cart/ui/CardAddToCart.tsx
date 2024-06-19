import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller } from "react-hook-form"

import cn from 'classnames'

import css from './CardAddToCart.module.css'

import { apiProduct } from 'shared/api'
import { Button, RadioGroup } from 'shared/ui'
import { typesForms } from 'shared/types'

import { ProductDto } from 'entities'
import { Option } from 'entities/database/Option'

const { AddProductToCart } = apiProduct
type AddToCartForm = typesForms.AddToCartForm

export const isRequired = (value: number) => {
    return value ? true : 'Патрэбна абраць опцыю для дадання ў кошык';
}

export const ruleSet = {
    isRequired
}

type Props = {
    dto: ProductDto
}

export const CardAddToCart = ({
    dto
}: Props) => {
    const [optionPrice, setOptionPrice] = useState<string>(dto.priceSpread)

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
        getValues
    } = useForm<AddToCartForm>()

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name === "optionId" && type === 'change') {
                const price = value.optionId
                    ? `${dto.optionList.find(o => o.id === getValues("optionId"))?.price.toFixed(2)}`
                    : dto.priceSpread
    
                setOptionPrice(price)
            }
        })
        return subscription.unsubscribe()
    }, [watch, dto.optionList, dto.priceSpread])

    const onSubmit: SubmitHandler<AddToCartForm> = async (form) => {
        const response = await AddProductToCart(form)
        console.log(response.data)
    }

    return (
        <form
            className={cn(css.container)}
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

            <div className={css.controlWrapper}>
                <div className={css.nameAndVolume}>
                    <div className={css.name}>
                        {dto.productName}
                    </div>
                    <Controller
                        control={control}
                        name="optionId"
                        defaultValue={dto.optionList.length === 1 ? dto.optionList[0].id : undefined}
                        rules={{
                            validate: { isRequired: ruleSet.isRequired }
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
                    <div className={css.price}>{`${optionPrice} р.`}</div>
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

            <div className={css.formError}>
                {errors.optionId?.message}
            </div>
        </form>
    )
}