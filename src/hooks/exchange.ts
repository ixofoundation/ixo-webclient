import { ApiListedEntity } from 'api/blocksync/types/entities'
import BigNumber from 'bignumber.js'
import { Dictionary, mapValues, keyBy } from 'lodash'
import { useState, useEffect, useMemo } from 'react'
import { setInputAsset, setInputAssetUSDAmount, setOutputAsset } from 'redux/exchange/exchange.actions'
import { selectInputAsset, selectOutputAsset } from 'redux/exchange/exchange.selectors'
import { ExchangeAsset } from 'redux/exchange/exchange.types'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { BlockSyncService } from 'services/blocksync'
import { generateSwapTrx } from 'services/swap'
import { TokenSelect, TokenType } from 'types/swap'
import { getUSDRateByCoingeckoId } from 'utils/coingecko'
import {
  formatInputAmount,
  formatOutputAmount,
  getTokenBalances,
  getTokenTypeFromDenom,
  queryOutputAmount,
} from 'utils/swap'

type UseExchangeProps = {
  address: string
  setOutputAsset: React.Dispatch<React.SetStateAction<ExchangeAsset>>
  setInputAsset: React.Dispatch<React.SetStateAction<ExchangeAsset>>
}
export type SupportedDenoms = 'uixo' | 'carbon'
export type SupportedStandards = '20' | '1155'

const bsService = new BlockSyncService()

export const calculateBaseAmount = (amount: BigNumber, exponent: number) => {
  return amount.times(Math.pow(10, exponent))
}

export const calculateBaseDenomAmount = (amount: BigNumber, exponent: number) => {
  return amount.dividedBy(Math.pow(10, exponent))
}

function useExchange({ address }: UseExchangeProps) {
  const dispatch = useAppDispatch()
  const [balances, setBalances] = useState<Dictionary<string>>({})
  const [slippage] = useState<number>(3)
  const [chainId, setChainId] = useState(process.env.REACT_APP_CHAIN_ID)
  const [tokenBalances, setTokenBalances] = useState<any>([])

  const inputAsset = useAppSelector(selectInputAsset)
  const outputAsset = useAppSelector(selectOutputAsset)

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
    if (inputAsset.asset && inputAsset.asset.coingeckoid) {
      getUSDRateByCoingeckoId(inputAsset?.asset.coingeckoId).then((rate): void => {
        dispatch(setInputAssetUSDAmount(BigNumber(rate)))
      })
    }
  }, [inputAsset])

  useEffect(() => {
    if (balances && inputAsset?.asset?.base) {
      dispatch(setInputAsset({ balance: balances[inputAsset.asset.display as any] }))
    }
  }, [balances, inputAsset?.asset?.base])

  const getOutputAmount = async (inputAsset: ExchangeAsset) => {
    if (inputAsset.asset?.base) {
      const tokenType = getTokenTypeFromDenom(inputAsset.asset?.base)
      const queryType = tokenType === '1155' ? TokenType.Token1155 : TokenType.Cw1155

      const denomUnit = inputAsset.asset?.denomUnits?.find(
        (item: any) => item.denom.toLowerCase() === inputAsset.asset?.base?.toLowerCase(),
      )

      const baseUnitAmount = calculateBaseAmount(inputAsset.amount, denomUnit.exponent)

      return await queryOutputAmount(
        queryType,
        { single: baseUnitAmount.toString() },
        'ixo17srjznxl9dvzdkpwpw24gg668wc73val88a6m5ajg6ankwvz9wtsek9x34',
      ).then((value) => {
        if (tokenType === '1155') {
          console.log('1155 value ran')
          return calculateBaseDenomAmount(BigNumber(value), 6)
        } else {
          console.log('1155 nommer ran')

          return BigNumber(value)
        }
      })
    }
    return BigNumber(0)
  }

  useEffect(() => {
    // This is determined by the value of asset in respective liquidity pool
    if (inputAsset.amount.isGreaterThan(0) && outputAsset.asset?.base) {
      getOutputAmount(inputAsset).then((value) => dispatch(setOutputAsset({ amount: value })))
    }
  }, [inputAsset.amount, setOutputAsset, outputAsset.asset?.base])

  const [swapError, swapErrorMsg] = useMemo(() => {
    if (new BigNumber(inputAsset.amount).times((Number(slippage) + 100) / 100).isGreaterThan(1000)) {
      return [true, 'Price impact too high']
    }
    return [false, 'Review My Order']
  }, [inputAsset.amount, outputAsset.amount, slippage])

  const canSubmit = useMemo<boolean>(() => {
    return Boolean(
      new BigNumber(inputAsset.amount).isGreaterThan(new BigNumber(0)) &&
        new BigNumber(outputAsset.amount).isGreaterThan(new BigNumber(0)) &&
        !swapError,
    )
  }, [inputAsset.amount, outputAsset.amount, swapError])

  const setInputAssetEntity = (entityId: string) => {
    bsService.entity?.getEntityById(entityId).then((apiEntity: ApiListedEntity) => {
      dispatch(setInputAsset({ entity: apiEntity }))
    })
  }

  const setOutputAssetEntity = (entityId: string) => {
    bsService.entity?.getEntityById(entityId).then((apiEntity: ApiListedEntity) => {
      dispatch(setOutputAsset({ entity: apiEntity }))
    })
  }

  return {
    balances,
    slippage,
    chainId,
    setChainId,
    swapError,
    swapErrorMsg,
    canSubmit,
    setOutputAssetEntity,
    setInputAssetEntity,
    tokenBalances,
    inputAsset,
    outputAsset,
  }
}

export default useExchange
