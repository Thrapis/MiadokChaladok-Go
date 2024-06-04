import cn from 'classnames'
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from 'axios';

import css from './CatalogFilter.module.css';

import { Button, Icon} from 'shared/ui';
import { FilterPanel } from './FilterPanel';
import { SortPanel } from './SortPanel';
import { FilterInputs } from '../model';
import { SOURCES } from 'shared/config';

export const CatalogFilter = () => {
    const [isFilterPanelVisible, setFilterPanelVisible] = useState(false);
    const [isSortPanelVisible, setSortPanelVisible] = useState(false);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FilterInputs>()

    // useEffect(() => {
    //     watch((value, { name, type }) => {
    //         // console.log(value, name, type)
    //         if (name == "categoryIds" && type == 'change') {
    //             // setCategoryIds(value.categoryIds)
    //         }
    //     })
    // }, [watch])

    const onFilterFormSubmit: SubmitHandler<FilterInputs> = (data) => {
        console.log(data)
        let body = JSON.stringify(data)
        axios.post(`${SOURCES.API}/catalog/filter/`, body)
    }

    return (
        <form 
            className={css.container}
            onSubmit={handleSubmit(onFilterFormSubmit)}        
        >
            <div className={css.controls}>
                <Button 
                    type='button' 
                    shape='round' 
                    size='large' 
                    className={css.controlButton}
                    onClick={() => {
                        setFilterPanelVisible(prev => !prev)
                        setSortPanelVisible(false)
                    }}
                >
                    <Icon type='filter'></Icon>
                    <span>Фільтрацыя</span>
                </Button>

                <div className={css.productTypeContainer}>
                    <Button type='button' shape='round' size='large' theme='outlined' className={css.controlButton}>
                        Класічны
                    </Button>
                    <Button type='button' shape='round' size='large' theme='outlined' className={css.controlButton}>
                        У сотах
                    </Button>
                    <Button type='button' shape='round' size='large' theme='outlined' className={css.controlButton}>
                        Іншыя прадукты
                    </Button>
                    <Button type='button' shape='round' size='large' theme='outlined' className={css.controlButton}>
                        Падарункавыя наборы
                    </Button>
                </div>

                <Button 
                    type='button' 
                    shape='round' 
                    size='large' 
                    className={css.controlButton}
                    onClick={() => {
                        setSortPanelVisible(prev => !prev)
                        setFilterPanelVisible(false)
                    }}  
                >
                    <span>Сартыроўка</span>
                    <Icon type='sort'></Icon>
                </Button>
            </div>

            <div className={cn(
                css.controlPanels,
                (!isFilterPanelVisible && !isSortPanelVisible) && css.hidden
            )}>
                <FilterPanel 
                    setVisibility={setFilterPanelVisible}
                    control={control}
                    className={isFilterPanelVisible ? '' : css.hidden}
                />

                <SortPanel 
                    setVisibility={setSortPanelVisible}
                    control={control}
                    className={isSortPanelVisible ? '' : css.hidden}
                />
            </div>
        </form>
    )
}