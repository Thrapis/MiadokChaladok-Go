import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { ROUTE_CONSTANTS } from 'shared/config';

import { layoutUi } from 'pages/layout';
import { homeUi } from 'pages/home';
import { notFoundUi } from 'pages/not-found';
import { aboutUi } from 'pages/about';
import { elementsTestUi } from 'pages/elements-test';

const { Layout } = layoutUi;
const { Home } = homeUi;
const { NotFound } = notFoundUi;
const { About } = aboutUi;
const { ElementsTest } = elementsTestUi;

export const Routing = () => {
    return (
        <Routes>
        <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path={ROUTE_CONSTANTS.NOT_FOUND} element={<NotFound/>} />
            <Route path={ROUTE_CONSTANTS.ABOUT} element={<About/>} />
            <Route path="*" element={<NotFound/>} />
        </Route>
        </Routes>
    );
};

// element={<Navigate to={ROUTE_CONSTANTS.NOT_FOUND} />}