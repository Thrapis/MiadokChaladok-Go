import cn from 'classnames'
import css from './ContactsAndDeliveryPage.module.css'

import { ROUTE_CONSTANTS } from 'shared/config'
import { Link, Icon } from 'shared/ui'

import { Breadcrumbs } from 'widgets/breadcrumbs'
import { ContactsAndMap } from "widgets/contacts-and-map"

export const ContactsAndDeliveryPage = () => {
    return (
        <div className={cn(css.pageContent)}>
            <Breadcrumbs />

            <ContactsAndMap />

            <div className={"complex-block"}>
                <div className={"complex-block-info-block"}>
                    <h2 className={"complex-block-title"}>Умовы дастаўкі</h2>
                    <div className={"complex-block-text"}>
                        <h3 className={css.subtitleWithIcon}>
                            <Icon type='box-colored' orientation='inline' /> Курьерам па Мінску
                        </h3>
                        <ul className={css.textList}>
                            <li>заказы ад 0 да 34,99 руб. – 6,00 руб.;</li>
                            <li>заказы ад 35,00 да 69,99 руб. – 3,00 руб.;</li>
                            <li>заказы ад 70,00 руб. – бясплатна.</li>
                        </ul>
                        Дастаўка кур'ерам ажыццяўляецца на наступны працоўны дзень пры пацверджанні заказу да 13.00. Заказы, прынятыя пасля гэтага часу, дастаўляюцца праз адзін працоўны дзень. Субота, нядзеля – выхадныя.
                    </div>
                    <div className={"complex-block-text"}>
                        <h3 className={css.subtitleWithIcon}>
                            <Icon type='truck-colored' orientation='inline' /> Поштай па Беларусі
                        </h3>
                        <ul className={css.textList}>
                            <li>Заказы ад 0 до 34,99 руб. – 3,00 руб.;</li>
                            <li>Заказы ад 35,00 руб. – бясплатна.</li>
                        </ul>
                        Камісія за накладзены плацёж не спаганяецца! Тэрмін дастаўкі – 1-3 працоўныя дні. Аплата ажыццяўляецца накладзеным плацяжом па месцы атрымання (РУП «Белпошта»). Магчымы наяўны і безнаяўны разлік. За межы Рэспублікі Беларусь дастаўка не ажыццяўляецца.
                    </div>
                </div>
                <div className={"complex-block-info-block"}>
                    <h2 className={"complex-block-title"}>Аплата</h2>
                    <div className={"complex-block-text"}>
                        <h3 className={css.subtitleWithIcon}>
                            <Icon type='box-colored' orientation='inline' /> Пры дастаўцы кур’ерам
                        </h3>
                        <ul className={css.textList}>
                            <li>анлайн на нашым сайце пры заказе;</li>
                            <li>наяўнымі сродкамі (толькі беларускія рублі) кур’еру;</li>
                            <li>пластыкавай банкаўскай карткай (Visa, MasterCard, MasterCard Electronic, MasterCard і Белкарт Maestro) праз тэрмінал, які знаходзіцца ў кур'ера.</li>
                        </ul>
                    </div>
                    <div className={"complex-block-text"}>
                        <h3 className={css.subtitleWithIcon}>
                            <Icon type='truck-colored' orientation='inline' /> Пры дастаўцы па пошце
                        </h3>
                        <ul className={css.textList}>
                            <li>анлайн на нашым сайце пры заказе;</li>
                            <li>накладзеным плацяжом на пошце.</li>
                        </ul>
                    </div>
                    <div className={"complex-block-text"}>
                        <h3 className={css.subtitleWithIcon}>
                            <Icon type='tent-colored' orientation='inline' /> У нашай краме
                        </h3>
                        <ul className={css.textList}>
                            <li>наяўнымі сродкамі (толькі беларускія рублі);</li>
                            <li>пластыкавай банкаўскай карткай (Visa, MasterCard, MasterCard Electronic, MasterCard і Белкарт Maestro) праз тэрмінал, які знаходзіцца ў кур'ера.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={"complex-block"}>
                <div className={"complex-block-img-block"}>
                    <img className={"complex-block-img"} src="/images/home/honey-1.jpeg" alt='Homeycomb' />
                </div>
                <div className={"complex-block-info-block"}>
                    <h2 className={"complex-block-title"}>Наша пасека</h2>
                    <div className={"complex-block-text"}>
                    Пасля пяці гадоў працы ў сваім першым месцы Джыліян і Кім пашырылі і адкрылі другую вітрыну ў цэнтры Эшвіля ў верасні 2019 года. Вы можаце паспрабаваць розныя віды мёду з усяго свету ў іх унікальным дэгустацыйным бары. Адукаваныя пчаляры могуць даць узоры мёду і расказаць наведвальнікам аб кожным незвычайным мёдзе. Мёд з кіслага дрэва - вечны фаварыт Джыліян і Кім, часткова з-за неверагоднага густу, але таксама з-за яго сувязі з мясцовымі гарамі Апалачы.
                    </div>
                    <Link
                        shape='round'
                        width='fluid'
                        theme='contained'
                        className={'complex-block-link'}
                        href={ROUTE_CONSTANTS.ABOUT.ROUTE}
                    >
                        Падрабязней
                    </Link>
                </div>
            </div>

        </div>
    )
}