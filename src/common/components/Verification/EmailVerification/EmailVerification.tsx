import React from 'react'
import OtpInput from 'react-otp-input'
import * as verificationApi from '../../../api/verification-api/verification-api'
import { OTPContainer } from './EmailVerification.styles'
import * as validationUtils from '../../../utils/validationUtils'

interface Props {
  email: string
  handleCompleted: (email: string, otp: string) => void
  handleReset: () => void
}

enum VerificationStatus {
  SendingEmail = 'SendingEmail',
  EmailSent = 'EmailSent',
  VerifyingOTP = 'VerifyingOTP',
  OTPSuccess = 'OTPSuccess',
  OTPFailure = 'OTPFailure',
}

interface State {
  status: VerificationStatus
  email: string
  otp: string
}

class EmailVerification extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      email: this.props.email,
      otp: null,
      status: !this.props.email ? null : VerificationStatus.OTPSuccess,
    }
  }

  handleEmailChange = (e): void => this.setState({ email: e.target.value })

  handleOTPChange = (otp): void => this.setState({ otp })

  handleReset = (): void => {
    this.setState({ otp: null, status: null })

    this.props.handleReset()
  }

  handleEmailSubmit = (): void => {
    this.setState({ status: VerificationStatus.SendingEmail })

    verificationApi.sendVerificationEmail(this.state.email).then(() => {
      this.setState({ status: VerificationStatus.EmailSent })
    })
  }

  handleOTPSubmit = (): void => {
    this.setState({ status: VerificationStatus.VerifyingOTP })

    verificationApi
      .verifyEmailOTP(this.state.email, this.state.otp)
      .then(isValid => {
        if (isValid) {
          this.setState({ status: VerificationStatus.OTPSuccess })
          this.props.handleCompleted(this.state.email, this.state.otp)
        } else {
          this.setState({ status: VerificationStatus.OTPFailure })
        }
      })
  }

  render(): JSX.Element {
    const { email, status } = this.state

    return (
      <div className="form-group">
        {status}
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
            onChange={this.handleEmailChange}
            disabled={status === VerificationStatus.OTPSuccess}
          />
          {status !== VerificationStatus.OTPSuccess && (
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
        {(status === VerificationStatus.EmailSent ||
          status === VerificationStatus.VerifyingOTP ||
          status === VerificationStatus.OTPFailure) && (
          <OTPContainer className="input-group">
            <OtpInput
              isDisabled={!this.state.email}
              value={this.state.otp}
              numInputs={6}
              isInputNum
              onChange={this.handleOTPChange}
              separator=""
              hasErrored={status === VerificationStatus.OTPFailure}
              errorStyle={{
                borderColor: 'red',
                borderWidth: '3px',
                borderStyle: 'solid',
              }}
            />
            <button
              disabled={!this.state.otp || this.state.otp.length < 6}
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.handleOTPSubmit}
            >
              &gt;
            </button>
          </OTPContainer>
        )}
        {status === VerificationStatus.OTPSuccess && (
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
