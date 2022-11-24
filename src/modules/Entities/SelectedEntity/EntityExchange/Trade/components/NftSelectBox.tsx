import BigNumber from 'bignumber.js'
import cx from 'classnames'
import ChevDownIcon from 'assets/images/exchange/chev-down.svg'
import { displayTokenAmount } from 'common/utils/currency.utils'
import { Typography } from 'modules/App/App.styles'
import React from 'react'
import {
  AmountInputBoxWrapper as NftSelectBoxWrapper,
  AmountInputBoxBody as NftSelectBoxBody,
  AssetIcon as NftIcon,
  DropDownIcon,
} from './AmountInputBox.styles'
import { thousandSeparator } from 'common/utils/formatters'

const decimals = 2

interface Props {
  isSelected: boolean
  asset: any //  TODO: type should be defined
  price: number
  remainings: number
  totals: number
  className?: string
  isLayout?: boolean
  handleFocused: () => void
  handleSelect: () => void
}

const NftSelectBox: React.FC<Props> = ({
  isSelected,
  asset,
  price,
  remainings,
  totals,
  className = '',
  isLayout = true,
  handleFocused,
  handleSelect,
}): JSX.Element => {
  const renderBody = (): JSX.Element => (
    <NftSelectBoxBody>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center' style={{ gap: 5, cursor: 'pointer' }} onClick={handleSelect}>
          {asset ? (
            <>
              <NftIcon width={40} height={40} src={asset.image} alt='' />
              <div className='d-flex flex-column' style={{ width: '115px' }}>
                <Typography color={'white'} fontSize={'18px'} lineHeight={'21px'} fontWeight={500} className='name'>
                  {asset.symbol}
                </Typography>
                <Typography color={'white'} fontSize={'14px'} lineHeight={'22px'} fontWeight={400}>
                  {thousandSeparator(remainings, ',')} of {thousandSeparator(totals, ',')}
                </Typography>
              </div>
            </>
          ) : (
            <Typography color={'white'} fontSize={'18px'} lineHeight={'21px'} fontWeight={500}>
              Select an impact token
            </Typography>
          )}

          <DropDownIcon className={cx({ reverse: !isLayout })} src={ChevDownIcon} alt='' />
        </div>
        {asset && (
          <Typography color={'white'} fontSize={'24px'} lineHeight={'28px'} fontWeight={700}>
            ${displayTokenAmount(new BigNumber(price), decimals)}
          </Typography>
        )}
      </div>
    </NftSelectBoxBody>
  )

  if (!isLayout) {
    return renderBody()
  }
  return (
    <NftSelectBoxWrapper isSelected={isSelected} onClick={handleFocused} className={className}>
      {renderBody()}
      {asset && isSelected && <div className='triangle-left' />}
    </NftSelectBoxWrapper>
  )
}

export default NftSelectBox
