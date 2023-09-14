import reportWebVitals from './reportWebVitals'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ConnectedRouter } from 'connected-react-router'
import { history, store, persistor } from './redux/store'
import { AppConnected } from './components/App/App'
import { GlobalStyle } from 'styles/globalStyles'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

process.env.NODE_ENV === 'production' &&
  Sentry.init({
    dsn: 'https://ec5544ebef56420fb292d214be6b82a6@o1174926.ingest.sentry.io/6271402',
    integrations: [new BrowserTracing()],
    // Set to 1.0 to capture 100% of transactions for performance monitoring. We recommend adjusting this value in production
    // When increasing traces for performance uncomment profiler in <AppConnected>
    tracesSampleRate: 0.0,
  })

const client = new ApolloClient({
  uri: process.env.REACT_APP_BLOCK_SYNC_GRAPHQL,
  cache: new InMemoryCache({ addTypename: false }),
})

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <ApolloProvider client={client}>
          <AppConnected />
        </ApolloProvider>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
