import Axios from 'axios'
import { pubkeyType } from '@cosmjs/amino'
import { Bech32, fromBase64, toBase64 } from '@cosmjs/encoding'
import * as Toast from 'common/utils/Toast'
import * as base58 from 'bs58'
import { sha256 } from '@cosmjs/crypto'
import keysafe from 'common/keysafe/keysafe'
import { sortObject } from './transformationUtils'
import { RootState } from 'redux/types'
import { useSelector } from 'react-redux'
import { DidDoc } from 'redux/account/account.types'
import { AccountData, DirectSignResponse, OfflineDirectSigner } from '@cosmjs/proto-signing'
import { SignDoc } from 'cosmjs-types/cosmos/tx/v1beta1/tx'

const BLOCKCHAIN_API = process.env.REACT_APP_GAIA_URL

export interface KeysafeInfo {
  name: string
  didDoc: DidDoc
}

export const hasKeysafeInstalled = (): boolean => !!keysafe

export const keysafeGetInfo = async (): Promise<KeysafeInfo | undefined> => {
  return new Promise((resolve) => {
    if (!hasKeysafeInstalled()) {
      Toast.errorToast(`Sign in with Keysafe!`)
      resolve(undefined)
    }
    keysafe.getInfo((error: any, response: KeysafeInfo) => {
      if (error || !response) {
        Toast.errorToast(error)
        resolve(undefined)
      } else {
        resolve(response)
      }
    })
  })
}

export const keysafeGetDidDocInfo = async (): Promise<DidDoc | undefined> => {
  return new Promise((resolve) => {
    if (!hasKeysafeInstalled()) {
      Toast.errorToast(`Sign in with Keysafe!`)
      resolve(undefined)
    }
    keysafe.getInfo((error: any, response: DidDoc) => {
      if (error || !response) {
        Toast.errorToast(error)
        resolve(undefined)
      } else {
        resolve(response)
      }
    })
  })
}

export const keysafePopup = (): void => {
  if (!hasKeysafeInstalled()) {
    Toast.errorToast(`Install Keysafe!`)
    return
  }
  keysafe.popupKeysafe()
}

export const keysafeRequestSigning = async (data: any): Promise<any> => {
  return new Promise((resolve) => {
    if (!hasKeysafeInstalled()) {
      resolve({ error: 'Sign in with Keysafe!' })
    }
    keysafe.requestSigning(
      JSON.stringify(sortObject(data)),
      (error: any, signature: any) => {
        if (error || !signature) {
          resolve({ error })
        } else {
          resolve({ signature })
        }
      },
      'base64',
    )
  })
}

export const createSignature = async (payload: any): Promise<Uint8Array> => {
  return new Promise((resolve) => {
    keysafe.requestSigning(
      JSON.stringify(sortObject(payload)),
      async (error: any, signature: any) => {
        if (error || !signature) {
          resolve(new Uint8Array())
        } else {
          resolve(fromBase64(signature.signatureValue))
        }
      },
      'base64',
    )
  })
}

export const getAddressFromPubKey = (pubKey: string): string => {
  return Bech32.encode('ixo', sha256(base58.decode(pubKey)).slice(0, 20))
}

function encodeEd25519Pubkey(pubkey: any): any {
  return {
    type: pubkeyType.ed25519,
    value: toBase64(pubkey),
  }
}
function encodeEd25519Signature(pubkey: any, signature: any): any {
  if (signature.length !== 64) {
    throw new Error(
      'Signature must be 64 bytes long. Cosmos SDK uses a 2x32 byte fixed length encoding for the Ed25519 signature integers r and s.',
    )
  }
  return {
    pub_key: encodeEd25519Pubkey(pubkey),
    signature: toBase64(signature),
  }
}

/**
 * @deprecated
 */
export const broadCastMessage = (
  userInfo: any,
  userSequence: number,
  userAccountNumber: number,
  msgs: any[],
  memo = '',
  fee: any,
  callback: any,
): void => {
  const payload = {
    msgs,
    chain_id: process.env.REACT_APP_CHAIN_ID,
    fee,
    memo,
    account_number: String(userAccountNumber),
    sequence: String(userSequence),
  }

  // @ts-ignore
  const pubKey = base58.decode(userInfo.didDoc.pubKey).toString('base64')

  keysafe.requestSigning(
    JSON.stringify(sortObject(payload)),
    (error: any, signature: any) => {
      if (error) {
        Toast.errorToast(`Transaction Failed`)
        callback(null)
        return
      }
      Axios.post(`${BLOCKCHAIN_API}/txs`, {
        tx: {
          msg: payload.msgs,
          fee: payload.fee,
          signatures: [
            {
              account_number: payload.account_number,
              sequence: payload.sequence,
              signature: signature.signatureValue,
              pub_key: {
                type: 'tendermint/PubKeyEd25519',
                value: pubKey,
              },
            },
          ],
          memo: '',
        },
        mode: 'sync',
      })
        .then((response) => {
          if (response.data.txhash) {
            if (response.data.code === 4) {
              Toast.errorToast(`Transaction Failed`)
              callback(null)
              return
            }
            Toast.successToast(`Transaction Successful`)
            callback(response.data.txhash)
            return
          }

          Toast.errorToast(`Transaction Failed`)
        })
        .catch(() => {
          Toast.errorToast(`Transaction Failed`)
          callback(null)
        })
    },
    'base64',
  )
}

