import cn from 'classnames'
import { Dispatch, SetStateAction } from 'react';
import { Control, Controller } from 'react-hook-form';

import css from './CatalogFilter.module.css';

import { Button, Icon, InputSelect } from 'shared/ui';

import { FilterInputs, SortList } from '../model';

type Props = {
    setVisibility: Dispatch<SetStateAction<boolean>>
    className?: string
    control: Control<FilterInputs>
}

export const SortPanel = ({
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
                        defaultValue={parseInt(SortList[0].value)}
                        render={({ field: { onChange, value } }) => (
                            <InputSelect 
                                options={SortList} 
                                selected={SortList.find(el => el.value === value?.toString()) || null}
                                size='medium' 
                                className={css.dropdown}
                                onChange={(newValue) => onChange(parseInt(newValue))}
                            />
                        )}
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
                        <Icon type='x' size='medium' />
                    </Button>
                </div>
            </div>

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