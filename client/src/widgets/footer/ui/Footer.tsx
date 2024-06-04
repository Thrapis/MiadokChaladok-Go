import React from 'react';

import css from './Footer.module.css';

import { Icon, Link } from 'shared/ui';
import { CONTACT_DATA, SOCIAL_LINKS } from 'shared/config';

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
                            {/* <Icon type='geopin' /> */}
                            <img src="/icons/medium/geopin.png" alt=''/>
                            <span>{CONTACT_DATA.LOCATION}</span>
                        </div>
                        <div className={css.categoryElement}>
                            <img src="/icons/medium/clock.png" alt=''/>
                            <span>{CONTACT_DATA.TIME}</span>
                        </div>
                        <div className={css.categoryElement}>
                            <img src="/icons/medium/phone.png" alt=''/>
                            <span>{CONTACT_DATA.PHONE}</span>
                        </div>
                        <div className={css.categoryElement}>
                            <img src="/icons/medium/envelope.png" alt=''/>
                            <span>{CONTACT_DATA.EMAIL}</span>
                        </div>
                    </div>
                </div>
                <div className={css.column}>
                    <h2>Каталог</h2>
                    <div className={css.categoryList}>
                        <div className={css.categoryElement}>
                            <Link size='small' href='#'>
                                Класічны мёд
                            </Link>
                        </div>
                        <div className={css.categoryElement}>
                            <Link size='small' href='#'>
                                Мёд у сотах
                            </Link>
                        </div>
                        <div className={css.categoryElement}>
                            <Link size='small' href='#'>
                                Наборы
                            </Link>
                        </div>
                        <div className={css.categoryElement}>
                            <Link size='small' href='#'>
                                Іншыя прадукты
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={css.column}>
                    <h2>Пра нас</h2>
                    <div className={css.categoryList}>
                        <div className={css.categoryElement}>
                            <Link size='small' href='#'>
                                Гісторыя пасекі
                            </Link>
                        </div>
                        <div className={css.categoryElement}>
                            <Link size='small' href='#'>
                                Дакументацыя
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={css.column}>
                    <h2>Дастаўка і аплата</h2>
                    <div className={css.categoryList}>
                        <div className={css.categoryElement}>
                            <Link size='small' href='#'>
                                Віды і ўмовы дастаўкі
                            </Link>
                        </div>
                        <div className={css.categoryElement}>
                            <Link size='small' href='#'>
                                Віды аплаты
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={css.over}>
                <div className={css.social}>
                    <Link width='height' size='small' href={SOCIAL_LINKS.INSTAGRAM} className={css.socialLink}>
                        <Icon type='instagram' />
                    </Link>
                    <Link width='height' size='small' href={SOCIAL_LINKS.TELEGRAM} className={css.socialLink}>
                        <Icon type='telegram' />
                    </Link>
                    <Link width='height' size='small' href={SOCIAL_LINKS.PINTEREST} className={css.socialLink}>
                        <Icon type='pinterest' />
                    </Link>
                    <Link width='height' size='small' href={SOCIAL_LINKS.TWITTER} className={css.socialLink}>
                        <Icon type='twitter' />
                    </Link>
                </div>
                <img src="/images/methods.png" />
            </div>
        </footer>
    )
}