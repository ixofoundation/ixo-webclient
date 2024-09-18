import { customQueries } from '@ixo/impactxclient-sdk'
import { GetTokenAsset } from 'lib/protocol'
import { useAccount } from 'hooks/account'
import { useEffect } from 'react'
import base58 from 'bs58'
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions'
import { NativeToken, TokenType } from 'types/tokens'
import { IxoCoinCodexRelayerApi } from 'hooks/configs'

const AccountUpdateService = (): JSX.Element | null => {
  const {
    address,
    balances,
    connectedWallet,
    updateBalances,
    updateNativeTokens,
    updateName,
    updateAddress,
    updatePubKey,
    chooseWallet,
    updateSigningClient,
    updateCosmWasmClient,
    updateDid,
  } = useAccount()

  useEffect(() => {
    let intervalId: number | null = null

    if (!address) {
      chooseWallet(undefined)
    } else {
      updateBalances()
      // Assign the setInterval return value and cast to 'number' for browser environments
      intervalId = setInterval(() => {
        updateBalances()
      }, 1000 * 60) as unknown as number
    }

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId)
        intervalId = null
      }
    }
    // eslint-disable-next-line
  }, [address])

  useEffect(() => {
    if (balances.length > 0) {
      const update = async () => {
        for (const balance of balances) {
          const { amount, denom } = balance

          const token = await GetTokenAsset(denom)
          if (!token) {
            continue
          }

          const tokenInfo = await customQueries.currency.findTokenInfoFromDenom(
            token.coinMinimalDenom,
            true,
            IxoCoinCodexRelayerApi,
          )

          const displayAmount = convertMicroDenomToDenomWithDecimals(amount, token.coinDecimals).toString()
          const payload: NativeToken = {
            type: TokenType.Native,
            balance: displayAmount,
            symbol: token.coinDenom,
            denomOrAddress: token.coinMinimalDenom,
            imageUrl: token.coinImageUrl!,
            decimals: token.coinDecimals,
            lastPriceUsd: tokenInfo?.lastPriceUsd,
          }
          updateNativeTokens({ [payload.denomOrAddress]: payload })
        }
      }

      update()
    }

    return () => {
      updateNativeTokens({})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balances, address])


  useEffect(() => {
    if (connectedWallet) {
      const { wallet, name, address, did, publicKey } = connectedWallet
      let pubKey: string

      if (typeof publicKey === 'string') {
        pubKey = base58.encode(new TextEncoder().encode(publicKey)) 
      } else if (publicKey instanceof Uint8Array) {
        pubKey = base58.encode(publicKey) 
      } else {
        pubKey = base58.encode(publicKey.data) 
      }

      updateName(name)
      updateAddress(address)
      updatePubKey(pubKey)
      updateDid(did)
      chooseWallet(wallet.type)
    } else {
      updateName('')
      updateAddress('')
      updatePubKey('')
      updateDid('')
      chooseWallet(undefined)
      updateSigningClient(undefined)
      updateCosmWasmClient(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedWallet])


  return null
}

export default AccountUpdateService
