import React from 'react'

import { SubmitButton, Stat } from './Swap.styles'

import * as _ from 'lodash'
import Tooltip from 'components/Tooltip/Tooltip'

export type RenderSwapDetailProps = {
  handleSubmit: () => void
  canSubmit?: boolean
  swapErrorMsg: string
  networkName: string
  swapError: boolean
  slippage: number | string
}

const RenderSwapDetail = ({
  handleSubmit,
  canSubmit,
  swapError,
  swapErrorMsg,
  slippage,
  networkName,
}: RenderSwapDetailProps): JSX.Element => (
  <>
    <SubmitButton className='mb-2' onClick={handleSubmit} disabled={!canSubmit}>
      {swapErrorMsg}
    </SubmitButton>
    <div className='px-2'>
      <Stat className='mb-1'>
        <span>Network:</span>
        <span>{networkName}</span>
      </Stat>
      <Stat className='mb-1'>
        <span>Transaction Fee:</span>
        <span>0.33% (0.12 ATOM) ≈ $1.49</span>
      </Stat>
      <Stat className='mb-1' warning={swapError}>
        <Tooltip text={swapError ? `Exceeds My Maximum of ${slippage}%` : ``}>
          <span>Estimated Slippage:</span>
        </Tooltip>
        <Tooltip text={swapError ? `Exceeds My Maximum of ${slippage}%` : ``}>
          <span>{slippage} %</span>
        </Tooltip>
      </Stat>
    </div>
  </>
)

export default RenderSwapDetail
