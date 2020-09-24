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
import Tooltip from 'common/components/Tooltip/Tooltip'

interface Props {
  widget: Widget
  selectedConnection: ConnectionType | null
  handleConnectionClick: (connection: ConnectionType) => void
  toggleShowConnections: () => void
  showMore: boolean
}

const icons: { [key: string]: any } = {
  Share,
  Mobile,
  Forum,
}

const Connections: React.FunctionComponent<Props> = ({
  widget: { controls, title },
  selectedConnection,
  handleConnectionClick,
  toggleShowConnections,
  showMore
}) => {
  const findControl = (type: ConnectionType): Control | undefined =>
    controls?.find((conn) => conn['@type'] === type)

  return (
    <ControlPanelSection>
      <h4>
        <div className="heading-icon">
          <ConnectionIcon />
        </div>
        {title}
        {
          controls.length >= 4 &&
            <div
              onClick={ toggleShowConnections }
              className={`arrow-icon ${showMore ? 'active' : ''}`}
            >
              <Down width="16" fill="#A5ADB0" />
            </div>
        }
      </h4>
      <ConnectionButtonsWrapper>
        {Object.keys(ConnectionType).map((key: string) => {
          /* @ts-ignore */
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
              findControl(ConnectionType?.Share)?.parameters.find(
                (p) => p.name === 'twitterShareText',
              )?.value!
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
