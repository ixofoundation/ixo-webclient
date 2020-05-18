import React from 'react'
import QRCode from '../../../../../common/components/QRCode/QRCode'

interface Props {
  show: boolean
}

const Mobile: React.FunctionComponent<Props> = ({ show }) => {
  return (
    <div className={`show-more-container ${show ? 'show' : ''}`}>
      <QRCode url={location.href} />
    </div>
  )
}

export default Mobile
