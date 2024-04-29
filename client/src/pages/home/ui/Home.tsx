import { useEffect, useState } from 'react';

import cn from 'classnames'
import css from './Home.module.css';
import compcss from 'app/styles/components/Components.module.css';

import { MainCarousel } from "widgets/carousel";

import { Button } from 'shared/ui';
import { ProductDto, ProductCard, Api } from 'entities/product/';
import { ROUTE_CONSTANTS } from 'shared/config';

type SuggestsResponse = {
    products: ProductDto[]
}

export const Home = () => {
    const [suggestions, setSuggestions] = useState<ProductDto[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                let answer = await Api.get<SuggestsResponse>('http://127.0.0.1:8080/product/suggestions/3')
                //console.log(answer.products)
                setSuggestions(answer.products)
            }
            catch (error) {
                // Handle any error happened.
            }
        })()
    }, [])

    return (
        <div className={cn(css.pageContent)}>
            <div className={css.carouselSpace}>
                <MainCarousel />
            </div>
            <div className={css.contentSpace}>
                <div className={css.bestSuggestions}>
                    <h2 className={css.bestSuggestionsTitle}>Найлепшыя прапановы</h2>

                    <div className={css.productsList}>
                        {
                            suggestions?.map((suggest: ProductDto) => (
                                <ProductCard dto={suggest} key={crypto.randomUUID()} />
                            ))
                        }
                    </div>
                </div>

                <div className={compcss.complexBlock}>
                    <div>
                        <img className={compcss.complexBlockImg} src="/images/home/product-set-2.jpg" alt='Miadok set' />
                    </div>
                    <div>
                        <h2 className={compcss.complexBlockTitle}>Сабяры свой унікальны падарунак</h2>
                        <div className={compcss.complexBlockText}>
                            Усё пачалося з дзядулі Івана Анісімава, які першым заснаваў пчальнік у сям'і. Ён быў мудрым і дасведчаным пчаляром, які надаваў вялікую ўвагу якасці сваёй працы. Ён навучыў свайго сына, Мікалая, і ўнука, Аляксандра, усім тонкасцям пчалярства, перадаючы ім свае веды і каханне да пчол.
                        </div>
                        <div className={compcss.complexBlockText}>
                            Мікалай і Аляксандр працавалі плячом да пляча, каб пашырыць пчальнік Анісімавых. Яны ўвесь час эксперыментавалі з рознымі метадамі ўтрымання пчол і паляпшэнні ўмоў для іх развіцця. Яны клапаціліся аб сваіх пчолах, ствараючы спецыяльныя рамкі, дзе яны маглі свабодна будаваць соты і збіраць мёд. Яны таксама вырошчвалі разнастайныя кветкі і расліны на навакольных участках, каб забяспечыць пчолам разнастайную і пажыўную пылковай і нектарную крыніцу.
                        </div>
                        <Button type='link' shape='round' href={ROUTE_CONSTANTS.ABOUT} className={compcss.btn}>
                            Абраць падарунак
                        </Button>
                    </div>
                </div>


                <div className={css.howToGetSpace}>
                    <h2 className={css.howToGetTitle}>Як можна атрымаць наш мёд?</h2>
                    <div className={css.howToGetList}>
                        <div className={cn(compcss.block, css.howToGetStage)}>
                            <img src="/icons/detailed/detailed-tent.png" alt='Tent' />
                            <div className={css.howToGetStageName}>Набыць у краме</div>
                        </div>
                        <div className={cn(compcss.block, css.howToGetStage)}>
                            <img src="/icons/detailed/detailed-box.png" alt='Box' />
                            <div className={css.howToGetStageName}>Кур’ерам па Мінску</div>
                        </div>
                        <div className={cn(compcss.block, css.howToGetStage)}>
                            <img src="/icons/detailed/detailed-truck.png" alt='Truck' />
                            <div className={css.howToGetStageName}>Поштай па Беларусі</div>
                        </div>
                    </div>
                </div>


                <div className={compcss.complexBlock}>
                    <div>
                        <img className={compcss.complexBlockImg} src="/images/home/honey-1.jpeg" alt='Homeycomb' />
                    </div>
                    <div>
                        <h2 className={compcss.complexBlockTitle}>Наша пасека</h2>
                        <div className={compcss.complexBlockText}>
                            Все началось с дедушки Ивана Онисимова, который первым основал пасеку в семье. Он был мудрым и опытным пчеловодом, который уделял большое внимание качеству своей работы. Он обучил своего сына, Николая, и внука, Александра, всем тонкостям пчеловодства, передавая им свои знания и любовь к пчелам.
                        </div>
                        <div className={compcss.complexBlockText}>
                            Николай и Александр работали плечом к плечу, чтобы расширить пасеку Онисимовых. Они постоянно экспериментировали с разными методами содержания пчел и улучшения условий для их развития. Они заботились о своих пчелах, создавая специальные рамки, где они могли свободно строить соты и собирать мед. Они также выращивали разнообразные цветы и растения на окружающих участках, чтобы обеспечить пчелам разнообразный и питательный пыльцевой и нектарный источник.
                        </div>
                        <Button type='link' shape='round' href={ROUTE_CONSTANTS.ABOUT} className={compcss.btn}>
                            Падрабязней
                        </Button>
                    </div>
                </div>


                <div className={css.contactsAndMap}>
                    <div className={compcss.block}>
                        <h2>Кантакты</h2>
                        <div className={css.contactColumn}>
                            <div className={css.contactRow}>
                                <img src="/icons/medium/geopin.png" alt='Geopin' />
                                <span>г. Мінск, вул. Савецкая, 23</span>
                            </div>
                            <div className={css.contactRow}>
                                <img src="/icons/medium/clock.png" alt='Clock' />
                                <span>10:00 - 21:00</span>
                            </div>
                            <div className={css.contactRow}>
                                <img src="/icons/medium/phone.png" alt='Phone' />
                                <span>+375 (44) 116-06-22</span>
                            </div>
                            <div className={css.contactRow}>
                                <img src="/icons/medium/envelope.png" alt='Envelope' />
                                <span>miadokhaladok@gmail.com</span>
                            </div>
                            <div className={css.socialRow}>
                                <a href="instagram.com">
                                    <img src="/icons/linear/instagram.png" alt='' />
                                </a>
                                <a href="telegram.org">
                                    <img src="/icons/linear/telegram.png" alt='' />
                                </a>
                                <a href="pinterest.com">
                                    <img src="/icons/linear/pinterest.png" alt='' />
                                </a>
                                <a href="twitter.com">
                                    <img src="/icons/linear/twitter.png" alt='' />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={compcss.block}>
                        <img src="/images/map.png" alt='Shop on map' />
                    </div>
                </div>
            </div>
        </div>
    )
}