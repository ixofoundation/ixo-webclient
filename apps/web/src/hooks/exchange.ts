import BigNumber from 'bignumber.js'
import { useGetEntityByIdLazyQuery } from 'graphql/entities'
import { Dictionary, mapValues, keyBy } from 'lodash'
import { useState, useEffect, useMemo } from 'react'
import {
  setInputAsset,
  setInputAssetEntity,
  setInputAssetUSDAmount,
  setOutputAsset,
  setOutputAssetEntity,
} from 'redux/exchange/exchange.actions'
import { selectInputAsset, selectOutputAsset, selectSlippage } from 'redux/exchange/exchange.selectors'
import { ExchangeAsset } from 'redux/exchange/exchange.types'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { TokenType } from 'types/swap'
import { getUSDRateByCoingeckoId } from 'utils/coingecko'
import { getTokenBalances, getTokenTypeFromDenom, queryOutputAmount } from 'utils/swap'

type UseExchangeProps = {
  address: string
  setOutputAsset: React.Dispatch<React.SetStateAction<ExchangeAsset>>
  setInputAsset: React.Dispatch<React.SetStateAction<ExchangeAsset>>
}
export type SupportedDenoms = 'uixo' | 'carbon'
export type SupportedStandards = '20' | '1155'

export const calculateBaseAmount = (amount: BigNumber, exponent: number) => {
  return amount.times(Math.pow(10, exponent))
}

export const calculateBaseDenomAmount = (amount: BigNumber, exponent: number) => {
  return amount.dividedBy(Math.pow(10, exponent))
}

function useExchange({ address }: UseExchangeProps) {
  const dispatch: any = useAppDispatch()
  const slippage = useAppSelector(selectSlippage)
  const [balances, setBalances] = useState<Dictionary<string>>({})
  const [chainId, setChainId] = useState(process.env.REACT_APP_CHAIN_ID)
  const [tokenBalances, setTokenBalances] = useState<any>([])

  const inputAsset = useAppSelector(selectInputAsset)
  const outputAsset = useAppSelector(selectOutputAsset)

  const { fetchEntityById: fetchInputEntityById, data: inputEntityData } = useGetEntityByIdLazyQuery()
  const { fetchEntityById: fetchOutputEntityById, data: outputEntityData } = useGetEntityByIdLazyQuery()

  useEffect(() => {
    if (address) {
      getTokenBalances({ accountAddress: address }).then((balances) => {
        const pairListBalances = mapValues(keyBy(balances, 'denom'), 'amount')
        setTokenBalances(balances)
        setBalances(pairListBalances)
      })
    }
  }, [address, setBalances])

  useEffect(() => {
    if (inputAsset.asset && inputAsset.asset?.coingeckoid) {
      getUSDRateByCoingeckoId(inputAsset.asset?.coingeckoId).then((rate): void => {
        dispatch(setInputAssetUSDAmount(BigNumber(rate)))
      })
    }
  }, [inputAsset.asset, dispatch])

  useEffect(() => {
    if (balances && inputAsset.asset?.base) {
      dispatch(setInputAsset({ balance: balances[inputAsset.asset?.display as any] }))
    }
  }, [balances, inputAsset.asset?.base, inputAsset.asset?.display, dispatch])

  useEffect(() => {
    if (inputAsset.usdAmount && outputAsset.usdAmount) {
      const outputAmount = inputAsset.usdAmount.multipliedBy(inputAsset.amount.dividedBy(outputAsset.usdAmount))

      dispatch(setOutputAsset({ amount: outputAmount }))
    }
  }, [inputAsset.usdAmount, outputAsset.usdAmount, dispatch, inputAsset.amount])

  const getOutputAmount = async (inputAsset: ExchangeAsset) => {
    if (inputAsset.asset?.base) {
      const tokenType = getTokenTypeFromDenom(inputAsset.asset?.base)
      const queryType = tokenType === '1155' ? TokenType.Token1155 : TokenType.Cw1155

      const denomUnit = inputAsset.asset?.denomUnits?.find(
        (item: any) => item.denom.toLowerCase() === inputAsset.asset?.base?.toLowerCase(),
      )

      const baseUnitAmount = calculateBaseAmount(inputAsset.amount, denomUnit?.exponent || 0)
      return await queryOutputAmount(
        queryType,
        { single: baseUnitAmount.toString() },
        'ixo1p5nwq2ut6344qwlvjv42ayqhvarl46lnqfmnrgjnh2cwahl54g2qpg4y8y',
      ).then((value) => {
        if (tokenType === '1155') {
          return calculateBaseDenomAmount(BigNumber(value), 6)
        } else {
          return BigNumber(value)
        }
      })
    }
    return BigNumber(0)
  }

  useEffect(() => {
    if (inputAsset.amount.isGreaterThan(0) && outputAsset.asset?.base) {
      getOutputAmount(inputAsset).then((value) => dispatch(setOutputAsset({ amount: value })))
    }
  }, [inputAsset, outputAsset.asset?.base, dispatch])

  useEffect(() => {
    if (inputEntityData) {
      dispatch(setInputAssetEntity(inputEntityData))
    }
  }, [dispatch, inputEntityData])

  useEffect(() => {
    if (outputEntityData) {
      dispatch(setOutputAssetEntity(outputEntityData))
    }
  }, [dispatch, outputEntityData])

  const [swapError, swapErrorMsg] = useMemo(() => {
    if (new BigNumber(inputAsset.amount).isGreaterThan(inputAsset.balance)) {
      return [true, 'Insufficient balance']
    }
    return [false, 'Review My Order']
  }, [inputAsset.amount, inputAsset.balance])

  const canSubmit = useMemo<boolean>(() => {
    return Boolean(
      new BigNumber(inputAsset.amount).isGreaterThan(new BigNumber(0)) &&
        new BigNumber(outputAsset.amount).isGreaterThan(new BigNumber(0)) &&
        !swapError,
    )
  }, [inputAsset.amount, outputAsset.amount, swapError])

  const getInputAssetEntity = (entityId: string) => {
    fetchInputEntityById(entityId)
  }

  const getOutputAssetEntity = (entityId: string) => {
    fetchOutputEntityById(entityId)
  }

  return {
    balances,
    slippage,
    chainId,
    setChainId,
    swapError,
    swapErrorMsg,
    canSubmit,
    getInputAssetEntity,
    getOutputAssetEntity,
    tokenBalances,
    inputAsset,
    outputAsset,
  }
}

export default useExchange
