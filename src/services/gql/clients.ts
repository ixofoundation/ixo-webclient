import { ApolloClient, InMemoryCache } from '@apollo/client'
export const testnetGqlClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BLOCK_SYNC_GRAPHQL_TESTNET,
  cache: new InMemoryCache({ addTypename: false }),
})

export const mainnetGqlClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BLOCK_SYNC_GRAPHQL_MAINNET,
  cache: new InMemoryCache({ addTypename: false }),
})

export const devnetGqlClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BLOCK_SYNC_GRAPHQL_DEVNET,
  cache: new InMemoryCache({ addTypename: false }),
})

export const gqlClientByChain = {
  'ixo-4': mainnetGqlClient,
  'ixo-5': mainnetGqlClient,
  'pandora-8': testnetGqlClient,
  'devnet-1': devnetGqlClient,
}
