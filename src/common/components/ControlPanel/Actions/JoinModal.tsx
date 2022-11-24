import CheckIcon from 'assets/images/modal/check.svg'
import EmailRedIcon from 'assets/images/modal/email-red.svg'
import EmailIcon from 'assets/images/modal/email.svg'
import NextStepIcon from 'assets/images/modal/nextstep.svg'
import UserNameIcon from 'assets/images/modal/username.svg'
import cx from 'classnames'
import ModalInput from 'common/components/ModalInput/ModalInput'
import ModalTextArea from 'common/components/ModalTextArea/ModalTextArea'
import { StepsTransactions } from 'common/components/StepsTransactions/StepsTransactions'
import { createEntityAgent } from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/EntityAgents.actions'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import * as validationUtils from '../../../utils/validationUtils'
import { AgentRole } from 'modules/Account/types'
import { Container, NextStep, PrevStep, CheckWrapper } from './Modal.styles'
import SignStep, { TXStatus } from './components/SignStep'
import {
  selectCreationError,
  selectIsCreating,
} from 'modules/Entities/SelectedEntity/EntityImpact/EntityAgents/EntityAgents.selectors'
import { selectUserIsLoggedIn } from 'modules/Account/Account.selectors'
import { keysafePopup } from 'common/utils/keysafe'

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
      border: 1px solid #49bfe0;
    }
  }
`

enum JoinRole {
  IP = 'Implementer',
  IA = 'Investor',
  EA = 'Evaluator',
}

const join2agentRole = (role: JoinRole): AgentRole => {
  switch (role) {
    case JoinRole.IP:
      return AgentRole.ServiceProvider
    case JoinRole.IA:
      return AgentRole.Investor
    case JoinRole.EA:
      return AgentRole.Evaluator
  }
}

interface Props {
  handleChangeTitle: (newTitle: string) => void
}

const JoinModal: React.FunctionComponent<Props> = ({ handleChangeTitle }) => {
  const dispatch = useDispatch()
  const isCreating = useSelector(selectIsCreating)
  const creationError = useSelector(selectCreationError)
  const userIsLoggedIn = useSelector(selectUserIsLoggedIn)

  const steps = ['Role', 'Agent Details', 'Offer', 'Order', 'Sign']

  const [currentStep, setCurrentStep] = useState<number>(0)
  const [currentRole, setCurrentRole] = useState<JoinRole | null>(null)
  const [agentName, setAgentName] = useState<string>()
  const [agentEmail, setAgentEmail] = useState<string>('')
  const [agentDetails, setAgentDetails] = useState<string>('')
  const [signTXStatus, setSignTXStatus] = useState<TXStatus>(TXStatus.PENDING)
  const defaultTitle = 'Apply to Join'

  const handlePrevStep = (): void => {
    setCurrentStep(currentStep - 1)
    if (currentStep === 0) {
      handleChangeTitle(defaultTitle)
    }
  }
  const handleNextStep = async (): Promise<void> => {
    if (currentStep === 1) {
      handleChangeTitle(`${defaultTitle} as an ${currentRole}`)
    }
    if (currentStep === 3) {
      if (!userIsLoggedIn) {
        keysafePopup()
        return
      }
      dispatch(createEntityAgent(agentEmail, agentName!, join2agentRole(currentRole!)) as any)
    }
    setCurrentStep(currentStep + 1)
  }

  const handleStepChange = (index: number): void => {
    setCurrentStep(index)
  }

  const enableNextStep = (): boolean => {
    switch (currentStep) {
      case 0:
        return currentRole !== null
      case 1:
        return agentEmail.length > 0 && validationUtils.isEmail(agentEmail)
      case 2:
        return true
      case 3:
        return true
      default:
        return false
    }
  }
  const enablePrevStep = (): boolean => {
    switch (currentStep) {
      case 0:
        return false
      default:
        return true
    }
  }

  useEffect(() => {
    if (currentStep < 4) {
      setSignTXStatus(TXStatus.PENDING)
    }
  }, [currentStep])

  useEffect(() => {
    if (currentStep === 4) {
      if (!isCreating && !creationError) {
        setSignTXStatus(TXStatus.SUCCESS)
      } else if (!isCreating && creationError) {
        setSignTXStatus(TXStatus.ERROR)
      }
    }
  }, [isCreating, creationError, currentStep])

  return (
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
            invalid={agentName !== undefined && agentName.length === 0}
            invalidLabel={'This is not a valid agent name'}
            preIcon={UserNameIcon}
            placeholder='Agent Name'
            value={agentName!}
            handleChange={(e): void => {
              setAgentName(e.target.value)
            }}
          />
          <ModalInput
            invalid={agentEmail.length > 0 && !validationUtils.isEmail(agentEmail)}
            invalidLabel={'This is not a valid Email address'}
            preIcon={agentEmail.length > 0 && !validationUtils.isEmail(agentEmail) ? EmailRedIcon : EmailIcon}
            placeholder='Agent Email'
            value={agentEmail}
            handleChange={(e): void => {
              setAgentEmail(e.target.value)
            }}
          />
        </CheckWrapper>
      )}

      {currentStep === 2 && (
        <CheckWrapper>
          <ModalTextArea
            value={agentDetails}
            rows={7}
            placeholder='(Optional) Describe your offer, including any links to supporting documents.'
            handleChange={(e): void => {
              setAgentDetails(e.target.value)
            }}
          />
        </CheckWrapper>
      )}

      {currentStep === 3 && (
        <>
          <CheckWrapper>
            <ModalInput preIcon={UserNameIcon} value={agentName!} />
            <img className='check-icon' src={CheckIcon} alt='check-icon' />
          </CheckWrapper>
          <CheckWrapper>
            <ModalInput preIcon={EmailIcon} value={agentEmail} />
            <img className='check-icon' src={CheckIcon} alt='check-icon' />
          </CheckWrapper>
          <CheckWrapper>
            <ModalTextArea
              value={agentDetails}
              placeholder='(Optional) Describe your offer, including any links to supporting documents.'
              rows={3}
            />
            <img className='check-icon' src={CheckIcon} alt='check-icon' />
          </CheckWrapper>
        </>
      )}

      {currentStep === 4 && <SignStep status={signTXStatus} />}

      {enableNextStep() && (
        <NextStep onClick={handleNextStep}>
          <img src={NextStepIcon} alt='next-step' />
        </NextStep>
      )}
      {enablePrevStep() && (
        <PrevStep onClick={handlePrevStep}>
          <img src={NextStepIcon} alt='prev-step' />
        </PrevStep>
      )}
    </Container>
  )
}

export default JoinModal
