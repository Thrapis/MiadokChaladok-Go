import { useEffect, useRef } from 'react'

import 'app/styles/index.scss'
import css from './App.module.css'

import { withProviders } from "app/provider"

import { Routing } from "pages"
import { apiSession } from 'shared/api'

import { Provider } from 'react-redux'
import store, { persistor } from './Store'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
    const isMounted = useRef(false)

    if (!isMounted.current) {
        console.log("Setting session...")
        const response = apiSession.SetSession()
    }

    useEffect(() => {
        isMounted.current = true
    }, [])

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Routing />
            </PersistGate>
        </Provider>
    )
}

export default withProviders(App);
