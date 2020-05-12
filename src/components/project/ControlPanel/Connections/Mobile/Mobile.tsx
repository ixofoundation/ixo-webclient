import React from 'react'
import QRComponent from '../../../../common/QRComponent'

interface Props {
  show: boolean
}

const Mobile: React.FunctionComponent<Props> = ({ show }) => {
  return <>{show && <QRComponent url={location.href} />}</>
}

export default Mobile
