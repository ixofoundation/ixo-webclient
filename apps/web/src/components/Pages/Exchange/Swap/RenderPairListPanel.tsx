import React from 'react'

import { CardBody, CardHeader, CardHeaderText } from './Swap.styles'
import SelectTradeMethod from './SelectTradeMethod'
import RenderSettingsButton, { RenderSettingsButtonProps } from './RenderSettingsButton'
import PairListCard, { PairListCardProps } from './PairListCard'
import AmountInputBox from './AmountInputBox'
import { AssetType } from 'redux/configs/configs.types'
import BigNumber from 'bignumber.js'
import { Flex } from '@mantine/core'

export type RenderPairListPanelProps = RenderSettingsButtonProps &
  Omit<PairListCardProps, 'handleSelectToken'> & {
    panelHeight?: string
    setViewPairList: React.Dispatch<React.SetStateAction<PairListCardProps['viewPairList']>>
    setFromToken: (token: AssetType) => void
    setToToken: (token: AssetType) => void
    fromToken?: AssetType
    fromTokenSelected: boolean
    fromUSDRate: number
    fromAmount: BigNumber
    toToken?: AssetType
    toUSDRate: number
    toAmount: BigNumber
    fromTokenBalance: string
    toTokenBalance: string
    handleFromAmountChange: (value: any) => void
    handleToAmountChange?: (value: any) => void
    setFromTokenSelected: React.Dispatch<React.SetStateAction<boolean>>
  }
const RenderPairListPanel = ({
  viewSettings,
  setViewSettings,
  panelHeight = '420px',
  pairList,
  balances,
  viewPairList,
  setViewPairList,
  setFromToken,
  setToToken,
  fromAmount,
  fromTokenSelected,
  fromToken,
  fromTokenBalance,
  fromUSDRate,
  handleFromAmountChange,
  handleToAmountChange,
  setFromTokenSelected,
  toTokenBalance,
  toToken,
  toAmount,
  toUSDRate,
}: RenderPairListPanelProps): JSX.Element => (
  <Flex w='100%' direction='column'>
    <CardHeader>
      <CardHeaderText>
        <span>I want to&nbsp;</span>
        <SelectTradeMethod />
      </CardHeaderText>
      <RenderSettingsButton viewSettings={viewSettings} setViewSettings={setViewSettings} />
    </CardHeader>
    <CardBody height={panelHeight}>
      <PairListCard
        pairList={pairList}
        balances={balances}
        viewPairList={viewPairList}
        handleSelectToken={(currency): void => {
          setViewPairList('none')
          if (viewPairList === 'from') {
            setFromToken(currency as AssetType)
          } else if (viewPairList === 'to') {
            setToToken(currency as AssetType)
          }
        }}
      >
        {viewPairList === 'from' && (
          <AmountInputBox
            currency={fromToken}
            isSelected={fromTokenSelected}
            isFromToken={true}
            usdRate={fromUSDRate}
            amount={fromAmount}
            balance={fromTokenBalance}
            handleAmountChange={handleFromAmountChange}
            handleAssetSelect={(): void => setViewPairList('none')}
            handleFocused={(): void => setFromTokenSelected(true)}
            isLayout={false}
          />
        )}
        {viewPairList === 'to' && (
          <AmountInputBox
            currency={toToken}
            isSelected={!fromTokenSelected}
            isFromToken={false}
            usdRate={toUSDRate}
            amount={toAmount}
            balance={toTokenBalance}
            handleAmountChange={handleToAmountChange}
            handleAssetSelect={(): void => setViewPairList('none')}
            handleFocused={(): void => setFromTokenSelected(false)}
            isLayout={false}
          />
        )}
      </PairListCard>
    </CardBody>
  </Flex>
)

export default RenderPairListPanel
