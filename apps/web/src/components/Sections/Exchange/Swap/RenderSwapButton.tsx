import React from 'react'

import { SwapButton } from './Swap.styles'



export type RenderSwapButtonProps = {
  handleSwapClick: () => void
}
const RenderSwapButton = ({ handleSwapClick }: RenderSwapButtonProps): JSX.Element => (
  <SwapButton className='d-flex justify-content-center align-itmes-center' onClick={handleSwapClick}>
    <img src="/assets/images/exchange/swap.svg" alt='' />
  </SwapButton>
)

export default RenderSwapButton
