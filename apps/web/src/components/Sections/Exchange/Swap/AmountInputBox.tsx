import React from 'react'
import cx from 'classnames'
import BigNumber from 'bignumber.js'


import {
  AmountInputBoxWrapper,
  AmountInputBoxBody,
  BlueText,
  GrayText,
  WhiteText,
  AssetIcon,
  CurrencyFormat,
  DropDownIcon,
} from './AmountInputBox.styles'
import { displayTokenAmount } from 'utils/currency'
import { AssetType } from 'redux/configs/configs.types'

const decimals = 2

interface Props {
  currency: AssetType | undefined
  isSelected: boolean
  isFromToken: boolean
  isTriangle?: boolean

  usdRate: number
  balance: string
  amount: BigNumber
  className?: string
  handleAmountChange?: (value: string | BigNumber) => void
  handleAssetSelect: () => void
  handleFocused: () => void
  isLayout?: boolean
  displayType?: 'text' | 'input'
}

const AmountInputBox: React.FC<Props> = ({
  currency,
  isSelected,
  isFromToken,
  isTriangle = true,
  usdRate,
  amount = '0',
  balance = '0',
  handleAmountChange,
  handleAssetSelect,
  handleFocused,
  className = '',
  isLayout = true,
  displayType,
}): JSX.Element => {
  const usdAmount = new BigNumber(amount).times(new BigNumber(usdRate))

  const renderBody = (): JSX.Element => (
    <AmountInputBoxBody>
      <div className='d-flex align-items-center justify-content-between'>
        <div
          className='d-flex align-items-center'
          onClick={handleAssetSelect}
          style={{ gap: '7px', cursor: 'pointer' }}
        >
          {currency ? (
            <>
              <AssetIcon src={currency.logoURIs.png} alt='' />
              <WhiteText fontWeight={500} fontSize='18px' lineHeight='18px'>
                {currency.symbol}
              </WhiteText>
            </>
          ) : (
            <WhiteText fontWeight={500} fontSize='18px' lineHeight='18px'>
              Select an Asset
            </WhiteText>
          )}
          <DropDownIcon className={cx({ reverse: !isLayout })} src={ChevDownIcon} alt='' />
        </div>
        {currency && (
          <div className='d-flex align-items-center' style={{ gap: '7px' }}>
            <GrayText fontSize='14px' lineHeight='16px' fontWeight={400}>
              {displayTokenAmount(new BigNumber(balance), decimals)}
            </GrayText>
            {isFromToken && (
              <BlueText
                fontSize='14px'
                lineHeight='16px'
                fontWeight={400}
                onClick={(): void => handleAmountChange && handleAmountChange(balance)}
              >
                Max
              </BlueText>
            )}
          </div>
        )}
      </div>
      <div className='d-flex align-items-center'>
        <CurrencyFormat
          value={new BigNumber(amount).toNumber() === 0 ? '0' : new BigNumber(amount).toString()}
          thousandSeparator
          placeholder='Amount'
          decimalScale={decimals}
          prefix={isFromToken ? '' : '≈ '}
          onValueChange={({ value }: any): void => handleAmountChange && handleAmountChange(value)}
          displayType={displayType}
          max={balance}
        />
      </div>
      <div className='d-flex align-items-center justify-content-end'>
        {currency && isFromToken && (
          <WhiteText fontSize='14px' lineHeight='16px' fontWeight={400}>
            ≈ ${displayTokenAmount(new BigNumber(usdAmount), decimals)}
          </WhiteText>
        )}
        {currency && !isFromToken && (
          <WhiteText fontSize='14px' lineHeight='16px' fontWeight={400}>
            ≈ ${usdRate.toFixed(decimals)} per {currency.symbol}
          </WhiteText>
        )}
        {!currency && (
          <WhiteText fontSize='14px' lineHeight='16px' fontWeight={400}>
            &nbsp;
          </WhiteText>
        )}
      </div>
    </AmountInputBoxBody>
  )

  if (!isLayout) {
    return renderBody()
  }

  return (
    <AmountInputBoxWrapper isSelected={isSelected} onClick={handleFocused} className={className}>
      {renderBody()}
      {currency && isFromToken && isSelected && isTriangle && <div className='triangle-left' />}
      {currency && !isFromToken && isSelected && isTriangle && <div className='triangle-right' />}
    </AmountInputBoxWrapper>
  )
}

export default AmountInputBox
