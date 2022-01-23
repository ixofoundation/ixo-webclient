import * as React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { MatchType } from '../../../types/models'
import { createTabsContainer } from './Tabs.styles'
import Tooltip, { TooltipPosition } from '../Tooltip/Tooltip'
import Lottie from 'react-lottie'
import activeAnimation from 'assets/animations/assistant/active.json'
import inactiveAnimation from 'assets/animations/assistant/inactive.json'
import hoverAnimation from 'assets/animations/assistant/hover.json'
import AssistantContext from 'common/contexts/Assistant'

export interface Button {
  linkClass?: string
  iconClass: string
  title?: string
  path: string
  tooltip?: string
}

export interface Props {
  buttons: Button[]
  matchType: MatchType
  activeTabColor: string | undefined
  assistantPanelToggle?: () => void
  enableAssistantButton: boolean
  history: any
  location: any
  match: any
}

const TabsComponent: React.FunctionComponent<Props> = ({
  buttons,
  matchType,
  activeTabColor,
  assistantPanelToggle,
  enableAssistantButton,
  location,
  history,
}) => {
  const [animation, setAnimation] = React.useState(inactiveAnimation)
  const assistant = React.useContext(AssistantContext)

  const assistantButtonClicked = (): void => {
    const isActive = assistant.active

    if (isActive) {
      setAnimation(hoverAnimation)

      if (location.pathname.includes('action')) {
        history.goBack()
      } else {
        assistantPanelToggle()
      }
      return
    }

    setAnimation(activeAnimation)
    assistantPanelToggle()
  }

  const chooseAnimation = () => {
    if (assistant.active) {
      return activeAnimation
    }

    if (animation === activeAnimation) {
      return inactiveAnimation
    }

    return animation === hoverAnimation ? hoverAnimation : inactiveAnimation
  }

  const TabsContainer = createTabsContainer(activeTabColor, assistant.active)

  return (
    <TabsContainer>
      {buttons.map((button, index) => {
        switch (button.linkClass) {
          case 'in-active':
            if (button.tooltip) {
              return (
                <Tooltip
                  text={button.tooltip}
                  key={index}
                  position={TooltipPosition.Bottom}
                >
                  <NavLink
                    className={button.linkClass ? button.linkClass : ''}
                    exact={matchType === MatchType.exact}
                    strict={matchType === MatchType.strict}
                    to={{ pathname: button.path }}
                    key={index}
                  >
                    {button.iconClass && <i className={button.iconClass} />}
                    {button.title && <p>{button.title}</p>}
                  </NavLink>
                </Tooltip>
              )
            }

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
              </NavLink>
            )

          case 'restricted':
            return (
              <Tooltip
                text="Requires Authorisation"
                key={index}
                position={TooltipPosition.Bottom}
              >
                <NavLink
                  className="in-active"
                  exact={matchType === MatchType.exact}
                  strict={matchType === MatchType.strict}
                  to={{ pathname: button.path }}
                >
                  {button.iconClass && <i className={button.iconClass} />}
                  {button.title && <p>{button.title}</p>}
                </NavLink>
              </Tooltip>
            )
          default:
            if (button.tooltip) {
              return (
                <Tooltip
                  text={button.tooltip}
                  key={index}
                  position={TooltipPosition.Bottom}
                >
                  <NavLink
                    className={button.linkClass}
                    exact={matchType === MatchType.exact || button.path === '/'}
                    strict={matchType === MatchType.strict}
                    to={{ pathname: button.path }}
                  >
                    {button.iconClass && <i className={button.iconClass} />}
                    {button.title && <p>{button.title}</p>}
                  </NavLink>
                </Tooltip>
              )
            }

            return (
              <NavLink
                className={button.linkClass}
                exact={matchType === MatchType.exact}
                strict={matchType === MatchType.strict}
                to={{ pathname: button.path }}
                key={index}
              >
                {button.iconClass && <i className={button.iconClass} />}
                {button.title && <p>{button.title}</p>}
              </NavLink>
            )
        }
      })}
      <Tooltip text="Assistant in Training" position={TooltipPosition.Bottom}>
        <button className="d-flex justify-content-center align-items-center">
          <Lottie
            height={40}
            width={40}
            options={{
              loop: false,
              autoplay: true,
              animationData: chooseAnimation(),
            }}
          />
        </button>
      </Tooltip>
      {/* {enableAssistantButton && (
        <button
          onClick={() => assistantButtonClicked()}
          onMouseEnter={() =>
            !assistant.active ? setAnimation(hoverAnimation) : null
          }
          onMouseLeave={() =>
            !assistant.active ? setAnimation(inactiveAnimation) : null
          }
        >
          <Lottie
            height={40}
            width={40}
            options={{
              loop: false,
              autoplay: true,
              animationData: chooseAnimation(),
            }}
          />
        </button>
      )} */}
    </TabsContainer>
  )
}

export const Tabs = withRouter(TabsComponent)
