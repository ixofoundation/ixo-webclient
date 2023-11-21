import styled from 'styled-components'
import Lottie from 'react-lottie'

import EyeIcon from 'assets/images/icon-eye.svg'
import pendingAnimation from 'assets/animations/transaction/pending.json'
import successAnimation from 'assets/animations/transaction/success.json'
import errorAnimation from 'assets/animations/transaction/fail.json'
import { ReactNode } from 'react'

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

export enum TXStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface Props {
  status: TXStatus
  customDesc?: string
  hash?: string
  noLottie?: boolean
  children?: ReactNode
}

const SignStep = ({ status, hash, customDesc, noLottie, children }: Props) => {
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
        return 'Sign the transaction'
      case TXStatus.SUCCESS:
        return 'Your transaction was successful!'
      case TXStatus.ERROR:
        return `Something went wrong!\nPlease try again`
      default:
        return ''
    }
  }
  function handleViewTransaction(): void {
    hash && window.open(`${process.env.REACT_APP_BLOCK_SCAN_URL}/transactions/${hash}`, '_blank')!.focus()
  }
  return (
    <TXStatusBoard className='mx-4 d-flex align-items-center flex-column'>
      {!noLottie && (
        <Lottie
          height={120}
          width={120}
          options={{
            loop: true,
            autoplay: true,
            animationData: chooseAnimation(status),
          }}
        />
      )}
      <span className='status'>{status}</span>
      <span className='message'>{generateTXMessage(status)}</span>
      {children}
      {customDesc && <span className='custom-message'>{customDesc}</span>}
      {status === TXStatus.SUCCESS && hash && (
        <div className='transaction mt-3' onClick={handleViewTransaction}>
          <img src={EyeIcon} alt='view transactions' />
        </div>
      )}
    </TXStatusBoard>
  )
}

export default SignStep
