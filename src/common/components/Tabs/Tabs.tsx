import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { MatchType } from '../../../types/models'
import { createTabsContainer } from './Tabs.styles'
import { Tooltip, TooltipPositions } from '../../../components/common/Tooltip'

export interface Button {
  linkClass?: string
  iconClass: string
  title?: string
  path: string
}

export interface Props {
  buttons: Button[]
  matchType: MatchType
  activeTabColor: string
}

export const Tabs: React.SFC<Props> = ({
  buttons,
  matchType,
  activeTabColor,
}) => {
  const TabsContainer = createTabsContainer(activeTabColor)

  return (
    <TabsContainer>
      {buttons.map((button, index) => {
        return button.linkClass !== 'in-active' ? (
          <NavLink
            className={button.linkClass ? button.linkClass : ''}
            exact={matchType === MatchType.exact}
            strict={matchType === MatchType.strict}
            to={{ pathname: button.path }}
          >
            {button.iconClass && <i className={button.iconClass} />}
            {button.title && <p>{button.title}</p>}
          </NavLink>
        ) : button.linkClass === 'in-active' ? (
          <Tooltip
            text="Coming Soon"
            key={index}
            position={TooltipPositions.bottom}
          >
            <NavLink
              className={button.linkClass ? button.linkClass : ''}
              exact={matchType === MatchType.exact}
              strict={matchType === MatchType.strict}
              to={{ pathname: button.path }}
            >
              {button.iconClass && <i className={button.iconClass} />}
              {button.title && <p>{button.title}</p>}
            </NavLink>
          </Tooltip>
        ) : null
      })}
    </TabsContainer>
  )
}
