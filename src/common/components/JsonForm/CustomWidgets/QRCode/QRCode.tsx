import * as React from 'react'
import QRCode from 'qrcode'
import Phone from '../../../../../assets/icons/Phone'
import PhoneQR from '../../../../../assets/icons/PhoneQR'
import { QRWrapper, ExplainerText } from './QRCode.styles'
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
      <QRWrapper className="row">
        <div className="col-12 col-md-6">
          <img src={url} width="150" height="150" />
        </div>
        <ExplainerText className="col-12 col-md-6">
          <div className="explainer-text-wrapper">
            <div className="explainer-text-item">
              <Phone fill="#000" />
              <div>
                Go to <strong>settings - scan QR code</strong> on your{' '}
                <strong>IXO mobile APP</strong>
              </div>
            </div>
            <div className="explainer-text-item">
              <PhoneQR />
              <div>
                <strong>Scan</strong> the QR code by{' '}
                <strong>placing your camera over</strong> the{' '}
                <strong>QR code</strong> on the left to acces claim
              </div>
            </div>
          </div>
          <button type="button">View scan history</button>
        </ExplainerText>
      </QRWrapper>
    )
  }
}
