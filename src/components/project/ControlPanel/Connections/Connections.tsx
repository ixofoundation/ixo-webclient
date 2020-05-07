import React from 'react'
import Down from '../../../../assets/icons/Down'
import ConnectionIcon from '../../../../assets/icons/Connections'
import ShareIcon from '../../../../assets/icons/Share'
import MobileIcon from '../../../../assets/icons/OpenOnMobile'
import ForumIcon from '../../../../assets/icons/Forum'
import { ControlPanelSection } from '../ControlPanel.styles'
import { ConnectionButtonsWrapper } from './Connections.styles'
import { ConnectionType, ConnectionsSection } from '../types'
import MobileConnection from './Mobile/Mobile'
import ShareConnection from './Share/Share'
import ForumConnection from './Forum/Forum'

interface Props {
  connectionsSection: ConnectionsSection
  selectedConnection: string
  toggleConnection: (connection: string) => void
}

const Connections: React.FunctionComponent<Props> = ({
  connectionsSection: { connections, title },
  selectedConnection,
  toggleConnection,
}) => {
  const mobileSettings = connections.find(
    conn => conn['@type'] === ConnectionType.Mobile,
  )
  const shareSettings = connections.find(
    conn => conn['@type'] === ConnectionType.Share,
  )
  const forumSettings = connections.find(
    conn => conn['@type'] === ConnectionType.Forum,
  )

  return (
    <ControlPanelSection>
      <h4>
        <div className="heading-icon">
          <ConnectionIcon />
        </div>
        {title}
        <div
          onClick={(): void => toggleConnection(null)}
          className={`arrow-icon ${selectedConnection ? 'active' : ''}`}
        >
          <Down width="16" fill="#BDBDBD" />
        </div>
      </h4>
      <ConnectionButtonsWrapper>
        {mobileSettings && (
          <button onClick={(): void => toggleConnection(ConnectionType.Mobile)}>
            <div className="icon-wrapper">
              <MobileIcon fill="#49BFE0" width="36" />
            </div>
            {mobileSettings.title}
          </button>
        )}
        {shareSettings && (
          <button onClick={(): void => toggleConnection(ConnectionType.Share)}>
            <div className="icon-wrapper">
              <ShareIcon fill="#49BFE0" width="36" />
            </div>
            {shareSettings.title}
          </button>
        )}
        {forumSettings && (
          <button onClick={(): void => toggleConnection(ConnectionType.Forum)}>
            <div className="icon-wrapper">
              <ForumIcon fill="#49BFE0" width="36" />
            </div>
            {forumSettings.title}
          </button>
        )}
        {mobileSettings && (
          <MobileConnection
            show={selectedConnection === ConnectionType.Mobile}
          />
        )}
        {shareSettings && (
          <ShareConnection
            show={selectedConnection === ConnectionType.Share}
            twitterShareText={
              shareSettings.params.find(p => p.name === 'twitterShareText')
                .value
            }
          />
        )}
        {forumSettings && (
          <ForumConnection show={selectedConnection === ConnectionType.Forum} />
        )}
      </ConnectionButtonsWrapper>
    </ControlPanelSection>
  )
}

export default Connections
