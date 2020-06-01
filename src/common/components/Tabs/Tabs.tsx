import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { MatchType } from '../../../types/models'
import { createTabsContainer } from './Tabs.styles'

export interface Button {
  linkClass?: string
  iconClass: string
  title?: string
  path: string
  toolTip: string
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
        return (
          <NavLink
            className={button.linkClass ? button.linkClass : ''}
            exact={matchType === MatchType.exact}
            strict={matchType === MatchType.strict}
            to={{ pathname: button.path }}
            key={index}
          >
            {button.iconClass && <i className={button.iconClass} />}
            {button.title && <p>{button.title}</p>}
            {button.toolTip && (
              <div className="tooltip">
                <span className="tooltip-text">{button.toolTip}</span>
              </div>
            )}
          </NavLink>
        )
      })}
    </TabsContainer>
  )
}
