import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import { GlobalStyle } from 'styles/globalStyles'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Suspense, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { WalletModal, WalletProvider } from '@ixo-webclient/wallet-connector'
import '@mantine/core/styles.css'
import { chainNetwork } from 'hooks/configs'
import ProfileModal from 'components/Header/components/ProfileModal'
import { RPC_ENDPOINT } from 'lib/protocol'
import Router from 'router'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { selectCustomTheme } from 'redux/theme/theme.selectors'
import { theme } from 'components/App/App.styles'
import { selectEntityConfig } from 'redux/configs/configs.selectors'
import { changeEntitiesType, getEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.actions'
import { ThemeProvider } from 'styled-components'
import { Spinner } from 'components/Spinner/Spinner'
import { getCustomTheme } from 'redux/theme/theme.actions'

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

const App = () => {
  // const [customizedTheme, setCustomizedTheme] = useState<any>(theme)
  // const dispatch = useAppDispatch()
  // const entityConfig = useAppSelector(selectEntityConfig)
  // const customTheme = useAppSelector(selectCustomTheme)

  // useEffect(() => {
  //   dispatch(getEntityConfig())
  //   dispatch(getCustomTheme())
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // console.log({entityConfig})

  // useEffect(() => {
  //   if (!entityConfig) return

  //   // Determine entity type
  //   const newEntityType = entityConfig.UI?.explorer?.defaultView

  //   console.log({newEntityType})
  //   if(entityConfig){
  //     dispatch(changeEntitiesType(newEntityType))
  //   }

  //   // Apply custom theme
  //   const { theme: myTheme } = entityConfig
  //   const newCustomizedTheme = { ...customizedTheme, ...customTheme }

  //   if (myTheme) {
  //     const { fontFamily, primaryColor, highlight } = myTheme

  //     if (fontFamily) {
  //       newCustomizedTheme.primaryFontFamily = fontFamily
  //     }
  //     if (primaryColor) {
  //       newCustomizedTheme.ixoBlue = primaryColor
  //       newCustomizedTheme.ixoNewBlue = primaryColor
  //     }
  //     if (highlight) {
  //       newCustomizedTheme.highlight = highlight
  //       newCustomizedTheme.pending = highlight.light
  //     }
  //   }

  //   setCustomizedTheme(newCustomizedTheme)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [entityConfig, dispatch])

  // console.log({ entityConfig, customTheme })

  // if (!entityConfig && !customTheme) {
  //   return <Spinner info='Loading' />
  // }

  return (
    <Suspense fallback={<Spinner info='Connecting to the internet of impacts' />}>
      <ThemeProvider theme={theme}>
        <MantineProvider>
          <WalletProvider
            chainNetwork={chainNetwork}
            customComponent={<ProfileModal />}
            rpcEndpoint={RPC_ENDPOINT ?? ''}
          >
            <WalletModal />
            <GlobalStyle />
            <ApolloProvider client={client}>
               <Router />
            </ApolloProvider>
          </WalletProvider>
        </MantineProvider>
      </ThemeProvider>
    </Suspense>
  )
}

// const router = createBrowserRouter(createRoutesFromElements(<Route path='/' element={<App />} />))

// @ts-expect-error
const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />{' '}
    </PersistGate>
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
