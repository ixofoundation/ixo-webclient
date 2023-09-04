import React from 'react'

import { CardBody, CardHeader, CardHeaderText } from './Swap.styles'
import SelectTradeMethod from './SelectTradeMethod'
import RenderSettingsButton, { RenderSettingsButtonProps } from './RenderSettingsButton'
import PairListCard, { PairListCardProps } from './PairListCard'
import AmountInputBox from './AmountInputBox'
import { AssetType } from 'redux/configs/configs.types'
import BigNumber from 'bignumber.js'

export type RenderPairListPanelProps = RenderSettingsButtonProps &
  Omit<PairListCardProps, 'handleSelectToken'> & {
    panelHeight?: string
    setViewPairList: React.Dispatch<React.SetStateAction<PairListCardProps['viewPairList']>>
    setFromToken: React.Dispatch<React.SetStateAction<AssetType | undefined>>
    setToToken: React.Dispatch<React.SetStateAction<AssetType | undefined>>
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
    handleToAmountChange: (value: any) => void
    setFromTokenSelected: React.Dispatch<React.SetStateAction<boolean>>
  }
const RenderPairListPanel = ({
  viewSettings,
  setViewSettings,
  panelHeight,
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
  <>
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
          console.log({ currency })
          setViewPairList('none')
          if (viewPairList === 'from') {
            setFromToken(currency)
          } else if (viewPairList === 'to') {
            setToToken(currency)
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
  </>
)

export default RenderPairListPanel
