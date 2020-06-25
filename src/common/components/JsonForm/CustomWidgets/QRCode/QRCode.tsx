import * as React from 'react'
import QRCode from 'qrcode'

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

    return <img src={url} width="150" height="150" />
  }
}
