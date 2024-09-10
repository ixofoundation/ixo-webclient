'use client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import { GlobalStyle } from 'styles/globalStyles'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Suspense, useEffect, useState } from 'react'
import '@mantine/core/styles.css'
import { useIxoConfigs } from 'hooks/configs'
import Router from 'router'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { selectCustomTheme } from 'redux/theme/theme.selectors'
import 'mapbox-gl/dist/mapbox-gl.css'

export const gqlClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BLOCK_SYNC_GRAPHQL,
  cache: new InMemoryCache({ addTypename: false }),
})

const App = () => {
  const { fetchEntityConfig, fetchThemeConfig, entityConfig } = useIxoConfigs()
  const dispatch = useAppDispatch()

  useEffect(() => {
    fetchEntityConfig()
  }, [fetchEntityConfig])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <Suspense fallback={<Spinner info='Connecting to the Internet of Impacts' />}> */}
        {/* <WalletProvider
            chainNetwork={chainNetwork}
            customComponent={<RedirectToMyAccount />}
            rpcEndpoint={RPC_ENDPOINT ?? ''}
          >
            <WalletModal /> */}
        <GlobalStyle />
        <ApolloProvider client={gqlClient}>{entityConfig && <Router />}</ApolloProvider>
        {/* </WalletProvider> */}
        {/* </Suspense> */}
      </PersistGate>
    </Provider>
  )
}

export default App
