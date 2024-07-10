import { Outlet, ScrollRestoration } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import 'react-toastify/dist/ReactToastify.css'

import { Header } from "widgets/header"
import { Footer } from "widgets/footer"

export const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />

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
        </>
    )
}