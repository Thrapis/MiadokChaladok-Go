import cn from 'classnames'
import { useEffect, useState } from 'react';

import css from './Home.module.css';

import { Icon, Link } from 'shared/ui';
import { ROUTE_CONSTANTS } from 'shared/config';
import { 
    MainCarousel, 
    SuggestionsBlock, 
    ContactsAndMap 
} from "widgets";

export const Home = () => {
    const [error, setError] = useState<string | null>(null);

    return (
        <div className={cn(css.pageContent)}>
            <div className={css.carouselSpace}>
                <MainCarousel />
            </div>
            <div className={css.contentSpace}>
                <SuggestionsBlock />

                <div className={"complex-block"}>
                    <div className={"complex-block-img-block"}>
                        <img className={"complex-block-img"} src="/images/home/product-set-2.jpg" alt='Miadok set' />
                    </div>
                    <div className={"complex-block-info-block"}>
                        <h2 className={"complex-block-title"}>Сабяры свой унікальны падарунак</h2>
                        <div className={"complex-block-text"}>
                            Усё пачалося з дзядулі Івана Анісімава, які першым заснаваў пчальнік у сям'і. Ён быў мудрым і дасведчаным пчаляром, які надаваў вялікую ўвагу якасці сваёй працы. Ён навучыў свайго сына, Мікалая, і ўнука, Аляксандра, усім тонкасцям пчалярства, перадаючы ім свае веды і каханне да пчол.
                        </div>
                        <div className={"complex-block-text"}>
                            Мікалай і Аляксандр працавалі плячом да пляча, каб пашырыць пчальнік Анісімавых. Яны ўвесь час эксперыментавалі з рознымі метадамі ўтрымання пчол і паляпшэнні ўмоў для іх развіцця. Яны клапаціліся аб сваіх пчолах, ствараючы спецыяльныя рамкі, дзе яны маглі свабодна будаваць соты і збіраць мёд. Яны таксама вырошчвалі разнастайныя кветкі і расліны на навакольных участках, каб забяспечыць пчолам разнастайную і пажыўную пылковай і нектарную крыніцу.
                        </div>
                        <Link 
                            shape='round' 
                            width='fluid' 
                            theme='contained'
                            className={'complex-block-link'} 
                            href={ROUTE_CONSTANTS.ABOUT.ROUTE}
                        >
                            Абраць падарунак
                        </Link>
                    </div>
                </div>

                <div className={css.howToGetSpace}>
                    <h2 className={css.howToGetTitle}>Як можна атрымаць наш мёд?</h2>
                    <div className={css.howToGetList}>
                        <div className={cn("block", css.howToGetStage)}>
                            <Icon type='tent-colored' size='xxlarge' className={css.howToGetStageImg} />
                            <div className={css.howToGetStageName}>Набыць у краме</div>
                        </div>
                        <div className={cn("block", css.howToGetStage)}>
                            <Icon type='box-colored' size='xxlarge' className={css.howToGetStageImg} />
                            <div className={css.howToGetStageName}>Кур’ерам па Мінску</div>
                        </div>
                        <div className={cn("block", css.howToGetStage)}>
                            <Icon type='truck-colored' size='xxlarge' className={css.howToGetStageImg} />
                            <div className={css.howToGetStageName}>Поштай па Беларусі</div>
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
                            Усё пачалося з дзядулі Івана Анісімава, які першым заснаваў пчальнік у сям'і. Ён быў мудрым і дасведчаным пчаляром, які надаваў вялікую ўвагу якасці сваёй працы. Ён навучыў свайго сына, Мікалая, і ўнука, Аляксандра, усім тонкасцям пчалярства, перадаючы ім свае веды і каханне да пчол.
                        </div>
                        <div className={"complex-block-text"}>
                            Мікалай і Аляксандр працавалі плячом да пляча, каб пашырыць пчальнік Анісімавых. Яны ўвесь час эксперыментавалі з рознымі метадамі ўтрымання пчол і паляпшэнні ўмоў для іх развіцця. Яны клапаціліся аб сваіх пчолах, ствараючы спецыяльныя рамкі, дзе яны маглі свабодна будаваць соты і збіраць мёд. Яны таксама вырошчвалі разнастайныя кветкі і расліны на навакольных участках, каб забяспечыць пчолам разнастайную і пажыўную пылковай і нектарную крыніцу.
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

                <ContactsAndMap />
            </div>
        </div>
    )
}