import React from 'react'
import styled from 'styled-components'
import Lottie from 'react-lottie'
import clsx from 'classnames'

import pendingAnimation from '/public/assets/animations/transaction/pending.json'
import successAnimation from '/public/assets/animations/transaction/success.json'
import errorAnimation from '/public/assets/animations/transaction/fail.json'
import { TXStatus } from './types'
import { Typography } from 'components/Typography'
import { blockExplorerTransactionEndpoint } from 'constants/blockExplorers'

const TXStatusBoard = styled.div`
  & > .lottie {
    width: 80px;
  }
  & > .status {
    font-weight: 500;
    font-size: 12px;
    letter-spacing: 0.3px;
    color: #5a879d;
    text-transform: uppercase;
    font-family: ${(props): string => props.theme.primaryFontFamily};
  }
  & > .message {
    font-size: 21px;
    color: #ffffff;
    text-align: center;
    font-family: ${(props): string => props.theme.secondaryFontFamily};
  }
  & > .custom-message {
    color: #5a879d;
    font-weight: 400;
    font-size: 12px;
    line-height: 26px;
    font-family: ${(props): string => props.theme.secondaryFontFamily};
  }
  & > .transaction {
    border-radius: 100px;
    border: 1px solid ${(props): string => props.theme.highlight.light};
    padding: 10px 30px;
    cursor: pointer;
  }
`
interface Props {
  status: TXStatus
  customDesc?: string
  hash?: string
  message?: { [key: string]: string }
}

const SignStep: React.FC<Props> = ({ status, hash, customDesc, message }) => {
  function chooseAnimation(status: any): any {
    switch (status) {
      case TXStatus.PENDING:
        return pendingAnimation
      case TXStatus.SUCCESS:
        return successAnimation
      case TXStatus.ERROR:
        return errorAnimation
      default:
        return ''
    }
  }
  function generateTXMessage(txStatus: TXStatus): string {
    switch (txStatus) {
      case TXStatus.PENDING:
        return (message && message[TXStatus.PENDING]) || 'Sign'
      case TXStatus.SUCCESS:
        return (message && message[TXStatus.SUCCESS]) || 'Your transaction was successful!'
      case TXStatus.ERROR:
        return (message && message[TXStatus.ERROR]) || `Something went wrong!\nPlease try again`
      default:
        return ''
    }
  }
  return (
    <TXStatusBoard className='mx-4 d-flex align-items-center flex-column'>
      <Lottie
        height={120}
        width={120}
        options={{
          loop: true,
          autoplay: true,
          animationData: chooseAnimation(status),
        }}
      />
      <span className='status'>{status}</span>
      <span className='message'>{generateTXMessage(status)}</span>
      {customDesc && <span className='custom-message'>{customDesc}</span>}

      <a
        className={clsx({ invisible: status !== TXStatus.SUCCESS || !hash })}
        rel='noreferrer'
        href={`${blockExplorerTransactionEndpoint}${hash}`}
        target='_blank'
      >
        <Typography variant='secondary' color='blue' size='sm'>
          View the transaction on block explorer
        </Typography>
      </a>
    </TXStatusBoard>
  )
}

export default SignStep
