import cn from 'classnames'

import css from './SearchButton.module.css'

import { ROUTE_CONSTANTS } from "shared/config"
import { Icon, Link } from "shared/ui"


export const SearchButton = () => {

    return(
        <Link className={cn(css.linkButton)} size='fit' theme='text' href="#">
            <Icon className={css.iconWrapper} type='magniglass' renderType='mask' size='xxxl' />
        </Link>
    )
}