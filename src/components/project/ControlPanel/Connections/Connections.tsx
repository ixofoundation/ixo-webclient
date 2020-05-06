import React from 'react'
import Down from '../../../../assets/icons/Down'
import Twitter from '../../../../assets/icons/Twitter'
import Connection from '../../../../assets/icons/Connections'
import OpenOnMobile from '../../../../assets/icons/OpenOnMobile'
import Forum from '../../../../assets/icons/Forum'
import Share from '../../../../assets/icons/Share'
import { ControlPanelSection } from '../ControlPanel.styles'
import QRComponent from '../../../common/QRComponent'
import { ConnectionButtonsWrapper } from './Connections.styles'
import { SchemaConnection } from '../types'

interface Props {
  title: string
  connections: SchemaConnection[]
  selectedConnection: string
  toggleShowConnection: (connection: string) => void
}

const shareToTwitter = (): void => {
  const url = location.href
  const text =
    'It’s up to all of us to start making an impact for a positive future for humanity. Check out this venture that aims to achieve the global SDGs. If you think it’s a worthy cause, then like or share this post to show your support.'
  window.open(
    'http://twitter.com/share?url=' +
      encodeURIComponent(url) +
      '&text=' +
      encodeURIComponent(text),
    '',
    'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0',
  )
}

const Connections: React.FunctionComponent<Props> = ({
  title,
  connections,
  selectedConnection,
  toggleShowConnection,
}) => {
  const iconWidth = 36

  const mobileConnection = connections.find(conn => conn['@type'] === name)
  const shareConnection = connections.find(conn => conn['@type'] === name)
  const forumConnection = connections.find(conn => conn['@type'] === name)

  return (
    <ControlPanelSection key={title}>
      <h4>
        <div className="heading-icon">
          <Connection />
        </div>
        {title}
        <div
          onClick={(): void => toggleShowConnection('')}
          className={`arrow-icon ${selectedConnection !== '' ? 'active' : ''}`}
        >
          <Down width="16" fill="#BDBDBD" />
        </div>
      </h4>
      <ConnectionButtonsWrapper>
        <button onClick={(): void => toggleShowConnection('mobile')}>
          <div className="icon-wrapper">
            <OpenOnMobile fill="#49BFE0" width={iconWidth} />
          </div>
          Mobile
        </button>
        <button onClick={(): void => toggleShowConnection('share')}>
          <div className="icon-wrapper">
            <Share fill="#49BFE0" width={iconWidth} />
          </div>
          Share
        </button>
        <button>
          <div className="icon-wrapper">
            <Forum fill="#49BFE0" width={iconWidth} />
          </div>
          Forum
        </button>
        {selectedConnection === 'mobile' && (
          <div className="show-more-container">
            <QRComponent url={location.href} />
          </div>
        )}
        {selectedConnection === 'share' && (
          <div className="show-more-container">
            <button onClick={shareToTwitter}>
              Share to twitter <Twitter width="22" fill="#47568c" />
            </button>
          </div>
        )}
      </ConnectionButtonsWrapper>
    </ControlPanelSection>
  )
}

export default Connections
