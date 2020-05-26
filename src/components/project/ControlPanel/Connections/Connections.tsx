import React from 'react'
import Down from '../../../../assets/icons/Down'
import ConnectionIcon from '../../../../assets/icons/Connections'
import ShareIcon from '../../../../assets/icons/Share'
import MobileIcon from '../../../../assets/icons/OpenOnMobile'
import ForumIcon from '../../../../assets/icons/Forum'
import { ControlPanelSection } from '../ControlPanel.styles'
import { ConnectionButtonsWrapper } from './Connections.styles'
import { ConnectionType, Widget } from '../types'
import MobileConnection from './Mobile/Mobile'
import ShareConnection from './Share/Share'
import ForumConnection from './Forum/Forum'
import { Tooltip } from 'src/components/common/Tooltip'

interface Props {
  widget: Widget
  selectedConnection: string
  handleConnectionClick: (connection: string) => void
}

const Connections: React.FunctionComponent<Props> = ({
  widget: { controls, title },
  selectedConnection,
  handleConnectionClick,
}) => {
  const mobileControl = controls.find(
    conn => conn['@type'] === ConnectionType.Mobile,
  )
  const shareControl = controls.find(
    conn => conn['@type'] === ConnectionType.Share,
  )
  const forumControl = controls.find(
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
          onClick={(): void => handleConnectionClick(null)}
          className={`arrow-icon ${selectedConnection ? 'active' : ''}`}
        >
          <Down width="16" fill="#BDBDBD" />
        </div>
      </h4>
      <ConnectionButtonsWrapper>
        {mobileControl && (
          <Tooltip text={mobileControl.tooltip}>
            <button
              onClick={(): void => handleConnectionClick(ConnectionType.Mobile)}
            >
              <div className="icon-wrapper">
                <MobileIcon fill="#49BFE0" width="50" />
              </div>
              {mobileControl.title}
            </button>
          </Tooltip>
        )}
        {shareControl && (
          <Tooltip text={shareControl.tooltip}>
            <button
              onClick={(): void => handleConnectionClick(ConnectionType.Share)}
            >
              <div className="icon-wrapper">
                <ShareIcon fill="#49BFE0" width="50" />
              </div>
              {shareControl.title}
            </button>
          </Tooltip>
        )}
        {forumControl && (
          <Tooltip text={forumControl.tooltip}>
            <button
              onClick={(): void => handleConnectionClick(ConnectionType.Forum)}
            >
              <div className="icon-wrapper">
                <ForumIcon fill="#49BFE0" width="50" />
              </div>
              {forumControl.title}
            </button>
          </Tooltip>
        )}
        {mobileControl && (
          <MobileConnection
            show={selectedConnection === ConnectionType.Mobile}
          />
        )}
        {shareControl && (
          <ShareConnection
            show={selectedConnection === ConnectionType.Share}
            twitterShareText={
              shareControl.parameters.find(p => p.name === 'twitterShareText')
                .value
            }
          />
        )}
        {forumControl && (
          <ForumConnection show={selectedConnection === ConnectionType.Forum} />
        )}
      </ConnectionButtonsWrapper>
    </ControlPanelSection>
  )
}

export default Connections
