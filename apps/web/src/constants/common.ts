export const isDevelopment = !process.env.NODE_ENV || process.env.NEXT_PUBLIC_CHAIN_ID === 'devnet-1'
export const currentRelayerNode = process.env.NEXT_PUBLIC_RELAYER_NODE
