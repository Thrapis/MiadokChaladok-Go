import { Outlet } from "react-router-dom"

import css from "./Layout.module.css"

import { headerUi } from "widgets/header"
import { footerUi } from "widgets/footer"

const { Header } = headerUi
const { Footer } = footerUi

export const Layout = () => {
    return(
        <>
            <Header/>
            <main className={css.main}>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}