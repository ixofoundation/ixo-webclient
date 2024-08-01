export const isDevelopment = !process.env.NODE_ENV || import.meta.env.VITE_APP_CHAIN_ID === 'devnet-1'
export const currentRelayerNode = import.meta.env.VITE_APP_RELAYER_NODE