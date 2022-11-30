import QRCode from '../../../QRCode/QRCode'
import MediaQuery from 'react-responsive'
import { deviceWidth } from 'constants/device'

interface Props {
  show: boolean
}

const Mobile: React.FunctionComponent<Props> = ({ show }) => {
  return (
    <MediaQuery minWidth={`${deviceWidth.mobile}px`}>
      <div className={`d-hidden d-block-sm show-more-container ${show ? 'show' : ''}`}>
        <QRCode url={window.location.href} />
      </div>
    </MediaQuery>
  )
}

export default Mobile
