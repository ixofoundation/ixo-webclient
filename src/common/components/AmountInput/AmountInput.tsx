import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import {
  AmountInputWrapper,
  IconWrapper,
  InputWrapper,
  MemoInputWrapper,
} from './AmountInput.styles'

import MemoEditIcon from 'assets/images/modal/memoedit.svg'
import MemoCheckIcon from 'assets/images/modal/memocheck.svg'
import MemoDoneIcon from 'assets/images/modal/memodone.svg'

interface Props {
  amount: number
  memo: string
  disable?: boolean
  suffix: string
  handleAmountChange: (event: any) => void
  handleMemoChange: (event: any) => void
  handleMemoEdit: (event: boolean) => void
}

const AmountInput: React.FunctionComponent<Props> = ({
  amount,
  memo,
  disable = false,
  suffix,
  handleAmountChange,
  handleMemoChange,
  handleMemoEdit,
}) => {
  const [editState, setEditState] = useState('nomemo')

  const handleAction = (): void => {
    switch (editState) {
      case 'nomemo':
        setEditState('memoedit')
        break
      case 'memoedit':
        setEditState('nomemo')
        break
      case 'memowith':
        setEditState('memodone')
        break
      case 'memodone':
        // setEditState('memowith')
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (memo.length > 0) {
      setEditState('memowith')
    }
  }, [memo])

  useEffect(() => {
    if (editState === 'memoedit' || editState === 'memowith') {
      handleMemoEdit(true)
    } else {
      handleMemoEdit(false)
    }
  }, [editState])

  return (
    <AmountInputWrapper className={cx({'disable': disable})}>
      {(!disable && amount > 0) && (
        <IconWrapper onClick={handleAction}>
          <img
            src={
              editState === 'memodone'
                ? MemoDoneIcon
                : editState === 'memowith'
                ? MemoCheckIcon
                : MemoEditIcon
            }
            alt="memo icon"
          />
        </IconWrapper>
      )}

      {!disable && (editState === 'nomemo' || editState === 'memodone') && (
        <InputWrapper>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder={'Amount'}
            step="0.000001"
          />
        </InputWrapper>
      )}

      {!disable && (editState === 'memoedit' || editState === 'memowith') && (
        <MemoInputWrapper>
          <input
            value={memo}
            onChange={handleMemoChange}
            placeholder={'(Optional) Start typing a public Tx Memo...'}
          />
        </MemoInputWrapper>
      )}

      {disable && (
        <InputWrapper style={{pointerEvents: 'none'}}>
          <input
            type="text"
            value={amount + ' ' + suffix}
          />
        </InputWrapper>
      )}
    </AmountInputWrapper>
  )
}

export default AmountInput
