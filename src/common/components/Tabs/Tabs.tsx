import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { MatchType } from '../../../types/models'
import { createTabsContainer } from './Tabs.styles'
import { Tooltip, TooltipPositions } from '../Tooltip/Tooltip'
import Lottie from 'react-lottie';
import activeAnimation from 'assets/animations/assistant/active.json'
import inactiveAnimation from 'assets/animations/assistant/inactive.json'
import hoverAnimation from 'assets/animations/assistant/hover.json'

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
  enableAssistantButton: boolean,
  match?: any
}

export const Tabs: React.SFC<Props> = ({
  buttons,
  matchType,
  activeTabColor,
  assistantPanelToggle,
  enableAssistantButton,
  match
}) => {
  const TabsContainer = createTabsContainer(activeTabColor)
  
  const [animation, setAnimation] = React.useState(inactiveAnimation);
  const [toggled, setToggled] = React.useState(false);
  const assistantButtonClicked = () => {
    assistantPanelToggle()
    if (toggled) {
      setAnimation(hoverAnimation)
      setToggled(false)
      return;
    }

    setToggled(true)
    setAnimation(activeAnimation);
  }
  return (
    <TabsContainer>
      {buttons.map((button, index) => {
        return button.linkClass !== 'in-active' ? (
          <NavLink
            className={button.linkClass ? button.linkClass : ''}
            exact={matchType === MatchType.exact}
            strict={matchType === MatchType.strict}
            to={{ pathname: button.path }}
            key={ index }
          >
            {button.iconClass && <i className={button.iconClass} />}
            {button.title && <p>{button.title}</p>}
          </NavLink>
        ) : (
          <Tooltip
            text="Coming Soon"
            key={index}
            position={TooltipPositions.Bottom}
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
      {enableAssistantButton && (
        <button 
          onClick={() => assistantButtonClicked()}
          onMouseEnter={() => !toggled ? setAnimation(hoverAnimation) : null}
          onMouseLeave={() => !toggled ? setAnimation(inactiveAnimation) : null}
        >
          <Lottie 
            height={40}
            width={40}
            options={{
              loop: true,
              autoplay: true,
              animationData: animation
            }}
          />
        </button>
      )}
    </TabsContainer>
  )
}
