import { CHAINS } from '../../constants/chains'
import { SigningStargateClient, createSigningClient } from '@ixo/impactxclient-sdk'
import { getOpera as getJamboWallet } from '@ixo/jambo-wallet-sdk'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID
/**
 * @deprecated TODO: remove
 */
const GAIA_RPC = CHAINS[CHAIN_ID as string]?.rpc

/**
 * @deprecated
 */
const addTestNet = async (): Promise<any> => {
  const opera = getJamboWallet()
  if (CHAIN_ID && opera) {
    await opera.experimentalSuggestChain(CHAINS[CHAIN_ID])
  }
}

/**
 * @deprecated
 */
const addMainNet = async (): Promise<any> => {
  const opera = getJamboWallet()
  if (CHAIN_ID && opera) {
    await opera.experimentalSuggestChain(CHAINS[CHAIN_ID])
  }
}

/**
 * @deprecated
 */
export const checkExtensionAndBrowser = (): boolean => {
  const opera = getJamboWallet()
  if (typeof opera !== `undefined`) {
    return true
  } else {
    console.log('Opera mobile wallet is undefined:', opera)
    return false
  }
}

/**
 * @deprecated
 */
export const initStargateClient = async (offlineSigner: any): Promise<SigningStargateClient> => {
  const client = await createSigningClient(GAIA_RPC, offlineSigner)
  return client
}

/**
 * @deprecated
 */
export const connectAccount = async (): Promise<any> => {
  if (!checkExtensionAndBrowser()) {
    return [null, null]
  }
  const opera = getJamboWallet()

  // Suggest chain if we don't have
  await addTestNet()
  await addMainNet()

  // Enable chain
  await opera.enable(CHAIN_ID!)

  // Setup signer
  const offlineSigner = await opera.getOfflineSigner(CHAIN_ID!)
  const accounts = await offlineSigner.getAccounts() // only one account currently supported by opera

  return [accounts, offlineSigner]
}

/**
 * @deprecated
 */
export const sendTransaction = async (
  client: SigningStargateClient,
  delegatorAddress: string,
  payload: any,
): Promise<any> => {
  try {
    const result = await client.signAndBroadcast(delegatorAddress, payload.msgs, payload.fee, payload.memo)
    return result
  } catch (e) {
    console.log('sendTransaction', e)
    throw e
  }
}

export function useOpera(chainId = CHAIN_ID): any {
  const getOpera = getJamboWallet
  const getKey = async (): Promise<any> => {
    try {
      const opera = getOpera()
      if (!opera) return undefined
      const key = await opera.getKey(chainId!)
      return key
    } catch (e) {
      return undefined
    }
  }
  const addChain = async (): Promise<boolean> => {
    try {
      const opera = getOpera()
      if (!opera) throw new Error('Opera not found')
      await opera.experimentalSuggestChain(CHAINS[chainId!])
      return true
    } catch (e) {
      console.error('useOpera', 'addChain', e)
      return false
    }
  }
  const connect = async (): Promise<boolean> => {
    try {
      const opera = getOpera()
      if (!opera) throw new Error('Unable to access the opera wallet')

      if (!chainId) throw new Error('Chain Id is undefined')

      await addChain()
      await opera.enable(chainId)
      return true
    } catch (e) {
      console.error('useOpera', 'connect', e)
      return false
    }
  }
  const getOfflineSigner = (): any => {
    const opera = getOpera()
    if (!opera) return undefined
    const offlineSigner = opera.getOfflineSigner(chainId!)
    return offlineSigner
  }

  return {
    getOpera,
    getKey,
    connect,
    getOfflineSigner,
  }
}
