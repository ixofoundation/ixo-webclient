import React from 'react'
import OTP from 'react-otp-input'
import { OTPContainer } from './OTPInput.styles'

interface Props {
  otp: string
  hasError: boolean
  disabled: boolean
  handleChange: (otp: string) => void
  handleSubmit: () => void
}

const OTPInput: React.FunctionComponent<Props> = ({ hasError, disabled, otp, handleChange, handleSubmit }) => {
  return (
    <OTPContainer className='input-group'>
      <OTP
        value={otp}
        numInputs={6}
        onChange={handleChange}
        renderSeparator=''
        renderInput={(props) => <input disabled={disabled} type={"number"} />}
      />
      <button
        disabled={!otp || otp.length < 6}
        className='btn btn-outline-secondary'
        type='button'
        onClick={handleSubmit}
      >
        &gt;
      </button>
      {hasError && <div>Wrong OTP</div>}
    </OTPContainer>
  )
}

export default OTPInput
