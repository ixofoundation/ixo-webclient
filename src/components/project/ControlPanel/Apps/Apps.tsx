import React from 'react'
import App from '../../../../assets/icons/Apps'
import Down from '../../../../assets/icons/Down'
import Riot from '../../../../assets/icons/Riot'
import { Tooltip } from '../../../common/Tooltip'
import { AppButtonsWrapper } from './Apps.styles'
import { ControlPanelSection } from '../ControlPanel.styles'
import { SchemaApp } from '../types'

interface Props {
  title: string
  apps: SchemaApp[]
  showMore: boolean
  toggleShowMore: () => void
}

const Apps: React.FunctionComponent<Props> = ({
  title,
  apps,
  showMore,
  toggleShowMore,
}) => {
  return (
    <ControlPanelSection key={title}>
      <h4>
        <div className="heading-icon">
          <App />
        </div>
        <div
          className={`arrow-icon ${showMore ? 'active' : ''}`}
          onClick={toggleShowMore}
        >
          <Down width="16" fill="#BDBDBD" />
        </div>
      </h4>
      <AppButtonsWrapper>
        {apps.map((app, index) => {
          let Icon
          const iconWidth = 36
          switch (app.icon) {
            case 'Riot':
              Icon = <Riot width={iconWidth} />
          }

          return (
            <Tooltip text={app.description} key={app.title}>
              <button
                className={index > 3 ? (showMore ? 'show' : 'hide') : 'show'}
              >
                <div
                  className="icon-wrapper"
                  style={{
                    background: app.backgroundColor,
                  }}
                >
                  {Icon}
                </div>
                {title}
              </button>
            </Tooltip>
          )
        })}
      </AppButtonsWrapper>
    </ControlPanelSection>
  )
}

export default Apps
