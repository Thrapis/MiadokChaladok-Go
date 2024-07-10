import { Link } from "shared/ui";

import { ROUTE_CONSTANTS } from 'shared/config'

import css from './Header.module.css';
import { CartButton } from 'widgets/cart-button/ui';
import { SearchButton } from 'widgets/search-button/ui';

export const Header = () => {

    return (
        <header>
            <Link href={ROUTE_CONSTANTS.HOME.ROUTE} className={css.headerLogoLink}>
                <img src="/icons/large/honey-accent-square.png" alt='' />
            </Link>
            <div className={css.headerGroup}>
                <Link href={ROUTE_CONSTANTS.CATALOG.ROUTE} className={css.headerLogoLink}>
                    <h2>Каталог</h2>
                </Link>
                <Link href={ROUTE_CONSTANTS.CONTACTS_AND_DELIVERY.ROUTE} className={css.headerLogoLink}>
                    <h2>Кантакты і дастаўка</h2>
                </Link>
                <Link href={ROUTE_CONSTANTS.ABOUT.ROUTE} className={css.headerLogoLink}>
                    <h2>Пра нас</h2>
                </Link>
            </div>
            <div className={css.headerGroup}>
                <SearchButton />
                <CartButton />
            </div>
        </header>
    )
}