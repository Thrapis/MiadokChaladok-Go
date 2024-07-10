import 'app/styles/index.scss'
import css from './App.module.css'

import { AppProviders } from './providers'
import { AppRouter } from './router'

const App = () => {
    return (
        <AppProviders>
            <AppRouter />
        </AppProviders>
    )
}

export default App