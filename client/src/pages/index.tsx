import { Route, Routes } from "react-router-dom"

import { ROUTE_CONSTANTS } from 'shared/config'

import { layoutUi } from 'pages/layout'
import { homeUi } from 'pages/home'
import { notFoundUi } from 'pages/not-found'
import { catalogUi } from 'pages/catalog'
import { productUi } from 'pages/product'
import { contactsAndDeliveryUi } from 'pages/contacts-and-delivery'
import { aboutUi } from 'pages/about'
import { cartUi } from 'pages/cart'
import { elementsTestUi } from 'pages/elements-test'

const { Layout } = layoutUi
const { HomePage } = homeUi
const { CatalogPage } = catalogUi
const { ProductPage } = productUi
const { ContactsAndDeliveryPage } = contactsAndDeliveryUi
const { AboutPage } = aboutUi
const { CartPage } = cartUi
const { NotFoundPage } = notFoundUi
const { ElementsTestPage } = elementsTestUi

export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />

                <Route path={ROUTE_CONSTANTS.CONTACTS_AND_DELIVERY.ROUTE} element={<ContactsAndDeliveryPage />} />
                <Route path={ROUTE_CONSTANTS.ABOUT.ROUTE} element={<AboutPage />} />

                <Route path={ROUTE_CONSTANTS.CATALOG.ROUTE} element={<CatalogPage />} />
                <Route path={ROUTE_CONSTANTS.PRODUCT.ROUTE} element={<ProductPage />} />
                <Route path={ROUTE_CONSTANTS.CART.ROUTE} element={<CartPage />} />

                <Route path={ROUTE_CONSTANTS.NOT_FOUND.ROUTE} element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}