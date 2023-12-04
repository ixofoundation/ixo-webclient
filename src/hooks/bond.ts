import { customQueries } from '@ixo/impactxclient-sdk'
import BigNumber from 'bignumber.js'
import { useEffect, useMemo, useState } from 'react'
import { IxoCoinCodexRelayerApi, useIxoConfigs } from './configs'
import { GetCurrentPrice } from 'lib/protocol'
import { convertDecCoinToCoin } from 'utils/currency'
import { Coin } from '@cosmjs/proto-signing'

export function useMapBondDetail(bondDetail: any) {
  const { convertToDenom } = useIxoConfigs()
  const [currentPrice, setCurrentPrice] = useState<Coin | undefined>(undefined)

  const {
    bondDid = '',
    state = '',
    token = '',
    reserveToken = '',
    currentSupply = 0,
    currentReserve = 0,
    availableReserve = 0,
    initialRaised = 0,
    publicAlpha = 0,
    outcomePayment = 0,
  } = useMemo(
    () => {
      const bondDid = bondDetail?.bondDid
      const state = bondDetail?.state
      const token = bondDetail?.token
      const reserveToken = convertToDenom({ denom: bondDetail?.reserveTokens[0], amount: '0' })?.denom
      const currentSupply = bondDetail?.currentSupply.amount
      const microCurrentReserve = bondDetail?.currentReserve[0]
      const currentReserve = convertToDenom(microCurrentReserve)?.amount
      const microAvailableReserve = bondDetail?.availableReserve[0]
      const availableReserve = convertToDenom(microAvailableReserve)?.amount
      const microInitialRaised = (bondDetail?.functionParameters ?? []).find((v: any) => v.param === 'd0')?.value
      const initialRaised = convertToDenom({ denom: bondDetail?.reserveTokens[0], amount: microInitialRaised })?.amount
      const publicAlpha = (bondDetail?.functionParameters ?? []).find((v: any) => v.param === 'publicAlpha')?.value
      const outcomePayment = bondDetail?.outcomePayment

      return {
        bondDid,
        state,
        token,
        reserveToken,
        currentSupply,
        currentReserve,
        availableReserve,
        initialRaised,
        publicAlpha,
        outcomePayment,
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bondDetail],
  )
  const [reserveTokenPriceUsd, setReserveTokenPriceUsd] = useState(0)
  const currentReserveUsd = useMemo(
    () => new BigNumber(reserveTokenPriceUsd).multipliedBy(new BigNumber(currentReserve)).toNumber(),
    [reserveTokenPriceUsd, currentReserve],
  )
  const initialRaisedUsd = useMemo(
    () => new BigNumber(reserveTokenPriceUsd).multipliedBy(new BigNumber(initialRaised)).toNumber(),
    [reserveTokenPriceUsd, initialRaised],
  )

  useEffect(() => {
    customQueries.currency.findTokenInfoFromDenom(reserveToken, true, IxoCoinCodexRelayerApi).then((response) => {
      const { lastPriceUsd = 0 } = response
      setReserveTokenPriceUsd(lastPriceUsd)
    })
  }, [reserveToken])

  useEffect(() => {
    const run = async () => {
      if (bondDid) {
        const res = await GetCurrentPrice(bondDid)
        if (res) {
          const { currentPrice } = res
          setCurrentPrice(convertToDenom(convertDecCoinToCoin(currentPrice[0])))
        }
      }
    }
    run()

    return () => {
      setCurrentPrice(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bondDid])

  return {
    state,
    token,
    reserveToken,
    currentSupply,
    currentReserve,
    currentReserveUsd,
    availableReserve,
    initialRaised,
    initialRaisedUsd,
    publicAlpha,
    outcomePayment,
    currentPrice,
  }
}
