import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { MatchType } from '../../../types/models'
import { createTabsContainer } from './Tabs.styles'
import { Tooltip, TooltipPositions } from '../Tooltip'

export interface Button {
  linkClass?: string
  iconClass: string
  title?: string
  path: string
}

export interface Props {
  buttons: Button[]
  matchType: MatchType
  activeTabColor: string | undefined
  assistantPanelToggle: () => void
  enableAssistantButton: boolean
}

export const Tabs: React.SFC<Props> = ({
  buttons,
  matchType,
  activeTabColor,
  assistantPanelToggle,
  enableAssistantButton
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
        ) : (
            <Tooltip
              text="Coming Soon"
              key={index}
              position={TooltipPositions.bottom}
            >
              <NavLink
                className={button.linkClass}
                exact={matchType === MatchType.exact}
                strict={matchType === MatchType.strict}
                to={{ pathname: button.path }}
              >
                {button.iconClass && <i className={button.iconClass} />}
                {button.title && <p>{button.title}</p>}
              </NavLink>
            </Tooltip>
          )
      })}
      {
        enableAssistantButton && (
          <button onClick={() => assistantPanelToggle()}>pluse</button>
        )
      }
    </TabsContainer>
  )
}
