import React from 'react'
import Forum from '../../../../../assets/icons/Forum'

interface Props {
  title: string
  show: boolean
  toggleShow: () => void
}

const Mobile: React.FunctionComponent<Props> = ({
  title,
  show,
  toggleShow,
}) => {
  return (
    <>
      <button onClick={toggleShow}>
        <div className="icon-wrapper">
          <Forum fill="#49BFE0" width="36" />
        </div>
        {title}
      </button>
      {show && <div style={{ width: '100%' }}>Coming soon</div>}
    </>
  )
}

export default Mobile
