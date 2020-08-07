import React from 'react'
import Down from 'assets/icons/Down'
import ConnectionIcon from 'assets/icons/Connections'
import Share from 'assets/icons/Share'
import Mobile from 'assets/icons/OpenOnMobile'
import Forum from 'assets/icons/Forum'
import { ControlPanelSection } from '../ControlPanel.styles'
import { ConnectionButtonsWrapper } from './Connections.styles'
import { ConnectionType, Widget, Control } from '../types'
import MobileConnection from './Mobile/Mobile'
import ShareConnection from './Share/Share'
import ForumConnection from './Forum/Forum'
import { Tooltip } from 'common/components/Tooltip'

interface Props {
  widget: Widget
  selectedConnection: ConnectionType
  handleConnectionClick: (connection: ConnectionType) => void
}

const icons = {
  Share,
  Mobile,
  Forum,
}

const Connections: React.FunctionComponent<Props> = ({
  widget: { controls, title },
  selectedConnection,
  handleConnectionClick,
}) => {
  const findControl = (type: ConnectionType): Control =>
    controls.find(conn => conn['@type'] === type)

  return (
    <ControlPanelSection>
      <h4>
        <div className="heading-icon">
          <ConnectionIcon />
        </div>
        {title}
        <div
          onClick={(): void => handleConnectionClick(null)}
          className={`arrow-icon ${selectedConnection ? 'active' : ''}`}
        >
          <Down width="16" fill="#BDBDBD" />
        </div>
      </h4>
      <ConnectionButtonsWrapper>
        {Object.keys(ConnectionType).map(key => {
          const connectionType = ConnectionType[key]
          const control = findControl(connectionType)
          return control ? (
            <Tooltip key={key} text={control.tooltip}>
              <button
                onClick={(): void => handleConnectionClick(connectionType)}
              >
                <div className="icon-wrapper">
                  {React.createElement(icons[control.icon], {
                    fill: control.iconColor,
                    width: 50,
                  })}
                </div>
                {control.title}
              </button>
            </Tooltip>
          ) : null
        })}
        {findControl(ConnectionType.Mobile) && (
          <MobileConnection
            show={selectedConnection === ConnectionType.Mobile}
          />
        )}
        {findControl(ConnectionType.Share) && (
          <ShareConnection
            show={selectedConnection === ConnectionType.Share}
            twitterShareText={
              findControl(ConnectionType.Share).parameters.find(
                p => p.name === 'twitterShareText',
              ).value
            }
          />
        )}
        {findControl(ConnectionType.Forum) && (
          <ForumConnection show={selectedConnection === ConnectionType.Forum} />
        )}
      </ConnectionButtonsWrapper>
    </ControlPanelSection>
  )
}

export default Connections
