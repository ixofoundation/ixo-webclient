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
  return null
}

export default App
