import React from 'react'
import AppIcon from '../../../../assets/icons/Apps'
import DownIcon from '../../../../assets/icons/Down'
import { AppButtonsWrapper } from './Apps.styles'
import { ControlPanelSection } from '../ControlPanel.styles'
import { AppsSection } from '../types'
import RiotChat from './RiotChat/RiotChat'

interface Props {
  appsSection: AppsSection
  showMore: boolean
  toggleShowMore: () => void
}

const Apps: React.FunctionComponent<Props> = ({
  appsSection: { title, apps },
  showMore,
  toggleShowMore,
}) => {
  //TODO when we have more than 3 apps then set buttonClassName of apps to...
  // showMore ? 'show' : 'hide'

  const riotChatSettings = apps.find(app => app['@type'] === 'RiotChat')

  return (
    <ControlPanelSection>
      <h4>
        <div className="heading-icon">
          <AppIcon />
        </div>
        {title}
        {apps.length > 3 && (
          <div
            className={`arrow-icon ${showMore ? 'active' : ''}`}
            onClick={toggleShowMore}
          >
            <DownIcon width="16" fill="#BDBDBD" />
          </div>
        )}
      </h4>
      <AppButtonsWrapper>
        <RiotChat buttonClassName="show" app={riotChatSettings} />
      </AppButtonsWrapper>
    </ControlPanelSection>
  )
}

export default Apps
