import React from 'react'
import OtpInput from 'react-otp-input'
import * as verificationApi from '../../../api/verification-api/verification-api'
import { OTPContainer } from '../Verification.styles'
import * as validationUtils from '../../../utils/validationUtils'

enum Status {
  SendingEmail = 'SendingEmail',
  EmailSent = 'EmailSent',
  VerifyingOTP = 'VerifyingOTP',
  OTPSuccess = 'OTPSuccess',
  OTPFailure = 'OTPFailure',
}

interface Props {
  email: string
  handleCompleted: (email: string, otp: string) => void
  handleReset: () => void
}

interface State {
  status: Status
  email: string
  otp: string
}

class EmailVerification extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      email: this.props.email,
      otp: null,
      status: !this.props.email ? null : Status.OTPSuccess,
    }
  }

  handleReset = (): void => {
    const { handleReset } = this.props
    this.setState({ otp: null, status: null })

    handleReset()
  }

  handleEmailSubmit = (): void => {
    const { email } = this.state
    this.setState({ status: Status.SendingEmail })

    verificationApi.sendVerificationEmail(email).then(() => {
      this.setState({ status: Status.EmailSent })
    })
  }

  handleOTPSubmit = (): void => {
    const { email, otp } = this.state
    this.setState({ status: Status.VerifyingOTP })

    verificationApi.verifyEmailOTP(email, otp).then(isValid => {
      if (isValid) {
        this.setState({ status: Status.OTPSuccess })
        this.props.handleCompleted(email, otp)
      } else {
        this.setState({ status: Status.OTPFailure })
      }
    })
  }

  render(): JSX.Element {
    const { email, status, otp } = this.state

    return (
      <div className="form-group">
        {status === Status.SendingEmail && <div>Sending email</div>}
        {status === Status.EmailSent && <div>Email Sent</div>}
        <div className="input-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email address"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            value={email}
            onChange={(e): void => this.setState({ email: e.target.value })}
            disabled={status === Status.OTPSuccess}
          />
          {status !== Status.OTPSuccess && (
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.handleEmailSubmit}
                disabled={!validationUtils.isEmail(email)}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
        {(status === Status.EmailSent ||
          status === Status.VerifyingOTP ||
          status === Status.OTPFailure) && (
          <OTPContainer className="input-group">
            <OtpInput
              isDisabled={!validationUtils.isEmail(email)}
              value={otp}
              numInputs={6}
              isInputNum
              onChange={(otp): void => this.setState({ otp })}
              separator=""
              hasErrored={status === Status.OTPFailure}
              errorStyle={{
                borderColor: 'red',
                borderWidth: '3px',
                borderStyle: 'solid',
              }}
            />
            <button
              disabled={!otp || otp.length < 6}
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.handleOTPSubmit}
            >
              &gt;
            </button>
            {status === Status.OTPFailure && <div>Wrong OTP</div>}
          </OTPContainer>
        )}
        {status === Status.OTPSuccess && (
          <>
            <span>Email validated</span>
            <button onClick={this.handleReset}>Change email address</button>
          </>
        )}
      </div>
    )
  }
}

export default EmailVerification
