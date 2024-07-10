import { Outlet } from "react-router-dom"

import css from "./Layout.module.css"
import 'react-toastify/dist/ReactToastify.css'

import { headerUi } from "widgets/header"
import { footerUi } from "widgets/footer"
import { ToastContainer } from "react-toastify"

const { Header } = headerUi
const { Footer } = footerUi

export const Layout = () => {
    return (
        <>
            <Header />
            <main className={css.main}>
                <Outlet />
            </main>
            <ToastContainer
                position='bottom-right'
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='colored'
            />
            <Footer />
        </>
    )
}