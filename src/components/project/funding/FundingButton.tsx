import * as React from 'react'
import { Button, ButtonTypes } from 'common/components/Form/Buttons'
import { deviceWidth } from '../../../lib/commonData'
import styled from 'styled-components'
import { Web3Acc } from 'modules/web3/web3'
import { Spinner } from 'common/components/Spinner'
import { BigNumber } from 'bignumber.js'

const ButtonWrapper = styled.div`
  a {
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 240px;
    position: relative;
    font-size: 15px;
    margin-bottom: 0;

    :not(.disabled):not(.greenButton) {
      background: #007695;
      border: 1px solid #007695;

      :hover {
        background: #002d42;
        border: 1px solid
          ${/*eslint-disable-line*/ props => props.theme.ixoBlue};

        i {
          animation: buttonHover 0.5s ease;
        }
      }
    }

    p {
      margin: 0;
    }

    i {
      right: 20px;
      transform: rotate(-90deg);
      position: absolute;
      top: 14px;
      font-size: 12px;
      font-weight: bold;
      opacity: 1;
    }

    @keyframes buttonHover {
      0% {
        right: 40px;
        opacity: 0;
      }
      100% {
        right: 20px;
        opacity: 1;
      }
    }

    @media (min-width: ${deviceWidth.desktopLarge}px) {
      width: 290px;
    }
  }
`

const ButtonWrapperLoading = ButtonWrapper.extend`
  a {
    i {
      right: auto;
      position: relative;
      top: auto;
      animation: loadingButton 2s infinite;
      animation-timing-function: linear;
      transform-origin: center;
      width: 21px;
      height: 16px;
      margin-right: 10px;
      margin-top: 2px;

      :before {
        font-size: 16px;
        font-weight: 100;
      }
    }

    @keyframes loadingButton {
      0% {
        transform: rotate(-90deg);
      }
      100% {
        transform: rotate(270deg);
      }
    }
  }
`

export interface ParentProps {
  projectWalletAddress: string
  requiredIxo: number
  account: Web3Acc
  createProjectWallet: () => void
  fundProject: () => void
  startProject: () => void
  stopProject: () => void
  payoutPhase: () => void
  withdrawFunds: () => void
  web3error: string
  creatingWallet: boolean
  fundingProject: boolean
  projectStatus: string
}

export const FundingButton: React.SFC<ParentProps> = props => {
  // DONT REORDER BELOW BUTTONS PLEASE //
  if (props.projectStatus === 'PAIDOUT') {
    return (
      <ButtonWrapper>
        <Button type={ButtonTypes.dark} onClick={props.withdrawFunds}>
          <p>Refund IXO</p> <i className="icon-down" />
        </Button>
      </ButtonWrapper>
    )
  }
  if (props.projectStatus === 'STOPPED') {
    return (
      <ButtonWrapper>
        <Button type={ButtonTypes.dark} onClick={props.payoutPhase}>
          <p>Ready for payout</p> <i className="icon-down" />
        </Button>
      </ButtonWrapper>
    )
  }
  if (props.projectStatus === 'STARTED') {
    return (
      <ButtonWrapper>
        <Button type={ButtonTypes.dark} onClick={props.stopProject}>
          <p>STOP PROJECT</p> <i className="icon-down" />
        </Button>
      </ButtonWrapper>
    )
  }
  if (props.projectStatus === 'FUNDED') {
    return (
      <ButtonWrapper>
        <Button type={ButtonTypes.dark} onClick={props.startProject}>
          <p>LAUNCH YOUR PROJECT</p> <i className="icon-down" />
        </Button>
      </ButtonWrapper>
    )
  }
  if (props.projectWalletAddress === null) {
    return (
      <div style={{ position: 'relative', top: '8px' }}>
        <Spinner info="" transparentBg={true} scale={0.8} />
      </div>
    )
  }
  if (props.creatingWallet === true) {
    return (
      <ButtonWrapperLoading>
        <Button type={ButtonTypes.green}>
          <i className="icon-sync-icon" />
          <p>Creating wallet</p>
        </Button>
      </ButtonWrapperLoading>
    )
  }
  if (
    props.projectWalletAddress === '0x0000000000000000000000000000000000000000'
  ) {
    return (
      <ButtonWrapper>
        <Button type={ButtonTypes.dark} onClick={props.createProjectWallet}>
          <p>Create Project Wallet</p>
          <i className="icon-down" />
        </Button>
      </ButtonWrapper>
    )
  }
  if (props.fundingProject === true) {
    return (
      <ButtonWrapperLoading>
        <Button type={ButtonTypes.green}>
          <i className="icon-sync-icon" />
          <p>fueling project</p>
        </Button>
      </ButtonWrapperLoading>
    )
  }
  let balance = new BigNumber(props.account.balance)
  balance = balance.div(100000000)
  const requiredIxo = new BigNumber(props.requiredIxo)

  if (balance.toNumber() >= requiredIxo.toNumber()) {
    return (
      <ButtonWrapper>
        <Button type={ButtonTypes.dark} onClick={props.fundProject}>
          <p>ADD FUEL</p> <i className="icon-down" />
        </Button>
      </ButtonWrapper>
    )
  } else {
    return (
      <ButtonWrapper>
        <Button type={ButtonTypes.dark} disabled={true}>
          <p>ADD FUEL</p> <i className="icon-down" />
        </Button>
      </ButtonWrapper>
    )
  }
  // if (props.web3error) {
  // return null;
  // }
}
