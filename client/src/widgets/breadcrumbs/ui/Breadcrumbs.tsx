import React from 'react';

import css from './Breadcrumbs.module.css';

import { ROUTE_CONSTANTS } from 'shared/config';

import { Button, Link } from 'shared/ui';
import { useLocation } from 'react-router';

export const Breadcrumbs = () => {
    const location = useLocation()

    const pathnames = location.pathname.split('/')
        .filter(crumb => crumb !== '')

    const crumbs = pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1
        const to = `/${pathnames.slice(0, index + 1).join('/')}`

        const route = Object.keys(ROUTE_CONSTANTS)
            .find(c => Object(ROUTE_CONSTANTS)[c]["ROUTE"] == to)

        const title = route ? Object(ROUTE_CONSTANTS)[route]["NAME"] : value

        return (
            <li key={crypto.randomUUID()} className={css.crumb}>
                {
                    isLast ? (
                        <span className={css.crumbText}>{title}</span>
                    ) : (
                        <Link size='fit' href={to} className={css.crumbLink}>{title}</Link>
                    )
                }
            </li>
        )
    })

    return (
       <nav className={css.breadcrumbsContainer}>
            <ul className={css.breadcrumbs}>
                <li className={css.crumb}>
                    <Link size='fit' href={ROUTE_CONSTANTS.HOME.ROUTE} className={css.crumbLink}>
                        {ROUTE_CONSTANTS.HOME.NAME}
                    </Link>
                </li>
                {crumbs}
            </ul>
       </nav>
    )
}