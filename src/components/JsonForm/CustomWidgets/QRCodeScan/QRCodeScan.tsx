import React from 'react'
import QrReader from 'react-qr-reader'
import { QRWrapper, ExplainerText } from './QRCodeScan.styles'
import Phone from 'assets/icons/Phone'
import PhoneQR from 'assets/icons/PhoneQR'

interface Props {
  id: string
  value: string
  placeholder: string
  onChange: (value: string) => void
  onBlur: (id: string, value: string) => void
  onFocus: (id: string, value: string) => void
}

const QRCodeScan: React.FunctionComponent<Props> = ({ id, value, placeholder, onChange, onBlur, onFocus }) => {
  const handleScan = (data: any): void => {
    if (data) {
      onChange(data)
    }

    onBlur(id, data)
    onFocus(id, data)
  }

  const handleError = (err: any): void => {
    console.error(err)
  }

  return (
    <QRWrapper className='row'>
      <div className='col-12 col-md-6'>
        <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: '100%' }} />
        <input
          value={value}
          placeholder={placeholder}
          className='form-control'
          onBlur={(): void => onBlur(id, value)}
          onFocus={(): void => onFocus(id, value)}
          onChange={(e): void => onChange(e.target.value)}
        ></input>
      </div>
      <ExplainerText className='col-12 col-md-6'>
        <div className='explainer-text-wrapper'>
          <div className='explainer-text-item'>
            <Phone fill='#000' />
            <div>
              <strong>Accept any permissions</strong> to use your device&apos;s camera
            </div>
          </div>
          <div className='explainer-text-item'>
            <PhoneQR />
            <div>
              <strong>Scan</strong> the relevant QR code by <strong>placing the QR code over the camera</strong>
            </div>
          </div>
          <button type='button'>View scan history</button>
        </div>
      </ExplainerText>
    </QRWrapper>
  )
}

export default QRCodeScan
