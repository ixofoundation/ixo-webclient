import CheckIcon from 'assets/images/icon-check.svg?url'

import EmailIcon from 'assets/images/icon-email.svg?url'
import NextStepIcon from 'assets/images/modal/nextstep.svg?url'

import UserNameIcon from 'assets/images/modal/username.svg?url'
import cx from 'classnames'
import { ModalWrapper } from 'components/Wrappers/ModalWrapper'
import ModalTextArea from 'components/Modal/ModalTextArea/ModalTextArea'
import { StepsTransactions } from 'components/Modals/common/StepsTransactions/StepsTransactions'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import * as validationUtils from 'utils/validation'
import { Container, NextStep, PrevStep, CheckWrapper } from 'components/Modals/styles'
import { ModalInput, SignStep, TXStatus } from '../common'
// import { CreateAgent } from 'lib/protocol'
import { useAccount } from 'hooks/account'
// import { useSelectedEntity } from 'hooks/entity'
// import { AgentRole } from 'redux/account/account.types'

const AgentRoleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 50px;

  button {
    cursor: pointer;
    background: #03324a;
    border: 1px solid #25758f;
    box-sizing: border-box;
    box-shadow: -13px 20px 42px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 10px;
    width: 110px;
    height: 50px;
    margin: 0 10px;

    &:nth-of-type(2) {
      margin-top: 10px;
      margin-bottom: 10px;
    }

    color: #ffeeee;
    font-family: ${(props): string => props.theme.primaryFontFamily};
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    transition: all 0.2s;

    &:focus {
      outline: unset !important;
    }
    &:hover {
      color: #ffeeee !important;
    }
    &.inactive {
      color: #537b8e;
    }
    &.active {
      border: 1px solid ${(props) => props.theme.ixoNewBlue};
    }
  }
