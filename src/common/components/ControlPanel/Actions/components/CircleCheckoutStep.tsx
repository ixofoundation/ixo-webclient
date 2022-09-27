// import { isoCountries } from 'lib/commonData'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import CountrySelector from './CountrySelector'
import DatePicker from './DatePicker'
import ModalInputWithLabel from './ModalInputWithLabel'
import VerificationCodeInput from './VerificationCodeInput'

const CircleCheckoutStepWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 310px;
`
const StepHeaderTitle = styled.h1`
  color: ${(props): string => props.theme.ixoBlue};
  font-family: ${(props): string => props.theme.secondaryFontFamily};
  font-weight: 400;
  font-size: 25px;
  line-height: 110%;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
`
const StepHeaderDescription = styled.h1`
  color: #ffffff;
  font-family: ${(props): string => props.theme.primaryFontFamily};
  font-weight: 400;
  font-size: 16px;
  line-height: 131%;
  margin-bottom: 30px;
`

const StepRow = styled.div`
  display: flex;
  gap: 10px;
`

const StepHeader = ({ title, description }): JSX.Element => (
  <StepContainer>
    <StepHeaderTitle>{title}</StepHeaderTitle>
    <StepHeaderDescription>{description}</StepHeaderDescription>
  </StepContainer>
)

const EmailAddressStep = (): JSX.Element => {
  const [email, setEmail] = useState('')
  return (
    <StepContainer>
      <StepHeader
        title="Checkout with Circle"
        description="Circle is a fast and secure credit card payment processing provider."
      />
      <ModalInputWithLabel
        label="Email address"
        placeholder="hello@example.net"
        value={email}
        handleChange={setEmail}
      />
    </StepContainer>
  )
}

const LoginCodeStep = (): JSX.Element => {
  return (
    <StepContainer>
      <StepHeader
        title="Enter login code"
        description="Check your provided email for a login code and enter or paste it below to continue."
      />
      <VerificationCodeInput
        onComplete={(val: string): void => {
          console.log(val)
        }}
      />
    </StepContainer>
  )
}

const PersonalDetailsStep = (): JSX.Element => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')
  const [country, setCountry] = useState('')

  return (
    <StepContainer>
      <StepHeader
        title="Enter basic details"
        description="Please enter you name and date of birth as they appear on official documents. We need to know those details to verify your identity so we can meet regulatory compliance."
      />

      <StepRow style={{ marginBottom: 16 }}>
        <ModalInputWithLabel
          label="First Name"
          placeholder="First name"
          value={firstName}
          handleChange={setFirstName}
        />
        <ModalInputWithLabel
          label="Last Name"
          placeholder="Last name"
          value={lastName}
          handleChange={setLastName}
        />
      </StepRow>

      <StepRow style={{ marginBottom: 16 }}>
        <DatePicker
          id="circle-checkout-dob"
          label={'Date of Birth'}
          value={dob}
          placeholder={'dd/mm/yyyy'}
          onChange={setDob}
        />
      </StepRow>

      <StepRow>
        <CountrySelector
          label="Nationality"
          country={country}
          setCountry={setCountry}
        />
      </StepRow>
    </StepContainer>
  )
}

interface Props {
  stepIdx: number
  handleFinished?: () => void
}
const CircleCheckoutStep: React.FC<Props> = ({
  stepIdx,
  handleFinished,
}): JSX.Element => {
  const stepComponents = [EmailAddressStep, LoginCodeStep, PersonalDetailsStep]
  const CurrentStepComponent = useMemo(
    () => stepComponents[stepIdx] ?? undefined,
    [stepComponents, stepIdx],
  )

  useEffect(() => {
    if (stepIdx === stepComponents.length - 1) {
      handleFinished()
    }
    // eslint-disable-next-line
  }, [stepIdx, stepComponents])

  return (
    <CircleCheckoutStepWrapper>
      {CurrentStepComponent && <CurrentStepComponent />}
    </CircleCheckoutStepWrapper>
  )
}

export default CircleCheckoutStep
