import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { ReactFitty } from "react-fitty"

import cn from 'classnames'

import css from './CardAddToCart.module.css'

import { apiProduct } from 'shared/api'
import { Button, RadioGroup } from 'shared/ui'
import { typesForms } from 'shared/types'

import { ProductDto } from 'entities'
import { Option } from 'entities/database/Option'

const { AddProductToCart } = apiProduct
type AddToCartForm = typesForms.AddToCartForm
const { AddToCartRuleSet } = typesForms

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
        getValues,
        formState: { errors },
    } = useForm<AddToCartForm>({
        defaultValues: {
            productId: dto.productId,
            optionId: dto.optionList.length === 1 ? dto.optionList[0].id : undefined,
            amount: 1,
        }
    })

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name === "optionId" && type === 'change') {
                const price = value.optionId
                    ? `${dto.optionList.find(o => o.id === getValues("optionId"))?.price.toFixed(2)}`
                    : dto.priceSpread
                setOptionPrice(price)
            }
        })
        return () => subscription.unsubscribe()
    }, [watch])

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
                rules={{ required: true }}
                render={({ field: { value, name } }) => <input type={'hidden'} name={name} defaultValue={value} />}
            />

            <Controller
                control={control}
                name="amount"
                rules={{ required: true }}
                render={({ field: { value, name } }) => <input type={'hidden'} name={name} defaultValue={value} />}
            />

            <div className={css.controlWrapper}>
                <div className={css.nameAndVolume}>
                    <div className={css.name}>
                        <ReactFitty minSize={12} maxSize={22}>
                            {dto.productName}
                        </ReactFitty>
                    </div>

                    <Controller
                        control={control}
                        name="optionId"
                        rules={{
                            validate: { isRequired: AddToCartRuleSet.OptionIdIsRequired }
                        }}
                        render={
                            ({ field: { onChange, name, value } }) => {
                                const onlyOption = dto.optionList.length === 1
                                const options = dto.optionList.map(
                                    (option: Option) => ({ 'value': `${option.id}`, 'title': option.name })
                                )
                                return (
                                    <RadioGroup
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