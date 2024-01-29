import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { SigningStargateClient } from '@ixo/impactxclient-sdk'
import {
  selectAccountSelectedWallet,
  selectAccountAddress,
  selectAccountSigningClient,
  selectAccountPubKey,
  selectAccountKeyType,
  selectAccountDid,
  selectAccountBalances,
  selectAccountName,
  selectAccountRegistered,
  selectAccountCosmWasmClient,
  selectAccountCWClient,
  selectAccountFunded,
  selectAccountCw20Tokens,
  selectAccountNativeTokens,
  selectAccountConnectedWallet,
} from 'redux/account/account.selectors'
import { decode } from 'bs58'
import {
  chooseWalletAction,
  connectAction,
  disconnectAction,
  updateAddressAction,
  updateBalancesAction,
  updateCosmWasmAction,
  updateCw20TokensAction,
  updateCWClientAction,
  updateDidAction,
  updateNameAction,
  updateNativeTokensAction,
  updatePubKeyAction,
  updateRegisteredAction,
  updateSigningClientAction,
} from 'redux/account/account.actions'
import {
  GetBalances,
  GetDelegationTotalRewards,
  GetDelegatorDelegations,
  GetDelegatorUnbondingDelegations,
  GetDelegatorValidators,
  KeyTypes,
  TSigner,
} from 'lib/protocol'
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin'
import { SigningCosmWasmClient, CosmWasmClient } from '@ixo/impactxclient-sdk/node_modules/@cosmjs/cosmwasm-stargate'
import { ConnectedWallet, WalletType } from 'types/wallet'
import { Cw20Token, NativeToken } from 'types/tokens'
import { WALLET_STORE_LOCAL_STORAGE_KEY, useIxoConfigs } from './configs'
import { useWallet } from '@ixo-webclient/wallet-connector'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { convertDecCoinToCoin, plus } from 'utils/currency'
import { convertMicroDenomToDenomWithDecimals } from 'utils/conversions'
import { NATIVE_DECIMAL, NATIVE_MICRODENOM } from 'constants/chains'
import BigNumber from 'bignumber.js'

