import React, { useState } from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'
import styled from 'styled-components'
import { Overview } from 'pages/bond/overview'
import { Accounts } from 'pages/bond/accounts'
import Exchange from 'pages/bond/exchange'
import Orders from 'pages/bond/orders'
import AssistantContext from 'common/contexts/Assistant'
import FundingChat from 'modules/FundingChat/FundingChat.container'
import { BondsWrapperConnected as BondsWrapper } from 'common/components/Bonds/BondsWrapper/BondsWrapper'
import { useWindowSize } from 'common/hooks'

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
`

export const BondRoutes: React.SFC<Pick<RouteComponentProps, 'match'>> = ({
  match,
}) => {
  const windowSize = useWindowSize()
  console.log('windowsize.width', windowSize.width)
  const assistant =
    match.path.split('/')[match.path.split('/').length - 1] === 'assistant'
      ? true
      : false
  const [assistantPanelActive, setAssistantPanelActive] = useState(assistant)
  const [resizeMain, setResizeMain] = useSpring(() => ({
    width: assistant ? windowSize.width < 768 ? '0%' : '75%' : '100%',
  }))
  const [resizeAssistantPanel, setResizeAssistantPanel] = useSpring(() => ({
    width: assistant ? windowSize.width < 768 ? '100%' : '25%' : '0%',
    display: assistant ? 'block' : 'none',
    background: '#F0F3F9',
  }))

  const assistantPanelToggle = (): void => {
    setResizeMain({
      width: !assistantPanelActive ? windowSize.width < 768 ? '0%' : '75%' : '100%',
    })
    setResizeAssistantPanel({
      width: !assistantPanelActive ? windowSize.width < 768 ? '100%' : '25%' : '0%',
      display: assistantPanelActive ? 'none' : 'block',
    })
    setAssistantPanelActive(!assistantPanelActive)
  }

  return (
    <AssistantContext.Provider value={{ active: assistantPanelActive }}>
      <StyledContainer>
        <animated.div style={resizeMain}>
          <BondsWrapper
            {...match}
            assistantPanelToggle={assistantPanelToggle}
            enableAssistantButton
          >
            <Switch>
              <Route
                exact
                path={`${match.path}/overview`}
                component={Overview}
              />
              <Route
                exact
                path={`${match.path}/accounts`}
                component={Accounts}
              />
              <Route
                exact
                path={`${match.path}/exchange`}
                component={Exchange}
              />
              <Route exact path={`${match.path}/orders`} component={Orders} />
              <Route path={`${match.path}/assistant`} component={Overview} />
              <Route path={`${match.path}`} component={Overview} />
            </Switch>
          </BondsWrapper>
        </animated.div>
        <animated.div style={resizeAssistantPanel}>
          {assistantPanelActive && (
            <FundingChat
              match={match}
              assistantPanelToggle={assistantPanelToggle}
            />
          )}
        </animated.div>
      </StyledContainer>
    </AssistantContext.Provider>
  )
}

export default BondRoutes
