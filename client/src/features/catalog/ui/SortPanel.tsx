import cn from 'classnames'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { Control, Controller } from 'react-hook-form'

import css from './CatalogFilter.module.css'

import { Button, Icon, InputSelect } from 'shared/ui'

import { SortList } from '../model/SortList'
import { IFilterForm } from 'shared/api/catalog'

type Props = {
    resetToDefault: () => void
    setVisibility: Dispatch<SetStateAction<boolean>>
    className?: string
    control: Control<IFilterForm>
}

export const SortPanel = ({
    resetToDefault,
    setVisibility,
    control,
    className
}: Props) => {

    return (
        <div className={cn(css.sortPanel, className)}>
            <div className={css.panelFields}>
                <div className={css.controlPanelColumn}>
                    <h3 className={css.paramterTitle}>Спачатку</h3>
                    <Controller
                        control={control}
                        name="sortType"
                        render={({ field: { onChange, value } }) => {
                            const selected = SortList.find(el => el.value === `${value}`) || null
                            return (
                                <InputSelect
                                    options={SortList}
                                    selected={selected}
                                    size='medium'
                                    className={css.dropdown}
                                    onChange={(newValue) => onChange(parseInt(newValue))}
                                />
                            )
                        }}
                    />
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