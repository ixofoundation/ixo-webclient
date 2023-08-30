import { CHAINS } from '../../constants/chains'
import { SigningStargateClient, createSigningClient } from '@ixo/impactxclient-sdk'

declare const window: any

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID
/**
 * @deprecated TODO: remove
 */
const GAIA_RPC = CHAINS[CHAIN_ID as string]?.rpc

/**
 * @deprecated
 */
const addTestNet = async (): Promise<any> => {
  if (CHAIN_ID) {
    await window.keplr.experimentalSuggestChain(CHAINS[CHAIN_ID])
  }
}

/**
 * @deprecated
 */
const addMainNet = async (): Promise<any> => {
  if (CHAIN_ID) {
    await window.keplr.experimentalSuggestChain(CHAINS[CHAIN_ID])
  }
}

/**
 * @deprecated
 */
export const checkExtensionAndBrowser = (): boolean => {
  if (typeof window !== `undefined`) {
    if (window.getOfflineSigner && window.keplr && window.keplr.experimentalSuggestChain) {
      return true
    } else {
      console.log('Keplr undefined', window)
    }
  } else {
    console.log('Window is undefined :|', window)
  }
  return false
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

  //   // Suggest chain if we don't have
  //   await addTestNet()
  //   await addMainNet()

  // Enable chain
  await window.keplr.enable(CHAIN_ID)

  // Setup signer
  const offlineSigner = window.getOfflineSigner(CHAIN_ID)
  const accounts = await offlineSigner.getAccounts() // only one account currently supported by keplr

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

export function useKeplr(chainId = CHAIN_ID): any {
  const getKeplr = (): any => {
    try {
      if (typeof window !== `undefined`) {
        if (window.getOfflineSigner && window.keplr && window.keplr.experimentalSuggestChain) {
          return window.keplr
        }
      }
      return undefined
    } catch (e) {
      return undefined
    }
  }
  const getKey = async (): Promise<any> => {
    const keplr = getKeplr()
    try {
      const key = await keplr?.getKey(chainId)
      return key
    } catch (e) {
      return undefined
    }
  }
  const addChain = async (): Promise<boolean> => {
    try {
      const keplr = getKeplr()
      await keplr?.experimentalSuggestChain(CHAINS[chainId!])
      return true
    } catch (e) {
      console.error('useKeplr', 'addChain', e)
      return false
    }
  }
  const connect = async (): Promise<boolean> => {
    try {
      const keplr = getKeplr()
      if (!keplr) {
        throw new Error('Install Keplr wallet extension')
      }
      if (!chainId) {
        throw new Error('Chain Id is undefined')
      }
      await addChain()
      await keplr.enable(chainId)
      return true
    } catch (e) {
      console.error('useKeplr', 'connect', e)
      return false
    }
  }
  const getOfflineSigner = (): any => window.getOfflineSigner(chainId)

  return {
    getKeplr,
    getKey,
    connect,
    getOfflineSigner,
  }
}
