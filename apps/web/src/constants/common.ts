export const isDevelopment = !process.env.NODE_ENV || process.env.REACT_APP_CHAIN_ID === 'devnet-1'
export const currentRelayerNode = process.env.REACT_APP_RELAYER_NODE
export const currentChainId = process.env.REACT_APP_CHAIN_ID
