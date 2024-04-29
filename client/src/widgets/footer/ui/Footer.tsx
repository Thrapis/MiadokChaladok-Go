import React from 'react';
import css from './Footer.module.css';

export const Footer = () => {
    return (
        <footer>
            <div className={css.row}>
                <div className={css.logoSide}>
                    <img src="/icons/large/honey-card.png" alt=''/>
                </div>

                <div className={css.column}>
                    <h2>Кантакты</h2>
                    <div className={css.categoryList}>
                        <div className={css.categoryElement}>
                            <img src="/icons/medium/geopin.png" alt=''/>
                            <span>г. Мінск, вул. Савецкая, 23</span>
                        </div>
                        <div className={css.categoryElement}>
                            <img src="/icons/medium/clock.png" alt=''/>
                            <span>10:00 - 21:00</span>
                        </div>
                        <div className={css.categoryElement}>
                            <img src="/icons/medium/phone.png" alt=''/>
                            <span>+375 (44) 116-06-22</span>
                        </div>
                        <div className={css.categoryElement}>
                            <img src="/icons/medium/envelope.png" alt=''/>
                            <span>miadokhaladok@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div className={css.column}>
                    <h2>Каталог</h2>
                    <div className={css.categoryList}>
                        <div className={css.categoryElement}>
                            <a href="#">Класічны мёд</a>
                        </div>
                        <div className={css.categoryElement}>
                            <a href="#">Мёд у сотах</a>
                        </div>
                        <div className={css.categoryElement}>
                            <a href="#">Наборы</a>
                        </div>
                        <div className={css.categoryElement}>
                            <a href="#">Іншыя прадукты</a>
                        </div>
                    </div>
                </div>
                <div className={css.column}>
                    <h2>Пра нас</h2>
                    <div className={css.categoryList}>
                        <div className={css.categoryElement}>
                            <a href="#">Гісторыя пасекі</a>
                        </div>
                        <div className={css.categoryElement}>
                            <a href="#">Дакументацыя</a>
                        </div>
                    </div>
                </div>
                <div className={css.column}>
                    <h2>Дастаўка і аплата</h2>
                    <div className={css.categoryList}>
                        <div className={css.categoryElement}>
                            <a href="#">Віды і ўмовы дастаўкі</a>
                        </div>
                        <div className={css.categoryElement}>
                            <a href="#">Віды аплаты</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={css.over}>
                <div className={css.social}>
                    <a href="#">
                        <img src="/icons/linear/instagram.png" alt=''/>
                    </a>
                    <a href="#">
                        <img src="/icons/linear/telegram.png" alt=''/>
                    </a>
                    <a href="#">
                        <img src="/icons/linear/pinterest.png" alt=''/>
                    </a>
                    <a href="#">
                        <img src="/icons/linear/twitter.png" alt=''/>
                    </a>
                </div>
                <img src="/images/methods.png" />
            </div>
        </footer>
    )
}