import React from 'react'
import cx from 'classnames'
import {
  AmountInputWrapper,
  IconWrapper,
  InputWrapper,
  MemoInputWrapper,
  DisplayWrapper,
} from './AmountInput.styles'

import MemoEditIcon from 'assets/images/modal/memoedit.svg'
import MemoCheckIcon from 'assets/images/modal/memocheck.svg'
import MemoDoneIcon from 'assets/images/modal/memodone.svg'

interface Props {
  amount: number
  memo: string
  memoStatus: string
  disable?: boolean
  placeholder?: string
  suffix: string
  step?: number
  error?: boolean
  handleAmountChange: (event: any) => void
  handleMemoChange: (event: any) => void
  handleMemoStatus: (event: string) => void
}

const AmountInput: React.FunctionComponent<Props> = ({
  amount,
  memo,
  memoStatus,
  disable = false,
  suffix,
  placeholder = '',
  step = 0.000001,
  error = false,
  handleAmountChange,
  handleMemoChange,
  handleMemoStatus,
}) => {
  const handleAction = (): void => {
    switch (memoStatus) {
      case 'nomemo':
        handleMemoStatus('memoedit')
        break
      case 'memoedit':
        handleMemoStatus('nomemo')
        break
      case 'memowith':
        handleMemoStatus('memodone')
        break
      case 'memodone':
        handleMemoStatus('memowith')
        break
      default:
        break
    }
  }

  return (
    <AmountInputWrapper className={cx({ disable: disable, error: error })}>
      {!disable && memo !== null && amount > 0 && (
        <IconWrapper onClick={handleAction}>
          <img
            src={
              memoStatus === 'memodone'
                ? MemoDoneIcon
                : memoStatus === 'memowith'
                ? MemoCheckIcon
                : MemoEditIcon
            }
            alt="memo icon"
          />
        </IconWrapper>
      )}

      {!disable && (memoStatus === 'nomemo' || memoStatus === 'memodone') && (
        <InputWrapper>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder={placeholder}
            step={step}
            min={0}
          />
        </InputWrapper>
      )}

      {!disable && (memoStatus === 'memoedit' || memoStatus === 'memowith') && (
        <MemoInputWrapper>
          <input
            value={memo}
            onChange={handleMemoChange}
            placeholder={'(Optional) Start typing a public Tx Memo...'}
          />
        </MemoInputWrapper>
      )}

      {disable && (
        <>
          {memo && (
            <IconWrapper style={{ opacity: '50%' }}>
              <img src={MemoDoneIcon} alt="memo icon" />
            </IconWrapper>
          )}
          <DisplayWrapper style={{ pointerEvents: 'none' }}>
            {amount + ' ' + suffix}
            {memo && <span>&nbsp;&nbsp;({memo})</span>}
          </DisplayWrapper>
        </>
      )}
    </AmountInputWrapper>
  )
}

export default AmountInput
