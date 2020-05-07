import React from 'react'

interface Props {
  show: boolean
}

const Mobile: React.FunctionComponent<Props> = ({ show }) => {
  return <>{show && <div style={{ width: '100%' }}>Coming soon</div>}</>
}

export default Mobile
