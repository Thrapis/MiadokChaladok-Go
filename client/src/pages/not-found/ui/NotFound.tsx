import { ROUTE_CONSTANTS } from 'shared/config';
import { Button, Link } from 'shared/ui';
import css from './NotFound.module.css';

export const NotFound = () => {
    return(
        <div className={css.pageContent}>
            <div className={css.errorBlock}>
                <div className={css.errorNumber}>404</div>
                <div className={css.errorComment}>падаецца, ты заблукаў, сябра</div>
                {/* Incapsulate this */}
                <Link
                    shape='round'
                    theme='contained'
                    href={ROUTE_CONSTANTS.HOME.ROUTE}
                    className={css.redirectButton}
                >
                    Павярнуцца на галоўную
                </Link>
            </div>
        </div>
    )
}