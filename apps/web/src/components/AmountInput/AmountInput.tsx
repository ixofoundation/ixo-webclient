// AmountInput.tsx
import React from 'react'
import { Box, TextInput, NumberInput } from '@mantine/core'
import { useAmountInputStyles } from './AmountInput.styles'
import MemoEditIcon from '/public/assets/images/modal/memoedit.svg'
import MemoCheckIcon from '/public/assets/images/modal/memocheck.svg'
import MemoDoneIcon from '/public/assets/images/modal/memodone.svg'

interface Props {
  amount: number
  memo?: string
  memoStatus?: string
  disable?: boolean
  placeholder?: string
  suffix: string
  step?: number
  error?: boolean
  handleAmountChange: (value: number | '') => void
  handleMemoChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleMemoStatus?: (status: string) => void
}

const AmountInput: React.FC<Props> = ({
  amount,
  memo = null,
  memoStatus = 'nomemo',
  disable = false,
  suffix,
  placeholder = '',
  step = 0.000001,
  error = false,
  handleAmountChange,
  handleMemoChange,
  handleMemoStatus,
}) => {
  const { classes, cx } = useAmountInputStyles({ disabled: disable, error })

  const handleAction = (): void => {
    if (!handleMemoStatus) return
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

  const renderIcon = () => {
    if (!disable && memo !== null && amount > 0) {
      return (
        <Box className={classes.iconWrapper} onClick={handleAction}>
          <img
            src={memoStatus === 'memodone' ? MemoDoneIcon : memoStatus === 'memowith' ? MemoCheckIcon : MemoEditIcon}
            alt='memo icon'
          />
        </Box>
      )
    }
    return null
  }

  const renderInput = () => {
    if (!disable) {
      if (memoStatus === 'nomemo' || memoStatus === 'memodone') {
        return (
          <NumberInput
            value={amount}
            onChange={handleAmountChange}
            placeholder={placeholder}
            step={step}
            min={0}
            classNames={{ input: classes.input }}
            rightSection={renderIcon()}
          />
        )
      } else if (memoStatus === 'memoedit' || memoStatus === 'memowith') {
        return (
          <TextInput
            value={memo || ''}
            onChange={handleMemoChange}
            placeholder={'(Optional) Start typing a public Tx Memo...'}
            classNames={{ input: classes.memoInput }}
            rightSection={renderIcon()}
          />
        )
      }
    } else {
      return (
        <Box className={classes.displayWrapper} style={{ pointerEvents: 'none' }}>
          {amount + ' ' + suffix}
          {memo && <span>&nbsp;&nbsp;({memo})</span>}
        </Box>
      )
    }
  }

  return <Box className={cx(classes.amountInputWrapper, { disable, error })}>{renderInput()}</Box>
}

export default AmountInput
