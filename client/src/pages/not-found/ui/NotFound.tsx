import css from './NotFound.module.css';

export const NotFound = () => {
    return(
        <div className={css.pageContent}>
            <div className={css.errorBlock}>
                <div className={css.errorNumber}>404</div>
                <div className={css.errorComment}>падаецца, ты заблукаў, сябра</div>
                {/* Incapsulate this */}
                <a className="btn" href="/">Павярнуцца на галоўную</a>
            </div>
        </div>
    )
}