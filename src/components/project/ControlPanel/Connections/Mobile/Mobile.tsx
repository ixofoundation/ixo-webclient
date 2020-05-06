import React from 'react'
import OpenOnMobile from '../../../../../assets/icons/OpenOnMobile'
import QRComponent from '../../../../common/QRComponent'

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
          <OpenOnMobile fill="#49BFE0" width={36} />
        </div>
        {title}
      </button>
      {show && <QRComponent url={location.href} />}
    </>
  )
}

export default Mobile
