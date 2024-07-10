import { Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { ROUTE_CONSTANTS } from 'shared/config'

import { AboutPage } from "pages/about"
import { CartPage } from "pages/cart"
import { CatalogPage } from "pages/catalog"
import { ContactsAndDeliveryPage } from "pages/contacts-and-delivery"
import { HomePage } from "pages/home"
import { NotFoundPage } from "pages/not-found"
import { ProductPage } from "pages/product"
import { LoadingPage } from "pages/loading"

import { Layout } from "../layout"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingPage />}>
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
            </Suspense>
        </BrowserRouter>
    )
}