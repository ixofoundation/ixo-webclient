import React from 'react'

interface Props {
  length: number
  handleOTPSubmit: (otp: string) => void
}

interface State {
  otpChars: {
    [index: number]: string
  }
}

class OTP extends React.Component<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      otpChars: {},
    }
  }

  handleOTPCharInput = (input: string, index: number): void => {
    this.setState({
      otpChars: {
        ...this.state.otpChars,
        [index]: input,
      },
    })
  }

  handleOTPSubmit = (): void => {
    const { length, handleOTPSubmit } = this.props
    const { otpChars } = this.state

    if (Object.keys(otpChars).length === length) {
      const otp = Object.keys(otpChars)
        .map(key => otpChars[key])
        .join('')

      handleOTPSubmit(otp)
    }
  }

  render(): JSX.Element {
    const { length } = this.props
    const { otpChars } = this.state

    return (
      <>
        <div className="input-group">
          {Array.from(Array(length).keys()).map((num, index) => {
            return (
              <input
                key={num}
                type="tel"
                pattern="[1-9]*"
                autoComplete="off"
                maxLength={1}
                value={otpChars[index]}
                className="form-control pin"
                onChange={(e): void =>
                  this.handleOTPCharInput(e.target.value, index)
                }
              />
            )
          })}
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={this.handleOTPSubmit}
            >
              Validate
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default OTP
