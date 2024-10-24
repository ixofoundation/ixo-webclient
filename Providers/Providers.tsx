'use client'
import { ReactNode } from 'react'
import { MantineProvider } from '@mantine/core'
import { ThemeProvider } from 'styled-components'
import { theme } from 'components/CoreEntry/App.styles'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { GlobalStyle } from 'styles/globalStyles'
import StoreProvider from 'redux/StoreProvider'
import { ToastContainer } from 'react-toastify'
import mantineTheme from 'styles/mantine'

interface ProvidersProps {
  children: ReactNode
}

export const gqlClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BLOCK_SYNC_GRAPHQL,
  cache: new InMemoryCache({ addTypename: false }),
})

export default function Providers({ children }: ProvidersProps) {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <MantineProvider theme={mantineTheme}>
          <ToastContainer theme='dark' hideProgressBar={true} position='top-right' />

          <GlobalStyle />
          <ApolloProvider client={gqlClient}>{children}</ApolloProvider>
        </MantineProvider>
      </ThemeProvider>
    </StoreProvider>
  )
}
