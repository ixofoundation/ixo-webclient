import React from 'react'
import AppIcon from 'assets/icons/Apps'
import DownIcon from 'assets/icons/Down'
import { AppButtonsWrapper } from './Apps.styles'
import { ControlPanelSection } from '../ControlPanel.styles'
import { Widget } from '../types'
import RiotChat from './RiotChat/RiotChat'

interface Props {
  widget: Widget
  showMore: boolean
  toggleShowMore: () => void
}

const Apps: React.FunctionComponent<Props> = ({
  widget: { title, controls },
  showMore,
  toggleShowMore,
}) => {
  //TODO when we have more than 3 apps then set buttonClassName of apps to...
  // showMore ? 'show' : 'hide'

  const riotChatControl = controls.find(
    (control) => control['@type'] === 'RiotChat',
  )

  return (
    <ControlPanelSection>
      <h4>
        <div className="heading-icon">
          <AppIcon />
        </div>
        {title}
        {controls.length > 3 && (
          <div
            className={`arrow-icon ${showMore ? 'active' : ''}`}
            onClick={toggleShowMore}
          >
            <DownIcon width="16" fill="#BDBDBD" />
          </div>
        )}
      </h4>
      <AppButtonsWrapper>
        {riotChatControl && (
          <RiotChat buttonClassName="show" control={riotChatControl} />
        )}
      </AppButtonsWrapper>
    </ControlPanelSection>
  )
}

export default Apps
