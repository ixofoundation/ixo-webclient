import * as React from 'react'
import QRCode from 'qrcode'
import Phone from '../../../../../assets/icons/Phone'
import PhoneQR from '../../../../../assets/icons/PhoneQR'
export interface Props {
  value: string
}

export default class QRCodeComponent extends React.Component<Props> {
  state = {
    url: null,
  }

  componentDidMount(): void {
    const { value } = this.props

    QRCode.toDataURL(value, {
      errorCorrectionLevel: 'L',
      color: {
        dark: '#717171', // Blue dots
      },
    }).then(url => {
      this.setState({ url })
    })
  }

  render(): JSX.Element {
    const { url } = this.state

    return (
      <div className="row">
        <div className="col-12 col-md-6">
          <img src={url} width="150" height="150" />
        </div>
        <div className="col-12 col-md-6">
          <div>
            <Phone fill="#000" />
            Go to <strong>settings - scan QR code</strong> on your{' '}
            <strong>IXO mobile APP</strong>
            <br />
            <PhoneQR />
            <strong>Scan</strong> the QR code by{' '}
            <strong>placing your camera over</strong> the{' '}
            <strong>QR code</strong> on the left to acces claim
          </div>
        </div>
      </div>
    )
  }
}
