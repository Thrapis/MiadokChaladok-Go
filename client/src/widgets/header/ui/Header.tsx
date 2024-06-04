import React from 'react';

import { Link } from "shared/ui";

import { ROUTE_CONSTANTS } from 'shared/config'

import css from './Header.module.css';

export const Header = () => {
    return (
        <header>
            <Link href={ROUTE_CONSTANTS.HOME.ROUTE} className={css.headerLogoLink}>
                <img src="/icons/large/honey-accent-square.png" alt=''/>
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
                <Link href="#" className={css.headerLogoLink}>
                    <img src="/icons/linear/magniglass.png" alt=''/>
                </Link>
                <Link href="#" className={css.headerLogoLink}>
                    <img src="/icons/linear/cart.png" alt=''/>
                </Link>
            </div>
        </header>
    )
}