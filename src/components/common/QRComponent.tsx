import * as React from 'react'
import QRCode from 'qrcode'
import styled from 'styled-components'

export interface ParentProps {
  url: string
}

const QRImg = styled.img`
  width: 150px;
  height: 150px;
`

const QRContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const QRInner = styled.div`
  background: white;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.15);
  margin-bottom: 20px;
  width: 180px;
  padding: 0 15px 15px;
  height: 195px;
  text-align: center;

  p {
    font-size: 12px;
    color: #292929;
    font-weight: 300;
    margin-top: -5px;
  }
`

export default class QRComponent extends React.Component<ParentProps> {
  state = {
    imgSrc: null,
  }

  componentDidMount(): void {
    QRCode.toDataURL(this.props.url, {
      errorCorrectionLevel: 'L',
      color: {
        dark: '#717171', // Blue dots
      },
    })
      .then(url => {
        this.setState({ imgSrc: url })
      })
      .catch(err => {
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
