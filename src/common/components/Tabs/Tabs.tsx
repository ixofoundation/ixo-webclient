import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { MatchType } from '../../../types/models'
import { TabsContainer } from './Tabs.styles'

export interface Button {
  linkClass?: string
  iconClass: string
  title?: string
  path: string
  state?: any
}

export interface Props {
  buttons: Button[]
  matchType: MatchType
}

export const Tabs: React.SFC<Props> = props => {
  return (
    <TabsContainer>
      {props.buttons.map((button, index) => {
        return (
          <NavLink
            className={button.linkClass ? button.linkClass : ''}
            exact={props.matchType === MatchType.exact}
            strict={props.matchType === MatchType.strict}
            to={{ pathname: button.path }}
            key={index}
          >
            {button.iconClass && <i className={button.iconClass} />}
            {button.title && <p>{button.title}</p>}
          </NavLink>
        )
      })}
    </TabsContainer>
  )
}
