import React from 'react'
import Down from '../../../../assets/icons/Down'
import ConnectionIcon from '../../../../assets/icons/Connections'
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
  const mobileConnectionSettings = connections.find(
    conn => conn['@type'] === ConnectionType.Mobile,
  )
  const shareConnectionSettings = connections.find(
    conn => conn['@type'] === ConnectionType.Share,
  )
  const forumConnectionSettings = connections.find(
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
        {mobileConnectionSettings && (
          <MobileConnection
            title={mobileConnectionSettings.title}
            show={selectedConnection === ConnectionType.Mobile}
            toggleShow={(): void => toggleConnection(ConnectionType.Mobile)}
          />
        )}
        {shareConnectionSettings && (
          <ShareConnection
            title={shareConnectionSettings.title}
            show={selectedConnection === ConnectionType.Share}
            toggleShow={(): void => toggleConnection(ConnectionType.Share)}
          />
        )}
        {forumConnectionSettings && (
          <ForumConnection
            title={forumConnectionSettings.title}
            show={selectedConnection === ConnectionType.Forum}
            toggleShow={(): void => toggleConnection(ConnectionType.Forum)}
          />
        )}
      </ConnectionButtonsWrapper>
    </ControlPanelSection>
  )
}

export default Connections
