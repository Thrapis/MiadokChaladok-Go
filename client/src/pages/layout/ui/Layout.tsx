import { Outlet } from "react-router-dom";

import { Header } from "widgets/header";
import { Footer } from "widgets/footer";

import css from "./Layout.module.css";

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