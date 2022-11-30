import * as React from 'react'
import QRCode from 'qrcode'
import { replace } from 'lodash'
import { QRContainer, QRInner, QRImg } from './QRCode.styles'

export interface Props {
  url: string
}

export default class QRCodeComponent extends React.Component<Props> {
  state = {
    imgSrc: undefined,
  }

  componentDidMount(): void {
    const urlForQR = replace(this.props.url, '/overview', '')
    QRCode.toDataURL(urlForQR, {
      errorCorrectionLevel: 'L',
      color: {
        dark: '#717171', // Blue dots
      },
    })
      .then((url) => {
        this.setState({ imgSrc: url })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render(): JSX.Element {
    return (
      <QRContainer>
        <QRInner>
          <QRImg src={this.state.imgSrc} />
          <p>Scan with your ixo Mobile App</p>
        </QRInner>
      </QRContainer>
    )
  }
}
