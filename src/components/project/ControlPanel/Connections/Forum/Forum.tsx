import React from 'react'

interface Props {
  show: boolean
}

const Mobile: React.FunctionComponent<Props> = ({ show }) => {
  return <>{show && <div>Coming soon</div>}</>
}

export default Mobile
