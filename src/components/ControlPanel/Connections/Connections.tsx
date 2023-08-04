import React from 'react'
import Down from 'assets/icons/Down'
import ConnectionIcon from 'assets/icons/Connections'
import Twitter from 'assets/icons/Twitter'
import Discord from 'assets/icons/Discord'
import Mobile from 'assets/icons/OpenOnMobile'
import Forum from 'assets/icons/Forum'
import { ControlPanelSection } from '../ControlPanel.styles'
import { ConnectionButtonsWrapper } from './Connections.styles'
import { ConnectionType, Widget } from '../types'
import Tooltip from 'components/Tooltip/Tooltip'
import { useWindowSize } from 'hooks/window'
import { deviceWidth } from 'constants/device'
import { shareToTwitter } from 'utils/socialMedia'

interface Props {
  widget: Widget
  selectedConnection: ConnectionType | null
  handleConnectionClick: (connection: ConnectionType) => void
  toggleShowConnections: () => void
  showMore: boolean
}

const icons: { [key: string]: any } = {
  Twitter,
  Mobile,
  Discord,
  Forum,
}

const Connections: React.FunctionComponent<Props> = ({
  widget,
  selectedConnection,
  handleConnectionClick,
  toggleShowConnections,
  showMore,
}) => {
  const title = widget?.title
  const controls = widget?.controls ?? []
  const windowSize = useWindowSize()

  const handleClick = (connectionType: any, endpoint: any): void => {
    if (connectionType === ConnectionType.Share) {
      shareToTwitter(endpoint)
    } else if (connectionType === ConnectionType.External) {
      window.open(endpoint, '_blank')
    }
    handleConnectionClick(connectionType)
  }

  return (
    <ControlPanelSection>
      <h4>
        <div className='heading-icon'>
          <ConnectionIcon />
        </div>
        {title}
        {controls.length >= 4 && (
          <div onClick={toggleShowConnections} className={`arrow-icon ${showMore ? 'active' : ''}`}>
            <Down width='16' fill='#A5ADB0' />
          </div>
        )}
      </h4>
      <ConnectionButtonsWrapper>
        {controls.map((control) => {
          /* @ts-ignore */
          const connectionType = control['@type']

          // Mobile view
          if (connectionType === ConnectionType.Mobile) {
            if (windowSize!.width! <= deviceWidth.mobile) {
              return (
                <Tooltip key={control.title} text={'Connect to ixo Mobile'}>
                  <button onClick={(): void => handleClick(connectionType, control.endpoint)}>
                    <div className={`icon-wrapper ${selectedConnection === connectionType ? 'selected' : ''}`}>
                      {React.createElement(icons[control.icon], {
                        fill: control.iconColor,
                        width: 50,
                      })}
                    </div>
                    {control.title}
                  </button>
                </Tooltip>
              )
            }
          }

          return (
            <Tooltip key={control.title} text={control.tooltip}>
              <button onClick={(): void => handleClick(connectionType, control.endpoint)}>
                <div className={`icon-wrapper ${selectedConnection === connectionType ? 'selected' : ''}`}>
                  {icons[control.icon] &&
                    React.createElement(icons[control.icon], {
                      fill: control.iconColor,
                      width: 50,
                    })}
                </div>
                {control.title}
              </button>
            </Tooltip>
          )
        })}
      </ConnectionButtonsWrapper>
    </ControlPanelSection>
  )
}

export default Connections
