import React from 'react'
import styled from 'styled-components'
import ReactCodeInput from 'react-verification-code-input'

const StyledCodeInput = styled(ReactCodeInput)`
  width: 100% !important;
  display: flex;
  justify-content: center;

  & > div {
    display: flex;
    gap: 10px;

    & > input {
      background: transparent !important;
      border: 1px solid ${(props): string => props.theme.ixoBlue} !important;
      border-radius: 8px !important;
      color: white !important;
      caret-color: white !important;
    }
  }
`

interface Props {
  onComplete: (val: string) => void
}

const VerificationCodeInput: React.FC<Props> = ({
  onComplete,
}): JSX.Element => {
  return (
    <StyledCodeInput
      type="number"
      fields={5}
      fieldWidth={48}
      fieldHeight={48}
      autoFocus
      onComplete={onComplete}
    />
  )
}

export default VerificationCodeInput