export function useAccount(): {
  selectedWallet: WalletType
  connectedWallet: ConnectedWallet | undefined
  address: string
  signingClient: SigningStargateClient
  cosmWasmClient: SigningCosmWasmClient
  cwClient: CosmWasmClient
  pubKey: string
  pubKeyUint8: Uint8Array | undefined
  keyType: KeyTypes
  did: string
  balances: Coin[]
  displayBalances: Coin[]
  nativeTokens: NativeToken[]
  cw20Tokens: Cw20Token[]
  name: string
  registered: boolean | undefined
  funded: boolean
  signer: TSigner
  connect: ({ impactXData }: { impactXData?: any }) => Promise<void>
  disconnect: () => void
  updateBalances: () => Promise<void>
  updateNativeTokens: (balances: { [denom: string]: NativeToken }) => void
  updateCw20Tokens: (balances: { [addr: string]: Cw20Token }) => void
  chooseWallet: (wallet: WalletType | undefined) => void
  updateSigningClient: (signingClient?: SigningStargateClient) => void
  updateCosmWasmClient: (cosmWasmClient?: SigningCosmWasmClient) => void
  updateCWClient: (cosmWasmClient: CosmWasmClient) => void
  updateRegistered: (registered: boolean) => void
  updateDid: (did: string) => void
  updatePubKey: (pubKey: string) => void
  updateAddress: (address: string) => void
  updateName: (name: string) => void
} {
  const dispatch = useAppDispatch()
  const { convertToDenom } = useIxoConfigs()
  const selectedWallet: WalletType = useAppSelector(selectAccountSelectedWallet)
  const connectedWallet: ConnectedWallet | undefined = useAppSelector(selectAccountConnectedWallet)
  const address: string = useAppSelector(selectAccountAddress)
  const signingClient: SigningStargateClient = useAppSelector(selectAccountSigningClient)
  const cosmWasmClient: SigningCosmWasmClient = useAppSelector(selectAccountCosmWasmClient)
  const cwClient: CosmWasmClient = useAppSelector(selectAccountCWClient)
  const pubKey: string = useAppSelector(selectAccountPubKey)
  const pubKeyUint8: Uint8Array | undefined = pubKey ? Uint8Array.from(decode(pubKey)) : undefined
  const keyType: KeyTypes = useAppSelector(selectAccountKeyType)
  const did: string = useAppSelector(selectAccountDid)
  const name: string = useAppSelector(selectAccountName)
  const balances: Coin[] = useAppSelector(selectAccountBalances)
  const displayBalances: Coin[] = balances.map((balance) => convertToDenom(balance)).filter(Boolean) as Coin[]
  const nativeTokens: NativeToken[] = useAppSelector(selectAccountNativeTokens)
  const cw20Tokens: Cw20Token[] = useAppSelector(selectAccountCw20Tokens)
  const registered: boolean | undefined = useAppSelector(selectAccountRegistered)
  const funded: boolean = useAppSelector(selectAccountFunded)
  const signer: TSigner = { address, did, pubKey: pubKeyUint8!, keyType }
  const { wallet, setWallet, disconnectWallet } = useWallet()

  useEffect(() => {
    if (wallet) {
      dispatch(connectAction(wallet as ConnectedWallet))
      localStorage.setItem(WALLET_STORE_LOCAL_STORAGE_KEY, JSON.stringify(wallet))
    } else {
      // check if current wallet in state
      const persistedWallet = localStorage.getItem(WALLET_STORE_LOCAL_STORAGE_KEY)
      console.log({persistedWallet})
      if (persistedWallet) {
        setWallet(JSON.parse(persistedWallet))
        dispatch(connectAction(JSON.parse(persistedWallet)))
      }
    }
  }, [wallet, dispatch, setWallet])

  const connect = async ({ impactXData }: { impactXData?: any }): Promise<void> => {
    console.log(impactXData)
  }

  const disconnect = (): void => {
    disconnectWallet()
    dispatch(disconnectAction())
    localStorage.removeItem(WALLET_STORE_LOCAL_STORAGE_KEY)
  }

  const updateBalances = async (): Promise<void> => {
    try {
      if (!address) {
        return
      }
      const balances = await GetBalances(address)
      dispatch(updateBalancesAction(balances))
    } catch (e) {
      console.error('updateBalances:', e)
    }
  }
  const updateCw20Tokens = (balances: { [addr: string]: Cw20Token }) => {
    dispatch(updateCw20TokensAction(balances))
  }
  const updateNativeTokens = (balances: { [denom: string]: NativeToken }) => {
    dispatch(updateNativeTokensAction(balances))
  }
  const chooseWallet = (wallet: WalletType | undefined): void => {
    dispatch(chooseWalletAction(wallet))
  }
  const updateSigningClient = (signingClient?: SigningStargateClient): void => {
    dispatch(updateSigningClientAction(signingClient!))
  }
  const updateCosmWasmClient = (cosmWasmClient?: SigningCosmWasmClient): void => {
    dispatch(updateCosmWasmAction(cosmWasmClient!))
  }
  const updateCWClient = (cosmWasmClient: CosmWasmClient): void => {
    dispatch(updateCWClientAction(cosmWasmClient))
  }
  const updateRegistered = (registered: boolean): void => {
    dispatch(updateRegisteredAction(registered))
  }
  const updateDid = (did: string): void => {
    dispatch(updateDidAction(did))
  }
  const updatePubKey = (pubKey: string): void => {
    dispatch(updatePubKeyAction(pubKey))
  }
  const updateAddress = (address: string): void => {
    dispatch(updateAddressAction(address))
  }
  const updateName = (name: string): void => {
    dispatch(updateNameAction(name))
  }

  return {
    selectedWallet,
    connectedWallet,
    address,
    signingClient,
    cosmWasmClient,
    cwClient,
    pubKey,
    pubKeyUint8,
    keyType,
    did,
    balances,
    displayBalances,
    nativeTokens,
    cw20Tokens,
    name,
    registered,
    funded,
    signer,
    connect,
    disconnect,
    updateBalances,
    updateNativeTokens,
    updateCw20Tokens,
    chooseWallet,
    updateSigningClient,
    updateCosmWasmClient,
    updateCWClient,
    updateRegistered,
    updateDid,
    updatePubKey,
    updateAddress,
    updateName,
  }
}

