import React from 'react'
import QRComponent from '../../../../common/QRComponent'

interface Props {
  show: boolean
}

const Mobile: React.FunctionComponent<Props> = ({ show }) => {
  return (
    <div className={`show-more-container ${show ? 'show' : ''}`}>
      <QRComponent url={location.href} />
    </div>
  )
}

export default Mobile
