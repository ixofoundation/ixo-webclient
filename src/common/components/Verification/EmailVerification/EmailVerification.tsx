import React from 'react'
import OTP from '../OTP/OTP'
import * as verificationApi from '../../../api/verification-api/verification-api'

interface Props {
  handleCompleted: (email: string) => void
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
}

class EmailVerification extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      email: null,
      status: null,
    }
  }

  handleEmailSubmit = (): void => {
    this.setState({ status: VerificationStatus.SendingEmail })

    verificationApi.sendVerificationEmail(this.state.email).then(() => {
      this.setState({ status: VerificationStatus.EmailSent })
    })
  }

  handleOTPSubmit = (otp: string): void => {
    this.setState({ status: VerificationStatus.VerifyingOTP })

    verificationApi.verifyEmailOTP(this.state.email, otp).then(() => {
      this.setState({ status: VerificationStatus.OTPSuccess })
      this.props.handleCompleted(this.state.email)
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
            value={email}
            onChange={(e): void => this.setState({ email: e.target.value })}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.handleEmailSubmit}
            >
              &gt;
            </button>
          </div>
        </div>
        <OTP
          length={6}
          handleOTPSubmit={(otp): void => this.handleOTPSubmit(otp)}
        />
      </div>
    )
  }
}

export default EmailVerification
