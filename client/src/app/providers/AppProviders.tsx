import { ReactNode } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { ErrorPage } from "pages/error"

import store, { persistor } from '../store/Store'

type Props = {
    children: ReactNode
}

export const AppProviders = ({
    children
}: Props) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
        </ErrorBoundary>
    )
} 