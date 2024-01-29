import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { MatchType } from '../../types/models'
import { TabsContainer } from './Tabs.styles'
import Tooltip, { TooltipPosition } from '../Tooltip/Tooltip'
import Lottie from 'react-lottie'
import activeAnimation from 'assets/animations/assistant/active.json'
import inactiveAnimation from 'assets/animations/assistant/inactive.json'
import hoverAnimation from 'assets/animations/assistant/hover.json'
import AssistantContext from 'contexts/assistant'
import { HeaderTab } from 'components/Dashboard/types'

export interface Props {
  buttons: HeaderTab[]
  matchType: MatchType
  activeTabColor: string | undefined
  assistantPanelToggle?: () => void
  enableAssistantButton: boolean
}

const TabsComponent: React.FunctionComponent<Props> = ({
  buttons,
  matchType,
  activeTabColor,
  assistantPanelToggle,
  // enableAssistantButton,
}) => {
  const [animation, setAnimation] = React.useState(inactiveAnimation)
  const assistant = React.useContext(AssistantContext)
  const navigate = useNavigate()
  const location = useLocation()

  const assistantButtonClicked = (): void => {
    const isActive = assistant.active

    if (isActive) {
      setAnimation(hoverAnimation)

      if (location.pathname.includes('action')) {
        navigate(-1)
      } else {
        assistantPanelToggle!()
      }
      return
    }

    setAnimation(activeAnimation)
    assistantPanelToggle!()
  }

  const chooseAnimation = (): any => {
    if (assistant.active) {
      return activeAnimation
    }

    if (animation === activeAnimation) {
      return inactiveAnimation
    }

    return animation === hoverAnimation ? hoverAnimation : inactiveAnimation
  }

  return (
    <TabsContainer activeTabColor={activeTabColor || ''} assistantActivated={assistant.active}>
      {buttons.map((button, index) => {
        switch (button.linkClass) {
          case 'in-active':
            if (button.tooltip) {
              return (
                <Tooltip text={button.tooltip} key={index} position={TooltipPosition.Bottom}>
                  <NavLink
                    className={button.linkClass ? button.linkClass : ''}
                    // strict={matchType === MatchType.strict}
                    to={{ pathname: button.path, search: button.search }}
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
                // strict={matchType === MatchType.strict}
                to={{ pathname: button.path, search: button.search }}
                key={index}
              >
                {button.iconClass && <i className={button.iconClass} />}
                {button.title && <p>{button.title}</p>}
              </NavLink>
            )

          case 'restricted':
            return (
              <Tooltip text='Requires Authorisation' key={index} position={TooltipPosition.Bottom}>
                {/* Navlink strict */}
                <NavLink
                  className='in-active'
                  to={{ pathname: button.path, search: button.search }}
                >
                  {button.iconClass && <i className={button.iconClass} />}
                  {button.title && <p>{button.title}</p>}
                </NavLink>
              </Tooltip>
            )
          default:
            if (button.tooltip) {
              return (
                <Tooltip text={button.tooltip} key={index} position={TooltipPosition.Bottom}>
                  <NavLink
                    className={button.linkClass}
                    to={{ pathname: button.path, search: button.search }}
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
                to={{ pathname: button.path, search: button.search }}
                key={index}
              >
                {button.iconClass && <i className={button.iconClass} />}
                {button.title && <p>{button.title}</p>}
              </NavLink>
            )
        }
      })}
      <Tooltip text='Assistant in Training' position={TooltipPosition.Bottom}>
        <button
          className='d-flex justify-content-center align-items-center'
          onClick={(): void => assistantButtonClicked()}
          onMouseEnter={() => (!assistant.active ? setAnimation(hoverAnimation) : null)}
          onMouseLeave={() => (!assistant.active ? setAnimation(inactiveAnimation) : null)}
          style={{ cursor: 'pointer' }}
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

export const Tabs = TabsComponent
