export const isDevelopment =
  !process.env.NODE_ENV ||
  process.env.NEXT_PUBLIC_CHAIN_ID === 'devnet-1' ||
  process.env.NEXT_PUBLIC_CHAIN_ID === 'pandora-8'
export const currentRelayerNode = process.env.NEXT_PUBLIC_RELAYER_NODE ?? ''
export const currentChainId = process.env.NEXT_PUBLIC_CHAIN_ID
export const relayersToInclude = ['did:x:zQ3shj4dPHhbsSXYcmsZLoDkiPJxkHhWYZpihWSQn95fuos2y']
export const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? ''
export const algoliaSearchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY ?? ''
export const algoliaIndexName = `entities-${currentChainId}`
