import React from 'react';
import { Link } from "react-router-dom";

import { ROUTE_CONSTANTS } from 'shared/config'

import css from './Header.module.css';

export const Header = () => {
    return (
        <header>
            <Link to={ROUTE_CONSTANTS.HOME} className={css.headerLogoLink}>
                <img src="/icons/large/honey-accent.png" alt=''/>
            </Link>
            <div className={css.headerGroup}>
                <Link to={ROUTE_CONSTANTS.CATALOG} className={css.headerLogoLink}>
                    <h2>Каталог</h2>
                </Link>
                <Link to={ROUTE_CONSTANTS.CONTACTS_AND_DELIVERY} className={css.headerLogoLink}>
                    <h2>Кантакты і дастаўка</h2>
                </Link>
                <Link to={ROUTE_CONSTANTS.ABOUT} className={css.headerLogoLink}>
                    <h2>Пра нас</h2>
                </Link>
            </div>
            <div className={css.headerGroup}>
                <Link to="#" className={css.headerLogoLink}>
                    <img src="/icons/linear/magniglass.png" alt=''/>
                </Link>
                <Link to="#" className={css.headerLogoLink}>
                    <img src="/icons/linear/cart.png" alt=''/>
                </Link>
            </div>
        </header>
    )
}