import { customQueries } from '@ixo/impactxclient-sdk'
import BigNumber from 'bignumber.js'
import { useEffect, useMemo, useState } from 'react'
import { IxoCoinCodexRelayerApi, useIxoConfigs } from './configs'

export function useMapBondDetail(bondDetail: any) {
  const { convertToDenom } = useIxoConfigs()

  const {
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
  }
}