export function useSigner() {
  const address: string = useAppSelector(selectAccountAddress)
  const pubKey: string = useAppSelector(selectAccountPubKey)
  const pubKeyUint8: Uint8Array | undefined = pubKey ? Uint8Array.from(decode(pubKey)) : undefined
  const keyType: KeyTypes = useAppSelector(selectAccountKeyType)
  const did: string = useAppSelector(selectAccountDid)
  const signer: TSigner = { address, did, pubKey: pubKeyUint8!, keyType }

  return signer
}

export function useAccountStakedBalances() {
  const { address } = useAccount()
  const [stakedBalances, setStakedBalances] = useState<{
    [validatorAddr: string]: {
      name?: string
      address?: string
      delegation?: string
      unbonding?: string
      rewards?: string
    }
  }>({})

  const totalStakedBalance = useMemo(() => {
    return Object.values(stakedBalances)
      .map((balance) => plus(balance.delegation || '0', balance.unbonding || '0'))
      .reduce((pre, cur) => plus(pre, cur), '0')
  }, [stakedBalances])

  const update = useCallback(() => {
    GetDelegatorValidators(address).then((validators) => {
      validators.forEach((validator) => {
        const { description, operatorAddress } = validator
        if (operatorAddress) {
          setStakedBalances((pre) => ({
            ...pre,
            [operatorAddress]: {
              ...(pre[operatorAddress] ?? {}),
              name: description?.moniker || '',
              address: operatorAddress,
            },
          }))
        }
      })
    })
    GetDelegatorDelegations(address).then((delegationResponses) => {
      delegationResponses.forEach((response) => {
        const { balance, delegation } = response
        if (delegation && balance) {
          const { validatorAddress } = delegation
          if (validatorAddress) {
            setStakedBalances((pre) => ({
              ...pre,
              [validatorAddress]: {
                ...(pre[validatorAddress] ?? {}),
                delegation: convertMicroDenomToDenomWithDecimals(balance.amount, NATIVE_DECIMAL).toString(),
              },
            }))
          }
        }
      })
    })
    GetDelegatorUnbondingDelegations(address).then((unbondingResponses) => {
      unbondingResponses.forEach((response) => {
        const { validatorAddress, entries } = response
        const balance = entries.map((entry) => entry.balance).reduce((pre, cur) => plus(pre, cur), '0')
        if (validatorAddress) {
          setStakedBalances((pre) => ({
            ...pre,
            [validatorAddress]: {
              ...(pre[validatorAddress] ?? {}),
              unbonding: convertMicroDenomToDenomWithDecimals(balance, NATIVE_DECIMAL).toString(),
            },
          }))
        }
      })
    })
    GetDelegationTotalRewards(address).then((response) => {
      if (response) {
        const { rewards } = response
        rewards.forEach((item) => {
          const { validatorAddress, reward } = item
          const rewardDecCoin = reward.find(({ denom }) => denom === NATIVE_MICRODENOM)
          if (rewardDecCoin && validatorAddress) {
            const rewardCoin = convertDecCoinToCoin(rewardDecCoin)
            setStakedBalances((pre) => ({
              ...pre,
              [validatorAddress]: {
                ...(pre[validatorAddress] ?? {}),
                rewards: convertMicroDenomToDenomWithDecimals(rewardCoin.amount, NATIVE_DECIMAL).toString(),
              },
            }))
          }
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  useEffect(() => {
    update()
  }, [update])

  return { stakedBalances, totalStakedBalance }
}

export function useAccountUSDBalances() {
  const { nativeTokens } = useAccount()

  return useMemo(() => {
    return nativeTokens.reduce(
      (pre, cur) =>
        new BigNumber(pre).plus(new BigNumber(cur.balance).times(new BigNumber(cur.lastPriceUsd ?? 0))).toString(),
      '0',
    )
  }, [nativeTokens])
}
