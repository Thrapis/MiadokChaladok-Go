import css from './AboutPage.module.css'

import { ROUTE_CONSTANTS } from 'shared/config'
import { Link } from 'shared/ui'

import { breadcrumbsUi } from 'widgets/breadcrumbs'

const { Breadcrumbs } = breadcrumbsUi

export const AboutPage = () => {
    return (
        <div className={css.pageContent}>
            <Breadcrumbs />

            <div className={css.masonry}>
                <div className={css.imageBlock}>
                    <img src="/images/about/about-1.jpeg" alt='Тры пасечніка стаяць на фоне пасекі' />
                </div>
                <div className={css.textBlock}>
                    <div className={css.headText}>
                        Гісторыя нашай пасекі
                    </div>
                    <div className={css.contentText}>
                        Усё пачалося з дзядулі Івана Анісімава, які першым заснаваў пчальнік у сям'і. Ён быў мудрым і
                        дасведчаным пчаляром, які надаваў вялікую ўвагу якасці сваёй працы. Ён навучыў свайго сына, Мікалая, і
                        ўнука, Аляксандра, усім тонкасцям пчалярства, перадаючы ім свае веды і каханне да пчол. Мікалай і
                        Аляксандр працавалі плячом да пляча, каб пашырыць пчальнік Анісімавых. Яны ўвесь час эксперыментавалі з
                        рознымі метадамі ўтрымання пчол і паляпшэнні ўмоў для іх развіцця.
                    </div>
                </div>
                <div className={css.textBlock}>
                    <div className={css.headText}>
                        Першая крама
                    </div>
                    <div className={css.contentText}>
                        Усё пачалося з дзядулі Івана Анісімава, які першым заснаваў пчальнік у сям'і. Ён быў мудрым і
                        дасведчаным пчаляром, які надаваў вялікую ўвагу якасці сваёй працы. Ён навучыў свайго сына, Мікалая, і
                        ўнука, Аляксандра, усім тонкасцям пчалярства, перадаючы ім свае веды і каханне да пчол. Мікалай і
                        Аляксандр працавалі плячом да пляча, каб пашырыць пчальнік Анісімавых.
                    </div>
                    <Link
                        theme='contained'
                        shape='round'
                        width='fluid'
                        className={css.link}
                        href={ROUTE_CONSTANTS.HOME.ROUTE}
                    >
                        Наведаць
                    </Link>
                </div>
                <div className={css.imageBlock}>
                    <img src="/images/about/about-2.jpeg" alt='Вітрыны крам' />
                </div>
                <div className={css.imageBlock}>
                    <img src="/images/about/about-3.jpeg" alt='Пасечнік працуе на песеке' />
                </div>
                <div className={css.textBlock}>
                    <div className={css.headText}>
                        Дакументацыя
                    </div>
                    <ul className={css.contentText}>
                        <li>Ветырынарна-санітарны пашпарт пасекі</li>
                        <li>Пратаколы даследвання мёду па паказнікам якасці і бяспекі</li>
                        <li>Вельмі важная паперка</li>
                        <li>Умовы дагавору (аферты)</li>
                        <li>Шчэ нейкая паперунька</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}