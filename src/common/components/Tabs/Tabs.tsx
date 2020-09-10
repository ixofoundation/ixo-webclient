import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { MatchType } from '../../../types/models'
import { createTabsContainer } from './Tabs.styles'
import { Tooltip, TooltipPositions } from '../Tooltip/Tooltip'
import Lottie from 'react-lottie';
import activeAnimation from 'assets/animations/assistant/active.json'
import inactiveAnimation from 'assets/animations/assistant/inactive.json'
import hoverAnimation from 'assets/animations/assistant/hover.json'
import AssistantContext from 'common/contexts/Assistant'

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
}

export const Tabs: React.SFC<Props> = ({
  buttons,
  matchType,
  activeTabColor,
  assistantPanelToggle,
  enableAssistantButton
}) => {
  const TabsContainer = createTabsContainer(activeTabColor)
  
  const [animation, setAnimation] = React.useState(inactiveAnimation);
  const assistant = React.useContext(AssistantContext);
  
  const assistantButtonClicked = () => {
    const isActive = assistant.active;
    if (isActive) {
      setAnimation(hoverAnimation)
      assistantPanelToggle()
      return;
    }
    
    setAnimation(activeAnimation);
    assistantPanelToggle()
  }

  const chooseAnimation = () => {
    if (assistant.active) {
      return activeAnimation
    }

    if (animation === activeAnimation) {
      return inactiveAnimation
    }

    return animation === hoverAnimation ? hoverAnimation : inactiveAnimation;
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
          onMouseEnter={() => !assistant.active ? setAnimation(hoverAnimation) : null}
          onMouseLeave={() => !assistant.active ? setAnimation(inactiveAnimation) : null}
        >
          <Lottie 
            height={40}
            width={40}
            options={{
              loop: animation !== hoverAnimation,
              autoplay: true,
              animationData: chooseAnimation()
            }}
          />
        </button>
      )}
    </TabsContainer>
  )
}
