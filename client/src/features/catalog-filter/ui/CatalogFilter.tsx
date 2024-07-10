import cn from 'classnames'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"

import css from './CatalogFilter.module.css'

import { Button, Icon } from 'shared/ui'
import { typesForms } from 'shared/types'
import { apiStatic } from 'shared/api'
import { CatalogFilterDto, Category } from 'entities'

import { FilterPanel } from './FilterPanel'
import { SortPanel } from './SortPanel'
import { ArraysSoftEqual } from 'shared/lib'
import { SortList } from '../model'

const { GetFilterLists } = apiStatic
type FilterForm = typesForms.FilterForm

type Props = {
    onFilterChange: (data: FilterForm) => {}
}

export const CatalogFilter = ({
    onFilterChange,
}: Props) => {
    const [isFilterPanelVisible, setFilterPanelVisible] = useState(false)
    const [isSortPanelVisible, setSortPanelVisible] = useState(false)
    const [catalogFilters, setCatalogFilters] = useState<CatalogFilterDto>()

    const [defaultFilter, setDefaultFilter] = useState<FilterForm>()
    const [lastFilter, setLastFilter] = useState<FilterForm>()

    useEffect(() => {
        const defaults = {
            categoryIds: catalogFilters?.categories?.map(c => c.id),
            tasteIds: catalogFilters?.tastes?.map(t => t.id),
            sortType: parseInt(SortList[0].value)
        }
        setDefaultFilter(defaults as FilterForm)
        setLastFilter(defaults as FilterForm)
        reset(defaults)
    }, [catalogFilters])

    const {
        control,
        handleSubmit,
        reset,
        getValues,
        setValue,
    } = useForm<FilterForm>()

    async function fetchFilterLists() {
        const response = await GetFilterLists()
        const filterLists = response.data.payload as CatalogFilterDto
        setCatalogFilters(filterLists)
    }

    useEffect(() => {
        fetchFilterLists()
    }, [])

    const onFilterFormSubmit: SubmitHandler<FilterForm> = (filter) => {
        setFilterPanelVisible(false)
        setSortPanelVisible(false)
        onFilterChange(filter)
        setLastFilter(filter)
    }

    function isSelectedCategoryButton(categoryId: number) {
        const categoryIds = getValues("categoryIds")
        return ArraysSoftEqual(categoryIds, [categoryId])
    }

    function onCategoryButtonClick(categoryId: number) {
        const categoryIds = getValues("categoryIds")
        if (ArraysSoftEqual(categoryIds, [categoryId])) {
            setValue("categoryIds", catalogFilters?.categories?.map(c => c.id) || [])
        } else {
            setValue("categoryIds", [categoryId])
        }
    }

    const resetToDefault = () => reset(defaultFilter)

    const resetToLast = () => reset(lastFilter)

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
                        resetToLast()
                        setSortPanelVisible(false)
                    }}
                >
                    <Icon type='filter'></Icon>
                    <span>Фільтрацыя</span>
                </Button>

                <div className={css.productTypeContainer}>
                    {
                        catalogFilters?.categories?.map((category: Category) => (
                            <Button
                                type='submit'
                                shape='round'
                                size='large'
                                theme={isSelectedCategoryButton(category.id) ? 'contained' : 'outlined'}
                                className={css.controlButton}
                                key={crypto.randomUUID()}
                                onClick={() => {
                                    onCategoryButtonClick(category.id)
                                }}
                            >
                                {category.name}
                            </Button>
                        ))
                    }
                </div>

                <Button
                    type='button'
                    shape='round'
                    size='large'
                    className={css.controlButton}
                    onClick={() => {
                        setSortPanelVisible(prev => !prev)
                        resetToLast()
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
                    resetToDefault={resetToDefault}
                    setVisibility={setFilterPanelVisible}
                    className={isFilterPanelVisible ? '' : css.hidden}
                    control={control}
                    catalogFilters={catalogFilters}
                />

                <SortPanel
                    resetToDefault={resetToDefault}
                    setVisibility={setSortPanelVisible}
                    className={isSortPanelVisible ? '' : css.hidden}
                    control={control}
                />
            </div>
        </form>
    )
}