import reportWebVitals from './reportWebVitals'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './redux/store'
import { AppConnected } from './modules/App/App'
import 'react-dates/lib/css/_datepicker.css'
import { GlobalStyle } from 'styles/globalStyles'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

const storeAndPersistor = configureStore()

Sentry.init({
  dsn: 'https://ec5544ebef56420fb292d214be6b82a6@o1174926.ingest.sentry.io/6271402',
  integrations: [new BrowserTracing()],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

ReactDOM.render(
  <Provider store={storeAndPersistor.store}>
    <GlobalStyle />
    <PersistGate loading={null} persistor={storeAndPersistor.persistor}>
      <ConnectedRouter history={history}>
        <AppConnected />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
