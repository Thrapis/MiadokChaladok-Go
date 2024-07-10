import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import cn from 'classnames'

import css from './CatalogFilter.module.css'

import { Button, Icon, Checkable, InputField, CheckboxGroup } from 'shared/ui'
import { CatalogFilterDto, Category, Taste, ShipmentMethod } from 'entities'
import { typesForms } from 'shared/types'

type FilterForm = typesForms.FilterForm

type Props = {
    resetToDefault: () => void
    setVisibility: Dispatch<SetStateAction<boolean>>
    className?: string
    control: Control<FilterForm>

    catalogFilters: CatalogFilterDto | undefined
}

export const FilterPanel = ({
    resetToDefault,
    setVisibility,
    className,
    control,
    catalogFilters,
}: Props) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (catalogFilters) {
            setLoading(false)
        }
    }, [catalogFilters])

    return (
        <div className={cn(css.filterPanel, className)}>
            {
                loading ? (
                    <Icon type='loading-animated' size='xxl' />
                ) : (
                    <div className={css.panelFields}>
                        <div className={css.controlPanelColumn}>
                            <h3 className={css.paramterTitle}>Катэгорыі</h3>
                            <div className={css.checkList}>
                                <Controller
                                    control={control}
                                    name="categoryIds"
                                    render={
                                        ({ field: { onChange, name, value } }) => {
                                            const options = catalogFilters?.categories?.map(
                                                (category: Category) => ({ 'value': `${category.id}`, 'title': category.name })
                                            ) || []
                                            return (
                                                <CheckboxGroup
                                                    size='small'
                                                    theme='default'
                                                    selected={value?.map(v => `${v}`) || []}
                                                    name={name}
                                                    options={options}
                                                    onChange={newValue => onChange(newValue.map(v => parseInt(v)))}
                                                    className={css.checkList}
                                                    optionClassName={css.checkLabel}
                                                    checkAllOption
                                                    checkAllTitle='Усе'
                                                />
                                            )
                                        }
                                    }
                                />
                            </div>
                        </div>
                        <div className={css.controlPanelColumn}>
                            <h3 className={css.paramterTitle}>Смакі</h3>
                            <div className={css.checkList}>
                                <Controller
                                    control={control}
                                    name="tasteIds"
                                    render={
                                        ({ field: { onChange, name, value } }) => {
                                            const options = catalogFilters?.tastes?.map(
                                                (taste: Taste) => ({ 'value': `${taste.id}`, 'title': taste.name })
                                            ) || []
                                            return (
                                                <CheckboxGroup
                                                    size='small'
                                                    theme='default'
                                                    selected={value?.map(v => `${v}`) || []}
                                                    name={name}
                                                    options={options}
                                                    onChange={newValue => onChange(newValue.map(v => parseInt(v)))}
                                                    className={css.checkList}
                                                    optionClassName={css.checkLabel}
                                                    checkAllOption
                                                    checkAllTitle='Усе'
                                                />
                                            )
                                        }
                                    }
                                />
                            </div>
                        </div>
                        <div className={css.controlPanelColumn}>
                            <h3 className={css.paramterTitle}>Кошт</h3>
                            <div className={css.rangeJoin}>
                                <Controller
                                    control={control}
                                    name="priceFrom"
                                    render={({ field: { value, onChange } }) => (
                                        <InputField
                                            type='number'
                                            placeholder='ад'
                                            className={css.rangeFieldFrom}
                                            min={0}
                                            value={`${value}`}
                                            onChange={(newValue) => onChange(parseInt(newValue))}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="priceTo"
                                    render={({ field: { value, onChange } }) => (
                                        <InputField
                                            type='number'
                                            placeholder='да'
                                            className={css.rangeFieldTo}
                                            min={0}
                                            value={`${value}`}
                                            onChange={(newValue) => onChange(parseInt(newValue))}
                                        />
                                    )}
                                />
                            </div>
                            <h3 className={css.paramterTitle}>Аб'ём</h3>
                            <div className={css.rangeJoin}>
                                <Controller
                                    control={control}
                                    name="volumeFrom"
                                    render={({ field: { value, onChange } }) => (
                                        <InputField
                                            type='number'
                                            placeholder='ад'
                                            className={css.rangeFieldFrom}
                                            min={0}
                                            value={`${value}`}
                                            onChange={(newValue) => onChange(parseInt(newValue))}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="volumeTo"
                                    render={({ field: { value, onChange } }) => (
                                        <InputField
                                            type='number'
                                            placeholder='да'
                                            className={css.rangeFieldTo}
                                            min={0}
                                            value={`${value}`}
                                            onChange={(newValue) => onChange(parseInt(newValue))}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className={css.controlPanelColumn}>
                            <h3 className={css.paramterTitle}>Наяўнасць</h3>
                            <div className={css.checkList}>
                                <Controller
                                    control={control}
                                    name="inShop"
                                    render={({ field: { onChange, value } }) => (
                                        <Checkable
                                            type='checkbox'
                                            size='small'
                                            labelText='Ёсць у краме'
                                            labelClassName={css.checkLabel}
                                            onChange={onChange}
                                            checked={value}
                                            key={crypto.randomUUID()}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="inStock"
                                    render={({ field: { onChange, value } }) => (
                                        <Checkable
                                            type='checkbox'
                                            size='small'
                                            labelText='Ёсць на складзе'
                                            labelClassName={css.checkLabel}
                                            onChange={onChange}
                                            checked={value}
                                            key={crypto.randomUUID()}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className={css.controlPanelColumn}>
                            <h3 className={css.paramterTitle}>Дастаўка</h3>
                            <div className={css.checkList}>
                                <Controller
                                    control={control}
                                    name="shipmentMethodIds"
                                    render={
                                        ({ field: { onChange, name, value } }) => {
                                            const options = catalogFilters?.shipmentMethods?.map(
                                                (method: ShipmentMethod) => ({ 'value': `${method.id}`, 'title': method.name })
                                            ) || []
                                            return (
                                                <CheckboxGroup
                                                    size='small'
                                                    theme='default'
                                                    selected={value?.map(v => `${v}`) || []}
                                                    name={name}
                                                    options={options}
                                                    onChange={newValue => onChange(newValue.map(v => parseInt(v)))}
                                                    className={css.checkList}
                                                    optionClassName={css.checkLabel}
                                                />
                                            )
                                        }
                                    }
                                />
                            </div>
                        </div>
                        <div className={css.controlPanelColumn}>
                            <Button
                                theme='text'
                                size='medium'
                                width='height'
                                className={css.closeButton}
                                onClick={() => setVisibility(false)}
                            >
                                <Icon type='x' size='m' />
                            </Button>
                        </div>
                    </div>
                )
            }

            <div className={css.panelButtons}>
                <Button type='button' theme='outlined' size='large' shape='round' onClick={resetToDefault}>
                    Cкінуць 
                </Button>
                <Button type='submit' size='large' shape='round'>
                    Прымяніць
                </Button>
            </div>
        </div>
    )
}