import React from 'react';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import css from './MainCarousel.module.css';

import { ROUTE_CONSTANTS } from 'shared/config';

import { Button, Link } from 'shared/ui';

export const MainCarousel = () => {
    var settings = {
        dots: true,
        appendDots: (dots: React.ReactNode) => <div>{dots}</div>,
        customPaging: () => <button></button>,
        arrows: false,
        infinite: true,
        speed: 1500,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    return (
        //owl-theme
        <Slider 
            {...settings}
            className={css.carouselContainer}
            dotsClass={css.pagination}
        >
            <div className={css.item}>
                <img className={css.backgroundImage} src='/images/slideshow/img-1.jpg'/>

                <Link
                    href={ROUTE_CONSTANTS.ABOUT.ROUTE}
                    size='medium'
                    shape='round'
                    theme='contained'
                    className={css.link}
                >
                    Падабраць падарунак на Пасху!
                </Link>
            </div>
            <div className={css.item}>
                <img className={css.backgroundImage} src='/images/slideshow/img-2.jpg'/>
            </div>
            <div className={css.item}>
                <img className={css.backgroundImage} src='/images/slideshow/img-3.jpg'/>
            </div>
        </Slider>
    )
}