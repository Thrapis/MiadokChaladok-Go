import cn from 'classnames'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import axios from 'axios';

import css from './CatalogFilter.module.css';

import { Button, Icon, Checkable, InputField, CheckboxGroup } from 'shared/ui';
import { ResponseData } from 'shared/model';

import { Category, Taste, ShipmentMethod } from 'entities';

import { FilterInputs } from '../model';

type Props = {
    setVisibility: Dispatch<SetStateAction<boolean>>
    className?: string
    control: Control<FilterInputs>
}

export const FilterPanel = ({
    setVisibility,
    className,
    control,
}: Props) => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [tastes, setTastes] = useState<Taste[] | null>(null);
    const [shipmentMethods, setShipmentMethods] = useState<ShipmentMethod[] | null>(null);

    async function fetchFilterLists() {
        type FilterLists = {
            categories: Category[]
            tastes: Taste[]
            shipmentMethods: ShipmentMethod[]
        }

        const url = `${process.env.REACT_APP_API_SOURCE}/filter/lists`
        const response = await axios.get<ResponseData>(url)
        const lists = response.data.Data as FilterLists
        
        setCategories(lists.categories)
        setTastes(lists.tastes)
        setShipmentMethods(lists.shipmentMethods)
        setLoading(false)
    }

    useEffect(() => {
        fetchFilterLists()
    }, [])

    return (
        <div className={cn(css.filterPanel, className)}>
            {
                loading ? (
                    <Icon type='loading-animated' size='xxlarge' />
                ) : (
                    <div className={css.panelFields}>
                        <div className={css.controlPanelColumn}>
                            <h3 className={css.paramterTitle}>Катэгорыі</h3>
                            <div className={css.checkList}>
                                <Checkable
                                    type='checkbox'
                                    size='small'
                                    labelText='Усе'
                                    labelClassName={css.checkLabel}
                                />
                                <Controller
                                    control={control}
                                    name="categoryIds"
                                    render={
                                        ({ field: { onChange, name, value } }) => {
                                            const options = categories?.map(
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
                                <Checkable
                                    type='checkbox'
                                    size='small'
                                    labelText='Усе'
                                    labelClassName={css.checkLabel}
                                />
                                <Controller
                                    control={control}
                                    name="tasteIds"
                                    render={
                                        ({ field: { onChange, name, value } }) => {
                                            const options = tastes?.map(
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
                                    render={({ field: { onChange } }) => (
                                        <InputField
                                            type='number'
                                            placeholder='ад'
                                            className={css.rangeFieldFrom}
                                            min={0}
                                            onChange={(newValue) => onChange(parseInt(newValue))}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="priceTo"
                                    render={({ field: { onChange } }) => (
                                        <InputField
                                            type='number'
                                            placeholder='да'
                                            className={css.rangeFieldFrom}
                                            min={0}
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
                                    render={({ field: { onChange } }) => (
                                        <InputField
                                            type='number'
                                            placeholder='ад'
                                            className={css.rangeFieldFrom}
                                            min={0}
                                            onChange={(newValue) => onChange(parseInt(newValue))}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="volumeTo"
                                    render={({ field: { onChange } }) => (
                                        <InputField
                                            type='number'
                                            placeholder='да'
                                            className={css.rangeFieldFrom}
                                            min={0}
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
                                            const options = shipmentMethods?.map(
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
                                <Icon type='x' size='medium' />
                            </Button>
                        </div>
                    </div>
                )
            }

            <div className={css.panelButtons}>
                <Button type='button' theme='outlined' size='large' shape='round'>
                    Ачысціць
                </Button>
                <Button type='submit' size='large' shape='round'>
                    Прымяніць
                </Button>
            </div>
        </div>
    )
}