import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import cn from 'classnames'

import css from './ModalAddReview.module.css'

import { Button, Icon, InputField, StarRating, TextArea } from 'shared/ui'
import { apiReview } from 'shared/api'
import { typesForms, typesApi } from 'shared/types'

const { AddReview, ADD_REVIEW_ERROR_MESSAGES } = apiReview
const { AddReviewRuleSet } = typesForms
type AddReviewForm = typesForms.AddReviewForm
type FormMeta = typesApi.FormMeta

type Props = {
    onSubmit?: () => void
    onSubmitSuccess?: () => void
    onSubmitFailure?: () => void
    productId: number
}

export const ModalAddReview = ({
    onSubmit,
    onSubmitSuccess,
    onSubmitFailure,
    productId
}: Props) => {
    const [inFormProcess, setInFormProcess] = useState<boolean>(false)
    const [isProcessSuccess, setIsProcessSuccess] = useState<boolean>()
    const [failureMessage, setFailureMessage] = useState<string>()

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm<AddReviewForm>({
        defaultValues: {
            productId: productId,
            authorName: "",
            paymentNumber: "",
            buyDate: "",
            comment: "",
        }
    })

    const onAddReviewSubmit: SubmitHandler<AddReviewForm> = async (form) => {
        onSubmit?.()
        setInFormProcess(true)

        const response = await AddReview(form)
        const data = response.data
        console.log(data)

        if (data.Status === 200) {
            setIsProcessSuccess(true)
            reset()

            setTimeout(() => {
                onSubmitSuccess?.()
                setTimeout(() => {
                    setInFormProcess(false)
                }, 300)
            }, 1000)
        } else {
            setIsProcessSuccess(false)

            const meta = data.Meta as FormMeta
            setFailureMessage(ADD_REVIEW_ERROR_MESSAGES.get(meta.ErrorCode))
            onSubmitFailure?.()
        }
    }

    return (
        <div className={css.modal}>
            <div className={cn(inFormProcess ? css.process : css.hidden)}>
                <Icon
                    className={cn(
                        isProcessSuccess !== undefined && css.hidden
                    )}
                    type='loading-animated'
                    size='xxlarge'
                />

                <div className={cn(isProcessSuccess === undefined ? css.hidden : css.resultBlock)}>
                    <div 
                        className={cn(
                            isProcessSuccess === undefined && css.hidden,
                            isProcessSuccess ? css.iconCircleCorrect : css.iconCircleIncorrect
                        )}
                    >
                        <Icon
                            type={isProcessSuccess ? 'check' : 'x'}
                            size='xlarge'
                            iconClassName={cn(isProcessSuccess ? css.iconSuccess : css.iconFailure)}
                        />
                    </div>
                    <div className={cn(isProcessSuccess ? css.hidden : css.failureMessageBlock)}>
                        <span className={css.failureMessage}>
                            {failureMessage}
                        </span>
                        <Button
                            theme='contained'
                            size='large'
                            shape='round'
                            onClick={() => setInFormProcess(false)}
                        >
                            Паспрабаваць зноў
                        </Button>
                    </div>
                </div>
            </div>

            <form
                className={cn(
                    inFormProcess ? css.hidden : css.form
                )}
                onSubmit={handleSubmit(onAddReviewSubmit)}
            >
                <ul className={css.errorsBlock}>
                    {errors.productId && <li>{errors.productId.message}</li>}
                    {errors.authorName && <li>{errors.authorName.message}</li>}
                    {errors.paymentNumber && <li>{errors.paymentNumber.message}</li>}
                    {errors.raiting && <li>{errors.raiting.message}</li>}
                    {errors.buyDate && <li>{errors.buyDate.message}</li>}
                    {errors.comment && <li>{errors.comment.message}</li>}
                </ul>
                <Controller
                    control={control}
                    name='productId'
                    rules={{
                        validate: {
                            isRequired: AddReviewRuleSet.ProductIdIsRequired
                        }
                    }}
                    render={({ field: { name, value } }) => (
                        <input type='hidden' name={name} value={value} />
                    )}
                />
                <div className={css.inputsGrid}>
                    <label className={css.labeledInput}>
                        <h4 className={css.label}>Ваша імя:</h4>
                        <Controller
                            control={control}
                            name='authorName'
                            rules={{
                                validate: {
                                    isRequired: AddReviewRuleSet.AuthorNameIsRequired
                                }
                            }}
                            render={({ field: { name, value, onChange } }) => (
                                <InputField
                                    className={cn(
                                        css.input,
                                        errors.authorName && css.inputInvalid
                                    )}
                                    type='text'
                                    name={name}
                                    value={value}
                                    onChange={newValue => onChange(newValue)}
                                />
                            )}
                        />
                    </label>
                    <label className={css.labeledInput}>
                        <h4 className={css.label}>Нумар чэка:</h4>
                        <Controller
                            control={control}
                            name='paymentNumber'
                            rules={{
                                validate: {
                                    isRequired: AddReviewRuleSet.PaymentNumberIsRequired
                                }
                            }}
                            render={({ field: { name, value, onChange } }) => (
                                <InputField
                                    className={cn(
                                        css.input,
                                        errors.paymentNumber && css.inputInvalid
                                    )}
                                    type='text'
                                    name={name}
                                    value={value}
                                    onChange={newValue => onChange(newValue)}
                                    placeholder='_ _ _ _ _ . _ _ . _ _'
                                />
                            )}
                        />
                    </label>
                    <label className={css.labeledInput}>
                        <h4 className={css.label}>Ваша ацэнка:</h4>
                        <Controller
                            control={control}
                            name='raiting'
                            rules={{
                                validate: {
                                    isRequired: AddReviewRuleSet.RaitingIsRequired,
                                    isInRange: AddReviewRuleSet.RaitingMinMax
                                }
                            }}
                            render={({ field: { name, value, onChange } }) => (
                                <StarRating
                                    className={cn(
                                        css.starRating,
                                        errors.raiting && css.inputInvalid
                                    )}
                                    stars={5}
                                    name={name}
                                    value={value}
                                    onChange={newValue => onChange(newValue)}
                                />
                            )}
                        />
                    </label>
                    <label className={css.labeledInput}>
                        <h4 className={css.label}>Дата куплі:</h4>
                        <Controller
                            control={control}
                            name='buyDate'
                            rules={{
                                validate: {
                                    isRequired: AddReviewRuleSet.BuyDateIsRequired
                                }
                            }}
                            render={({ field: { name, value, onChange } }) => (
                                <InputField
                                    className={cn(
                                        css.input,
                                        errors.buyDate && css.inputInvalid
                                    )}
                                    type='date'
                                    name={name}
                                    value={value}
                                    onChange={newValue => onChange(newValue)}
                                    placeholder='_ _ . _ _ . _ _ _ _'
                                />
                            )}
                        />
                    </label>
                </div>
                <div className={css.commentAndSubmit}>
                    <label className={css.labeledInput}>
                        <h4 className={css.label}>Ваш каментар:</h4>
                        <div className={css.textAreaWrapper}>
                            <Controller
                                control={control}
                                name='comment'
                                rules={{
                                    validate: {
                                        length: AddReviewRuleSet.CommentLength
                                    }
                                }}
                                render={({ field: { name, value, onChange } }) => (
                                    <TextArea
                                        className={cn(
                                            css.textArea,
                                            errors.comment && css.inputInvalid
                                        )}
                                        resize='fixed'
                                        name={name}
                                        value={value}
                                        maxLength={500}
                                        onChange={newValue => onChange(newValue)}
                                    />
                                )}
                            />
                            <span className={css.textAreaAnnotation}>даўжыня максімум 500 сімвалаў</span>
                        </div>
                    </label>
                    <Button
                        className={css.submit}
                        type='submit'
                    >
                        <Icon type='check' size='large' />
                    </Button>
                </div>
            </form>
        </div>
    )
}