/**
 * @deprecated
 */
export const useKeysafe = (): any => {
  const {
    userInfo,
    address,
    sequence: userSequence,
    accountNumber: userAccountNumber,
  } = useSelector((state: RootState) => state.account)

  const defaultFee = {
    amount: [{ amount: String(5000), denom: 'uixo' }],
    gas: String(200000),
  }

  const sendTransactionUpdate = async (msgs: any[], fee = defaultFee, memo = ''): Promise<string | null> => {
    try {
      const response = await Axios.get(`${BLOCKCHAIN_API}/auth/accounts/${address}`)
      const { account_number, sequence, public_key } = response.data.result.value
      const payload = {
        msgs,
        chain_id: process.env.REACT_APP_CHAIN_ID,
        fee,
        memo,
        account_number,
        sequence,
      }
      const { error, signature } = await keysafeRequestSigning(payload)
      if (error || !signature) {
        // eslint-disable-next-line
        throw `Error while signing keysafe`
      }
      const txsResponse = await Axios.post(`${BLOCKCHAIN_API}/txs`, {
        tx: {
          msg: payload.msgs,
          fee: payload.fee,
          signatures: [
            {
              account_number: payload.account_number,
              sequence: payload.sequence,
              signature: signature.signatureValue,
              pub_key: public_key,
            },
          ],
          memo: '',
        },
        mode: 'block',
      })

      if (txsResponse.data.code === 4) {
        // eslint-disable-next-line
        throw `Transaction Failed`
      }
      if (!txsResponse.data.txhash) {
        // eslint-disable-next-line
        throw `Transaction Failed`
      }
      Toast.successToast(`Transaction Successful`)
      return txsResponse.data.txhash
    } catch (e) {
      Toast.errorToast(`Transaction Failed`)
      return null
    }
  }

  const sendTransaction = (msgs: any[], memo = '', fee = defaultFee): Promise<string | null> => {
    return new Promise((resolve) => {
      const payload = {
        msgs,
        chain_id: process.env.REACT_APP_CHAIN_ID,
        fee,
        memo,
        account_number: String(userAccountNumber),
        sequence: String(userSequence),
      }
      // @ts-ignore
      const pubKey = base58.decode(userInfo.didDoc.pubKey).toString('base64')
      keysafe.requestSigning(
        JSON.stringify(sortObject(payload)),
        (error: any, signature: any) => {
          if (error) {
            Toast.errorToast(`Transaction Failed`)
            resolve(null)
            return
          }
          Axios.post(`${BLOCKCHAIN_API}/txs`, {
            tx: {
              msg: payload.msgs,
              fee: payload.fee,
              signatures: [
                {
                  account_number: payload.account_number,
                  sequence: payload.sequence,
                  signature: signature.signatureValue,
                  pub_key: {
                    type: 'tendermint/PubKeyEd25519',
                    value: pubKey,
                  },
                },
              ],
              memo: '',
            },
            mode: 'sync',
          })
            .then((response) => {
              if (response.data.txhash) {
                if (response.data.code === 4) {
                  Toast.errorToast(`Transaction Failed`)
                  resolve(null)
                  return
                }
                Toast.successToast(`Transaction Successful`)
                resolve(response.data.txhash)
                return
              }

              Toast.errorToast(`Transaction Failed`)
            })
            .catch((e) => {
              console.log(e)

              Toast.errorToast(`Transaction Failed`)
              resolve(null)
            })
        },
        'base64',
      )
    })
  }

  return { sendTransaction, sendTransactionUpdate }
}

export function useIxoKeysafe(): any {
  const getKeysafe = (): any => {
    if (typeof window !== 'undefined' && window['ixoKs']) return new window['ixoKs']()
    return undefined
  }
  const getAccounts = async (): Promise<readonly AccountData[]> => {
    const keysafeInfo = await keysafeGetInfo()
    const { didDoc } = keysafeInfo!
    const pubKey = didDoc?.pubKey

    if (!pubKey) {
      return []
    }
    const address = getAddressFromPubKey(pubKey)
    return [
      {
        address: address,
        algo: 'secp256k1',
        pubkey: fromBase64(pubKey),
      },
    ]
  }
  const signDirect = async (address: string, signDoc: SignDoc): Promise<DirectSignResponse> => {
    const keysafeInfo = await keysafeGetInfo()
    const pubKey = keysafeInfo?.didDoc?.pubKey
    // const signature = await createSignature(messages)
    const signature = new Uint8Array() // TODO:
    const signatureBytes = new Uint8Array(signature.slice(0, 64))
    const stdSignature = encodeEd25519Signature(pubKey, signatureBytes)
    return {
      signed: signDoc,
      signature: stdSignature,
    }
  }

  const getOfflineSigner = async (): Promise<OfflineDirectSigner | null> => {
    const keysafe = getKeysafe()
    if (!keysafe) return null
    const offlineSigner: OfflineDirectSigner = { getAccounts, signDirect }
    return offlineSigner
  }

  const connect = async (): Promise<boolean> => {
    keysafePopup()
    // TODO:
    return true
  }

  return {
    getKeysafe,
    connect,
    getOfflineSigner,
  }
}
