import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ConnectedRouter } from 'connected-react-router'
import configureStore from './common/redux/store'
import { AppConnected } from './modules/App/App'
import * as serviceWorker from './serviceWorker'
import { history } from '../src/common/redux/store'
import 'react-dates/lib/css/_datepicker.css'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import './index.css'

const storeAndPersistor = configureStore()

Sentry.init({
  dsn:
    'https://ec5544ebef56420fb292d214be6b82a6@o1174926.ingest.sentry.io/6271402',
  integrations: [new BrowserTracing()],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

ReactDOM.render(
  <Provider store={storeAndPersistor.store}>
    <PersistGate loading={null} persistor={storeAndPersistor.persistor}>
      <ConnectedRouter history={history}>
        <AppConnected />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
