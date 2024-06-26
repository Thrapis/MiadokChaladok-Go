import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { ROUTE_CONSTANTS } from 'shared/config';

import { layoutUi } from 'pages/layout'
import { homeUi } from 'pages/home'
import { notFoundUi } from 'pages/not-found'
import { catalogUi } from 'pages/catalog'
import { productUi } from 'pages/product'
import { contactsAndDeliveryUi } from 'pages/contacts-and-delivery'
import { aboutUi } from 'pages/about'
import { elementsTestUi } from 'pages/elements-test'

const { Layout } = layoutUi;
const { Home } = homeUi;
const { Catalog } = catalogUi;
const { Product } = productUi;
const { ContactsAndDelivery } = contactsAndDeliveryUi;
const { About } = aboutUi;
const { NotFound } = notFoundUi;
const { ElementsTest } = elementsTestUi;

export const Routing = () => {
    return (
        <Routes>
        <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>} />

            <Route path={ROUTE_CONSTANTS.CONTACTS_AND_DELIVERY.ROUTE} element={<ContactsAndDelivery/>} />
            <Route path={ROUTE_CONSTANTS.ABOUT.ROUTE} element={<About/>} />
            
            <Route path={ROUTE_CONSTANTS.CATALOG.ROUTE} element={<Catalog/>} />
            <Route path={ROUTE_CONSTANTS.PRODUCT.ROUTE} element={<Product/>} />
            

            <Route path={ROUTE_CONSTANTS.NOT_FOUND.ROUTE} element={<NotFound/>} />
            <Route path="*" element={<NotFound/>} />
        </Route>
        </Routes>
    );
};

// element={<Navigate to={ROUTE_CONSTANTS.NOT_FOUND} />}