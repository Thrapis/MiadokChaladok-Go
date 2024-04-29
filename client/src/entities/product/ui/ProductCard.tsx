import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

import { Button, Checkable, TextField } from "shared/ui";

import { ProductDto, Api } from 'entities/product/';

import css from './ProductCard.module.css';

type Inputs = {
    productId: number
    optionId: number
}

export type Props = {
    dto: ProductDto
}

export const ProductCard = ({
    dto
}: Props) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        let body = JSON.stringify(data)
        // console.log(body)
        Api.post('http://127.0.0.1:8080/to-cart/product/', body)
    }

    return (
        <form
            className={css.productCard}
            onSubmit={handleSubmit(onSubmit)}
        >
            <input type={'hidden'} {...register("productId")} defaultValue={`${dto.productId}`} />
            <img className={css.productImage}
                src={`http://127.0.0.1:8080${dto.imagePath}`}
                title={dto.productName} 
                alt={dto.productName}
            />
            <div className={css.productControl}>
                <div className={css.productNameAndVolume}>
                    <div className={''}>
                        {dto.productName}
                    </div>
                    <div className={css.productVolumeList}>
                        {
                            dto.optionList?.map((option) => {
                                let onlyOption = dto.optionList.length === 1
                                return (<Checkable 
                                    type='radio'
                                    theme='button'
                                    labelClassName={onlyOption ? css.productVolumeOnlyOption : css.productVolumeOption}
                                    defaultChecked={onlyOption}
                                    key={crypto.randomUUID()}
                                    labelText={option.name}
                                    register={{ ...register("optionId", { required: "Option is required" }) }}
                                    defaultValue={`${option.id}`}
                                />)
                            })
                        }
                    </div>
                </div>
                <div className={css.productPriceAndCartButton}>
                    <div className={css.productPrice}>
                        {dto.priceSpread} р.
                    </div>
                    <Button
                        type='submit'
                        shape='round'
                        size='small'
                        className={css.productCartButton}
                    >
                        у кошык
                    </Button>
                </div>
            </div>

            {/* <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                Email
                <TextField
                    type='email'
                    register={{ ...register("email", { required: "Email Address is required" }) }}
                    errorMessage={errors["email"]?.message}
                />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                Password
                <TextField
                    type='password'
                    register={{ ...register("password", { required: "Password is required" }) }}
                    errorMessage={errors["password"]?.message}
                />
            </label>

            <Button type='submit'>Submit</Button> */}
        </form>

    )
}