`

enum JoinRole {
  IP = 'Implementer',
  IA = 'Investor',
  EA = 'Evaluator',
}

// const join2agentRole = (role: JoinRole): AgentRole => {
//   switch (role) {
//     case JoinRole.IP:
//       return AgentRole.ServiceProvider
//     case JoinRole.IA:
//       return AgentRole.Investor
//     case JoinRole.EA:
//       return AgentRole.Evaluator
//   }
// }

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const JoinModal: React.FunctionComponent<Props> = ({ open, setOpen }) => {
  const { signingClient } = useAccount()
  // const { did: projectDid, address: projectAddress } = useSelectedEntity()

  const steps = ['Role', 'Agent Details', 'Offer', 'Order', 'Sign']

  const [currentStep, setCurrentStep] = useState<number>(0)
  const [currentRole, setCurrentRole] = useState<JoinRole | null>(null)
  const [agentName, setAgentName] = useState<string>('')
  const [agentEmail, setAgentEmail] = useState<string>('')
  const [agentDetails, setAgentDetails] = useState<string>('')
  const [signTXStatus, setSignTXStatus] = useState<TXStatus>(TXStatus.PENDING)
  const [title] = useState('Apply to Join')

  const canNext: boolean = useMemo(() => {
    switch (currentStep) {
      case 0:
        return currentRole !== null
      case 1:
        return validationUtils.isEmail(agentEmail)
      case 2:
        return true
      case 3:
        return true
      default:
        return false
    }
  }, [currentStep, currentRole, agentEmail])

  const canPrev: boolean = useMemo(() => {
    switch (currentStep) {
      case 0:
        return false
      default:
        return true
    }
  }, [currentStep])

  const handleCreateAgent = async (): Promise<void> => {
    if (!signingClient) {
      handlePrevStep()
      return
    }
    // const res = await CreateAgent(signingClient, {
    //   did,
    //   projectDid,
    //   projectAddress,
    //   role: join2agentRole(currentRole!),
    // })
    // console.log('JoinModal', res)
    // if (res) {
    //   setSignTXStatus(TXStatus.SUCCESS)
    // } else {
    //   setSignTXStatus(TXStatus.ERROR)
    // }
  }

  const handlePrevStep = (): void => {
    setCurrentStep(currentStep - 1)
  }
  const handleNextStep = async (): Promise<void> => {
    setCurrentStep(currentStep + 1)
  }

  const handleStepChange = (index: number): void => {
    setCurrentStep(index)
  }

  useEffect(() => {
    if (currentStep < 4) {
      setSignTXStatus(TXStatus.PENDING)
    } else if (currentStep === 4) {
      handleCreateAgent()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep])

  return (
    <ModalWrapper
      isModalOpen={open}
      header={{
        title,
        titleNoCaps: true,
        noDivider: true,
      }}
      handleToggleModal={(): void => setOpen(false)}
    >
      <Container>
        <div className='px-4 pb-4'>
          <StepsTransactions steps={steps} currentStepNo={currentStep} handleStepChange={handleStepChange} />
        </div>

        {currentStep === 0 && (
          <AgentRoleWrapper>
            <button
              className={cx([
                {
                  inactive: currentRole !== JoinRole.IP,
                },
                {
                  active: currentRole === JoinRole.IP,
                },
              ])}
              onClick={(): void => setCurrentRole(JoinRole.IP)}
            >
              {JoinRole.IP}
            </button>
            <button
              className={cx([
                {
                  inactive: currentRole !== JoinRole.IA,
                },
                {
                  active: currentRole === JoinRole.IA,
                },
              ])}
              onClick={(): void => setCurrentRole(JoinRole.IA)}
            >
              {JoinRole.IA}
            </button>
            <button
              className={cx([
                {
                  inactive: currentRole !== JoinRole.EA,
                },
                {
                  active: currentRole === JoinRole.EA,
                },
              ])}
              onClick={(): void => setCurrentRole(JoinRole.EA)}
            >
              {JoinRole.EA}
            </button>
          </AgentRoleWrapper>
        )}

        {currentStep === 1 && (
          <CheckWrapper>
            <ModalInput
              name='agent_name'
              preIcon={<UserNameIcon />}
              placeholder='Agent Name'
              value={agentName!}
              onChange={(e): void => {
                setAgentName(e.target.value)
              }}
              wrapperClassName='mb-2'
            />
            <ModalInput
              name='agent_email'
              error={
                agentEmail.length > 0 && !validationUtils.isEmail(agentEmail) ? 'This is not a valid Email address' : ''
              }
              preIcon={<EmailIcon />}
              placeholder='Agent Email'
              value={agentEmail}
              onChange={(e): void => {
                setAgentEmail(e.target.value)
              }}
            />
          </CheckWrapper>
        )}

        {currentStep === 2 && (
          <CheckWrapper>
            <ModalTextArea
              name='agent_details'
              value={agentDetails}
              rows={7}
              placeholder='(Optional) Describe your offer, including any links to supporting documents.'
              onChange={(e): void => {
                setAgentDetails(e.target.value)
              }}
            />
          </CheckWrapper>
        )}

        {currentStep === 3 && (
          <>
            <CheckWrapper className='mb-2'>
              <ModalInput name='agent_name' preIcon={<UserNameIcon />} value={agentName!} readOnly />
              <img className='check-icon' src={CheckIcon} alt='check-icon' />
            </CheckWrapper>
            <CheckWrapper className='mb-2'>
              <ModalInput name='agent_email' preIcon={<EmailIcon />} value={agentEmail} readOnly />
              <img className='check-icon' src={CheckIcon} alt='check-icon' />
            </CheckWrapper>
            <CheckWrapper className='mb-2'>
              <ModalTextArea
                name='agent_details'
                value={agentDetails}
                placeholder='(Optional) Describe your offer, including any links to supporting documents.'
                rows={3}
                readOnly
              />
              <img className='check-icon' src={CheckIcon} alt='check-icon' />
            </CheckWrapper>
          </>
        )}

        {currentStep === 4 && <SignStep status={signTXStatus} />}

        <NextStep show={canNext} onClick={handleNextStep}>
          <img src={NextStepIcon} alt='next-step' />
        </NextStep>
        <PrevStep show={canPrev} onClick={handlePrevStep}>
          <img src={NextStepIcon} alt='prev-step' />
        </PrevStep>
      </Container>
    </ModalWrapper>
  )
}

export default JoinModal
