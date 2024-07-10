import { useRouteError } from 'react-router-dom'

import css from './ErrorPage.module.css'

import { ROUTE_CONSTANTS } from 'shared/config'
import { Icon, Link } from 'shared/ui'

export const ErrorPage = () => {
    const error = useRouteError()

    return(
        <div className={css.pageContent}>
            <Icon 
                iconClassName={css.errorIcon}
                type='sad'
            />
            <h2 className={css.label}>Нешта пайшло не так</h2>
            <span className={css.error}>
                {`${error}`}
            </span>
            <Link 
                href={ROUTE_CONSTANTS.HOME.ROUTE} 
                theme='contained'
                shape='round'
                size='medium'
            >
                Павярнуцца на галоўную
            </Link>
        </div>
    )
}