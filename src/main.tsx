'use client'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import '@mantine/core/styles.css'
import 'mapbox-gl/dist/mapbox-gl.css'

export const gqlClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BLOCK_SYNC_GRAPHQL,
  cache: new InMemoryCache({ addTypename: false }),
})

const App = () => {
  return null
}

export default App
