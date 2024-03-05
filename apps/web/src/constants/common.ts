export const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
export const currentRelayerNode = process.env.REACT_APP_RELAYER_NODE