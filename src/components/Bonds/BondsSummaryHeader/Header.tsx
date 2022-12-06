import HeaderItem from './SummaryCard/SummaryCard'
import { deviceWidth } from 'constants/device'
import styled from 'styled-components'
import { BondStateType } from 'redux/bond/bond.types'
import { convertDecCoinToCoin, percentFormat, toFixed } from 'utils/currency'
import { useEffect, useMemo, useState } from 'react'
import { Coin } from '@cosmjs/proto-signing'
import { GetCurrentPrice } from 'lib/protocol'
import { useIxoConfigs } from 'hooks/configs'
import { useSelectedEntity } from 'hooks/entity'
import { theme } from 'components/App/App.styles'
import { useAccount } from 'hooks/account'
import { FunctionParam } from '@ixo/impactxclient-sdk/types/codegen/ixo/bonds/v1beta1/bonds'

const StyledHeader = styled.header`
  margin: 1.25rem 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  @media (min-width: ${deviceWidth.desktopLarge}px) {
    justify-content: flex-start;
  }
`

interface Props {
  isDark?: boolean
  selectedHeader: string
  setSelectedHeader: (header: string) => void
}

const Header: React.FC<Props> = ({ isDark, selectedHeader, setSelectedHeader }) => {
  const { bondDid, bondDetail, goal } = useSelectedEntity()
  const { balances } = useAccount()
  const { convertToDenom } = useIxoConfigs()
  const [currentPrice, setCurrentPrice] = useState<Coin | undefined>(undefined)
  const bondTokenBalance: Coin | undefined = useMemo(
    () => balances.find((item) => item.denom === bondDetail?.token),
    [balances, bondDetail?.token],
  )
  const currentSupply: Coin | undefined = useMemo(() => bondDetail?.currentSupply, [bondDetail?.currentSupply])
  const currentReserve: Coin | undefined = useMemo(() => bondDetail?.currentReserve[0], [bondDetail?.currentReserve])
  const reserveToken: string | undefined = useMemo(() => bondDetail?.reserveTokens[0], [bondDetail?.reserveTokens])
  const availableReserve: Coin | undefined = useMemo(
    () => bondDetail?.availableReserve[0],
    [bondDetail?.availableReserve],
  )
  const outcomePayment: string | undefined = useMemo(() => bondDetail?.outcomePayment, [bondDetail?.outcomePayment])
  const fundingTarget: number = useMemo(() => {
    let fundingTarget = 0
    try {
      fundingTarget = parseInt(goal.replace(/[^0-9]/g, ''))
    } catch (e) {
      fundingTarget = 0
    }
    return fundingTarget
  }, [goal])
  const initialRaised: string = useMemo(() => {
    const value = bondDetail?.functionParameters.find((item: FunctionParam) => item.param === 'd0')?.value
    return value ?? '0'
  }, [bondDetail?.functionParameters])
  const publicAlpha: string = useMemo(
    () => bondDetail?.functionParameters.find((item: FunctionParam) => item.param === 'publicAlpha')?.value ?? '0',
    [bondDetail?.functionParameters],
  )

  const myStakeInfo = useMemo(
    () =>
      `${percentFormat(bondTokenBalance?.amount ?? 0, currentSupply?.amount ?? 0, 2)} of ${toFixed(
        currentSupply?.amount,
        2,
      )}`,
    [bondTokenBalance, currentSupply],
  )
  const bondCapitalInfo = useMemo(
    () => `${percentFormat(currentReserve?.amount ?? 0, fundingTarget, 2)} of Funding Target`,
    [currentReserve, fundingTarget],
  )
  // TODO:
  const payoutInfo = useMemo(() => `${percentFormat(0, outcomePayment ?? 0, 0)} of Expected Payout`, [outcomePayment])
  const reserveInfo = useMemo(
    () => `${percentFormat(availableReserve?.amount ?? 0, currentReserve?.amount ?? 0, 2)} of Capital raise`,
    [availableReserve, currentReserve],
  )
  const alphaInfo = useMemo(
    () => `${percentFormat(currentSupply?.amount ?? 0, initialRaised, 2)} of ${initialRaised}`,
    [currentSupply, initialRaised],
  )

  useEffect(() => {
    const run = async () => {
      const res = await GetCurrentPrice(bondDid)
      if (res) {
        const { currentPrice } = res
        setCurrentPrice(convertToDenom(convertDecCoinToCoin(currentPrice[0])))
      }
    }
    if (bondDid) {
      run()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bondDid])

  return (
    <StyledHeader>
      <HeaderItem
        tokenType={reserveToken}
        title='Last Price'
        value={currentPrice?.amount}
        additionalInfo={`${currentPrice?.denom.toUpperCase()} per ${bondDetail?.token.toUpperCase()}`}
        priceColor={theme.ixoNewBlue}
        setActiveHeaderItem={(): void => setSelectedHeader('price')}
        selected={selectedHeader === 'price'}
        to={true}
        isDark={isDark}
      />
      <HeaderItem
        tokenType={bondDetail?.token}
        title='My Stake'
        value={bondTokenBalance?.amount}
        additionalInfo={myStakeInfo}
        priceColor='#6FCF97'
        setActiveHeaderItem={(): void => setSelectedHeader('stake')}
        selected={selectedHeader === 'stake'}
        to={true}
        isDark={isDark}
      />
      {bondDetail?.state !== BondStateType.SETTLED ? (
        <HeaderItem
          tokenType={reserveToken}
          title='Capital Raised'
          value={currentReserve?.amount}
          additionalInfo={bondCapitalInfo}
          priceColor={theme.ixoNewBlue}
          selected={selectedHeader === 'raised'}
          to={false}
          isDark={isDark}
        />
      ) : (
        <HeaderItem
          tokenType={reserveToken}
          title='Payout'
          value={outcomePayment}
          additionalInfo={payoutInfo}
          priceColor={theme.ixoNewBlue}
          selected={selectedHeader === 'raised'}
          to={false}
          isDark={isDark}
        />
      )}
      <HeaderItem
        tokenType={reserveToken}
        title='Reserve Funds'
        value={availableReserve?.amount}
        additionalInfo={reserveInfo}
        priceColor={theme.ixoNewBlue}
        setActiveHeaderItem={(): void => setSelectedHeader('reserve')}
        selected={selectedHeader === 'reserve'}
        to={true}
        isDark={isDark}
      />
      {bondDetail?.state === BondStateType.HATCH ? (
        <HeaderItem
          tokenType={bondDetail?.token}
          title='Required Hatch'
          value={currentSupply?.amount}
          additionalInfo={alphaInfo}
          selected={selectedHeader === 'alpha'}
          priceColor={theme.ixoNewBlue}
          to={false}
          isDark={isDark}
        />
      ) : (
        <HeaderItem
          title='Alpha'
          value={publicAlpha}
          decimals={2}
          additionalInfo={' '}
          selected={selectedHeader === 'alpha'}
          isAlpha={true}
          priceColor={theme.ixoNewBlue}
          // to={alphaHistory.length > 0} // TODO:
          to={false}
          setActiveHeaderItem={(): void => {
            // if (alphaHistory.length > 0) { // TODO:
            setSelectedHeader('alpha')
            // }
          }}
          isDark={isDark}
        />
      )}
    </StyledHeader>
  )
}

export default Header
