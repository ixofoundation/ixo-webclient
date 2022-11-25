import React from 'react'
import { sendVerificationNotification, verifyOTP, Channel } from '../../../api/verification-api/verification-api'
import OtpInput from '../OTPInput/OTPInput'
import * as validationUtils from '../../../utils/validationUtils'

// This is a WIP
// This can be completed when required
// Phone validation can work very similar to below

enum Status {
  SendingNotification = 'SendingNotification',
  NotificationSent = 'NotificationSent',
  VerifyingOTP = 'VerifyingOTP',
  OTPSuccess = 'OTPSuccess',
  OTPFailure = 'OTPFailure',
}

interface Props {
  to: string
  handleCompleted: (email: string, otp: string) => void
  handleReset: () => void
}

interface State {
  status: Status | null
  to: string | null
  otp: string | null
}

class EmailVerification extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      to: this.props.to,
      otp: null,
      status: !this.props.to ? null : Status.OTPSuccess,
    }
  }

  handleReset = (): void => {
    const { handleReset } = this.props
    this.setState({ otp: null, status: null })

    handleReset()
  }

  handleEmailSubmit = (): void => {
    const { to } = this.state
    this.setState({ status: Status.SendingNotification })

    sendVerificationNotification(to!, Channel.Email).then(() => {
      this.setState({ status: Status.NotificationSent })
    })
  }

  handleOTPSubmit = (): void => {
    const { to, otp } = this.state
    this.setState({ status: Status.VerifyingOTP })

    verifyOTP(to!, otp!, Channel.Email).then((isValid) => {
      if (isValid) {
        this.setState({ status: Status.OTPSuccess })
        this.props.handleCompleted(to!, otp!)
      } else {
        this.setState({ status: Status.OTPFailure })
      }
    })
  }

  render(): JSX.Element {
    const { to, status, otp } = this.state

    return (
      <div className='form-group'>
        {status === Status.SendingNotification && <div>Sending email</div>}
        {status === Status.NotificationSent && <div>Email Sent</div>}
        <div className='input-group'>
          <input
            type='email'
            className='form-control'
            placeholder='Email address'
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            spellCheck='false'
            value={to!}
            onChange={(e): void => this.setState({ to: e.target.value })}
            disabled={status === Status.OTPSuccess}
          />
          {status !== Status.OTPSuccess && (
            <div className='input-group-append'>
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={this.handleEmailSubmit}
                disabled={!validationUtils.isEmail(to!)}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
        {(status === Status.NotificationSent || status === Status.VerifyingOTP || status === Status.OTPFailure) && (
          <OtpInput
            disabled={!validationUtils.isEmail(to!)}
            otp={otp!}
            handleChange={(otp): void => this.setState({ otp })}
            hasError={status === Status.OTPFailure}
            handleSubmit={this.handleOTPSubmit}
          />
        )}
        {status === Status.OTPSuccess && (
          <>
            <span>Validated</span>
            <button onClick={this.handleReset}>Change</button>
          </>
        )}
      </div>
    )
  }
}

export default EmailVerification
