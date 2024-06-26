import { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller } from "react-hook-form"

import css from './BlockAddToCart.module.css'

import { apiProduct } from 'shared/api'
import { Button, RadioGroup, NumericUpDown } from 'shared/ui'
import { typesForms } from 'shared/types'

import { ProductDto, Option } from 'entities'

const { AddProductToCart } = apiProduct
type AddToCartForm = typesForms.AddToCartForm
const { AddToCartRuleSet } = typesForms

type Props = {
    dto: ProductDto
}

export const BlockAddToCart = ({
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
            optionId: undefined,
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
        <form className={css.control} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="productId"
                rules={{
                    required: true,
                }}
                render={(fields) => <input type={'hidden'} defaultValue={fields.field.value} />}
            />

            <h4>Аб'ём:</h4>
            <Controller
                control={control}
                name="optionId"
                rules={{
                    validate: { isRequired: AddToCartRuleSet.OptionIdIsRequired }
                }}
                render={
                    ({ field: { onChange, name, value } }) => {
                        // const onlyOption = dto.optionList.length === 1
                        const options = dto.optionList.map(
                            (option: Option) => ({
                                'value': `${option.id}`,
                                'title': `${option.name} (${option.price} р.)`
                            })
                        )
                        return (
                            <RadioGroup
                                className={css.radioGroup}
                                size='small'
                                name={name}
                                options={options}
                                selected={`${value}`}
                                onChange={newValue => onChange(parseInt(newValue))}
                            />
                        )
                    }

                }
            />

            <div className={css.formError}>{errors.optionId?.message}</div>

            <div className={css.addToCartSpace}>
                <div className={css.priceAndAmoutSpace}>
                    <span className={css.price}>{`${optionPrice} р.`}</span>
                    <Controller
                        control={control}
                        name="amount"
                        render={
                            ({ field: { onChange, name, value } }) => (
                                <NumericUpDown
                                    className={css.amountControl}
                                    name={name}
                                    value={value}
                                    min={1}
                                    max={99}
                                    step={1}
                                    onChange={newValue => onChange(newValue)}
                                />
                            )
                        }
                    />
                </div>
                <Button
                    type='submit'
                    size='large'
                    shape='round'
                    width='fluid'
                    className={css.submitButton}
                >
                    Дадаць у кошык
                </Button>
            </div>
        </form>
    )
}