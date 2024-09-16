import React from 'react'

import { CardBody, CardHeader, CardHeaderText } from './Swap.styles'

import RenderSwapDetail, { RenderSwapDetailProps } from 'components/Sections/Exchange/Swap/RenderSwapDetail'
import RenderSettingsButton, { RenderSettingsButtonProps } from './RenderSettingsButton'
import RenderSwapButton, { RenderSwapButtonProps } from './RenderSwapButton'
import SelectTradeMethod from './SelectTradeMethod'
import AmountInputBox from './AmountInputBox'
import { AssetType } from 'redux/configs/configs.types'
import BigNumber from 'bignumber.js'
import { Flex } from '@mantine/core'

type RenderSwapPanelProps = RenderSwapButtonProps &
  RenderSettingsButtonProps &
  RenderSwapDetailProps & {
    handleFromAmountChange: (value: string | BigNumber) => void
    setViewPairList: React.Dispatch<React.SetStateAction<'none' | 'from' | 'to'>>
    setFromTokenSelected: React.Dispatch<React.SetStateAction<boolean>>
    handleToAmountChange?: (value: any) => void
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
  }

const RenderSwapPanel = ({
  fromToken,
  fromTokenSelected,
  fromUSDRate,
  fromAmount,
  fromTokenBalance,
  handleFromAmountChange,
  setViewPairList,
  setFromTokenSelected,
  toToken,
  toUSDRate,
  toAmount,
  toTokenBalance,
  handleToAmountChange,
  networkName,
  slippage,
  swapError,
  swapErrorMsg,
  canSubmit,
  handleSubmit,
  viewSettings,
  setViewSettings,
  handleSwapClick,
}: RenderSwapPanelProps): JSX.Element => (
  <Flex w='100%' direction={'column'}>
    <CardHeader>
      <CardHeaderText>
        <span>I want to&nbsp;</span>
        <SelectTradeMethod />
      </CardHeaderText>
      <RenderSettingsButton viewSettings={viewSettings} setViewSettings={setViewSettings} />
    </CardHeader>
    <CardBody height={'auto'} className='mb-2'>
      <div className='position-relative'>
        <AmountInputBox
          currency={fromToken}
          isSelected={fromTokenSelected}
          isFromToken={true}
          usdRate={fromUSDRate}
          amount={fromAmount}
          balance={fromTokenBalance}
          handleAmountChange={handleFromAmountChange}
          handleAssetSelect={(): void => setViewPairList('from')}
          handleFocused={(): void => setFromTokenSelected(true)}
        />
        <div style={{ marginBottom: '10px' }} />
        <AmountInputBox
          currency={toToken}
          isSelected={!fromTokenSelected}
          isFromToken={false}
          usdRate={toUSDRate}
          amount={toAmount}
          balance={toTokenBalance}
          handleAmountChange={handleToAmountChange}
          handleAssetSelect={(): void => setViewPairList('to')}
          handleFocused={(): void => setFromTokenSelected(false)}
          displayType='text'
        />
        <RenderSwapButton handleSwapClick={handleSwapClick} />
      </div>
    </CardBody>

    <CardBody className='gap'>
      <RenderSwapDetail
        networkName={networkName}
        slippage={slippage}
        swapError={swapError}
        canSubmit={canSubmit}
        handleSubmit={handleSubmit}
        swapErrorMsg={swapErrorMsg}
      />
    </CardBody>
  </Flex>
)

export default RenderSwapPanel
