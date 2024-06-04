import cn from 'classnames'

import css from './ContactsAndMap.module.css';

import { CONTACT_DATA, SOCIAL_LINKS } from 'shared/config';
import { Link, Icon } from 'shared/ui';

export const ContactsAndMap = () => {
    return (
        <div className={css.contactsAndMap}>
            <div className={"block"}>
                <h2>Кантакты</h2>
                <div className={css.contactColumn}>
                    <div className={css.contactRow}>
                        <img src="/icons/medium/geopin.png" alt='Geopin' />
                        <span>{CONTACT_DATA.LOCATION}</span>
                    </div>
                    <div className={css.contactRow}>
                        <img src="/icons/medium/clock.png" alt='Clock' />
                        <span>{CONTACT_DATA.TIME}</span>
                    </div>
                    <div className={css.contactRow}>
                        <img src="/icons/medium/phone.png" alt='Phone' />
                        <span>{CONTACT_DATA.PHONE}</span>
                    </div>
                    <div className={css.contactRow}>
                        <img src="/icons/medium/envelope.png" alt='Envelope' />
                        <span>{CONTACT_DATA.EMAIL}</span>
                    </div>
                    <div className={cn(css.socialRow, css.socialLinkList)}>
                        <Link width='height' size='small' href={SOCIAL_LINKS.INSTAGRAM} className={css.socialLink}>
                            <Icon type='instagram' size='xxlarge' />
                        </Link>
                        <Link width='height' size='small' href={SOCIAL_LINKS.TELEGRAM} className={css.socialLink}>
                            <Icon type='telegram' size='xxlarge' />
                        </Link>
                        <Link width='height' size='small' href={SOCIAL_LINKS.PINTEREST} className={css.socialLink}>
                            <Icon type='pinterest' size='xxlarge' />
                        </Link>
                        <Link width='height' size='small' href={SOCIAL_LINKS.TWITTER} className={css.socialLink}>
                            <Icon type='twitter' size='xxlarge' />
                        </Link>
                    </div>
                </div>
            </div>
            <div className={"block"}>
                <img src="/images/map.png" alt='Shop on map' />
            </div>
        </div>
    )
}