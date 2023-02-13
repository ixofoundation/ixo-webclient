import * as React from 'react'
import QRCode from 'qrcode'
import styled from 'styled-components'

const QRImg = styled.img`
  mix-blend-mode: multiply; // remove white space and make it transaprent
  width: 200px;
`

const FundingChatCustom: React.FunctionComponent = (messageData: any) => {
  const [imgSrc, setImgSrc] = React.useState(null)

  const generateQRCodeString = (data: any): string => {
    return JSON.stringify(data)
  }

  if (messageData.amount && messageData.denom && messageData.entity_id) {
    const data = {
      amount: messageData.amount,
      denom: messageData.denom,
      to_address: messageData.to_address,
    }

    const url = generateQRCodeString(data)

    QRCode.toDataURL(url, {
      errorCorrectionLevel: 'L',
      color: {
        dark: '#717171', // Blue dots
      },
    })
      .then((url: any) => {
        setImgSrc(url)
      })
      .catch((err) => {
        console.error(err)
      })

    if (imgSrc) {
      return <QRImg src={imgSrc} />
    }
  }
  return null
}

export default FundingChatCustom
