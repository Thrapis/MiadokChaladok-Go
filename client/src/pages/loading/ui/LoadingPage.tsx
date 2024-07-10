
import { Icon } from 'shared/ui'
import css from './LoadingPage.module.css'

export const LoadingPage = () => {

    return(
        <div className={css.pageContent}>
            <Icon 
                iconClassName={css.loadingIcon}
                type='loading-animated' 
            />
        </div>
    )
}