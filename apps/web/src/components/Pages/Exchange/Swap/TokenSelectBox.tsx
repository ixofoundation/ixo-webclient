import BigNumber from 'bignumber.js'
import cx from 'classnames'
import ChevDownIcon from '/public/assets/images/icon-chev-down.svg'
import { displayTokenAmount } from 'utils/currency'
import { Typography } from 'components/App/App.styles'
import React from 'react'
import { AssetType } from 'redux/configs/configs.types'
import CashIcon from '/public/assets/images/assets/cash.svg'
import {
  AmountInputBoxWrapper as TokenSelectBoxWrapper,
  AmountInputBoxBody as TokenSelectBoxBody,
  AssetIcon as TokenIcon,
  DropDownIcon,
} from './AmountInputBox.styles'

const decimals = 2

interface Props {
  selectBoxType?: 'Asset' | 'CreditCard'
  isSelected: boolean
  asset?: AssetType
  price?: number
  usdRate?: number
  className?: string
  isLayout?: boolean
  handleFocused: () => void
  handleSelect: () => void
}

const TokenSelectBox: React.FC<Props> = ({
  isSelected,
  asset,
  price,
  usdRate,
  className = '',
  isLayout = true,
  selectBoxType = 'Asset',
  handleFocused,
  handleSelect,
}): JSX.Element => {
  const renderCreditCardBody = (): JSX.Element => (
    <TokenSelectBoxBody>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center' style={{ gap: 5, cursor: 'pointer' }} onClick={handleSelect}>
          <TokenIcon width={40} height={40} src={CashIcon} alt='' />
          <Typography color={'white'} fontSize={'18px'} lineHeight={'21px'} fontWeight={500}>
            Cash
          </Typography>
          <DropDownIcon className={cx({ reverse: !isLayout })} src={ChevDownIcon} alt='' />
        </div>
      </div>
    </TokenSelectBoxBody>
  )

  const renderAssetBody = (): JSX.Element => (
    <TokenSelectBoxBody>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center' style={{ gap: 5, cursor: 'pointer' }} onClick={handleSelect}>
          {asset ? (
            <>
              <TokenIcon width={40} height={40} src={asset.logoURIs.png} alt='' />
              <Typography color={'white'} fontSize={'18px'} lineHeight={'21px'} fontWeight={500}>
                {asset.symbol}
              </Typography>
            </>
          ) : (
            <Typography color={'white'} fontSize={'18px'} lineHeight={'21px'} fontWeight={500}>
              Select an Asset
            </Typography>
          )}

          <DropDownIcon className={cx({ reverse: !isLayout })} src={ChevDownIcon} alt='' />
        </div>
        {asset && price && usdRate && (
          <div className='d-flex flex-column' style={{ gap: 5 }}>
            <Typography>&nbsp;</Typography>
            <Typography color={'white'} fontSize={'24px'} lineHeight={'28px'} fontWeight={700}>
              {displayTokenAmount(new BigNumber(price).dividedBy(new BigNumber(usdRate)), decimals)}
            </Typography>
            <Typography color={'white'} fontSize={'14px'} lineHeight={'16px'} fontWeight={400}>
              ≈ ${displayTokenAmount(new BigNumber(price), decimals)}
            </Typography>
          </div>
        )}
      </div>
    </TokenSelectBoxBody>
  )

  const renderBody = (): JSX.Element => {
    switch (selectBoxType) {
      case 'Asset':
        return renderAssetBody()
      case 'CreditCard':
        return renderCreditCardBody()
      default:
        return <div />
    }
  }

  if (!isLayout) {
    return renderBody()
  }
  return (
    <TokenSelectBoxWrapper isSelected={isSelected} onClick={handleFocused} className={className}>
      {renderBody()}
    </TokenSelectBoxWrapper>
  )
}

export default TokenSelectBox
