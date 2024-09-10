import React from 'react'

import { SwapButton } from './Swap.styles'

import SwapIcon from 'assets/images/exchange/swap.svg?url'

export type RenderSwapButtonProps = {
  handleSwapClick: () => void
}
const RenderSwapButton = ({ handleSwapClick }: RenderSwapButtonProps): JSX.Element => (
  <SwapButton className='d-flex justify-content-center align-itmes-center' onClick={handleSwapClick}>
    <img src={SwapIcon} alt='' />
  </SwapButton>
)

export default RenderSwapButton
