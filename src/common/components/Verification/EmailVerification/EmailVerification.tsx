import React from 'react'
import OTP from '../OTP/OTP'

interface Props {
  otpLength: number
  handleSubmit: (email: string) => void
  /*
  sendingVerificationEmail: boolean
  verificationEmailSent: boolean
  verifying: boolean
  success: boolean
  */
}

interface State {
  email: string
}

class EmailVerification extends React.Component<Props, State> {
  render(): JSX.Element {
    const { otpLength } = this.props
    const { email } = this.state

    return (
      <div className="form-group">
        <div className="input-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email address"
            value={email}
            onChange={(e): void => this.setState({ email: e.target.value })}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">
              &gt;
            </button>
          </div>
        </div>
        <OTP
          length={otpLength}
          handleOTPSubmit={(otp): void => console.log(otp)}
        />
      </div>
    )
  }
}

export default EmailVerification
