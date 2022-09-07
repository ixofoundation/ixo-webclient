import React from 'react'
import { AssetType } from 'states/configs/configs.types'
import {
  AmountInputBoxWrapper as NftBoxWrapper,
  AmountInputBoxBody as NftBoxBody,
} from './AmountInputBox.styles'

interface Props {
  isSelected: boolean
  asset: AssetType
  price: number
  remaining: number
  total: number
  className?: string
  isLayout?: boolean
  handleFocused: () => void
}

const NftBox: React.FC<Props> = ({
  isSelected,
  asset,
  price,
  remaining,
  total,
  className = '',
  isLayout = true,
  handleFocused,
}): JSX.Element => {
  const renderBody = (): JSX.Element => (
    <NftBoxBody>
      <div className="d-flex align-items-center justify-content-between"></div>
    </NftBoxBody>
  )

  if (!isLayout) {
    return renderBody()
  }
  return (
    <NftBoxWrapper
      isSelected={isSelected}
      onClick={handleFocused}
      className={className}
    >
      {renderBody()}
      {asset && isSelected && <div className="triangle-left" />}
    </NftBoxWrapper>
  )
}

export default NftBox
