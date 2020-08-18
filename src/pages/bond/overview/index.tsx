import React, { FunctionComponent, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import styled from 'styled-components'

import BondChartScreen from 'modules/BondChart/BondChart.container'
import BondTable from 'modules/BondTable'
import FundingChat from 'modules/Funding_Chat/FundingChat.container'
// import BondOrders from 'modules/BondOrders/BondOrders.container'
// import { BondEvents } from 'modules/BondEvents/BondEvents.container'
import { BondsWrapperConnected as BondsWrapper } from '../../../common/components/Bonds/BondsWrapper/BondsWrapper'

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
`

export const Overview: FunctionComponent<any> = ({ match }) => {
  const assistant =
    match.path.split('/')[match.path.split('/').length - 1] === 'assistant'
      ? true
      : false
  const [assistantPanelActive, setAssistantPanelActive] = useState(assistant)
  const [resizeMain, setResizeMain] = useSpring(() => ({
    width: assistant ? '75%' : '100%',
  }))
  const [resizeAssistantPanel, setResizeAssistantPanel] = useSpring(() => ({
    width: assistant ? '25%' : '0%',
    display: assistant ? 'block' : 'none',
    background: '#F0F3F9'
  }))
  const assistantPanelToggle = () => {
    setResizeMain({
      width: assistantPanelActive ? '100%' : '75%',
    })
    setResizeAssistantPanel({
      width: assistantPanelActive ? '0%' : '25%',
      display: assistantPanelActive ? 'none' : 'block',
    })
    setAssistantPanelActive(!assistantPanelActive)
  }
  return (
    <StyledContainer>
      <animated.div style={resizeMain}>
        <BondsWrapper {...match} assistantPanelToggle={assistantPanelToggle} enableAssistantButton>
          <BondChartScreen />
          <BondTable />
          {/* <div className="BondsWrapper_panel">
            <Route
              exact
              path={[
                `/projects/${projectDID}/bonds/${bondDID}/overview/charts`,
                `/projects/${projectDID}/bonds/${bondDID}/overview/`,
                `/projects/${projectDID}/bonds/${bondDID}`,
              ]}
              component={BondChartScreen}
            />
            <Route
              exact
              path={`/projects/${projectDID}/bonds/${bondDID}/overview/trades`}
              component={BondOrders}
            />
            <Route
              exact
              path={`/projects/${projectDID}/bonds/${bondDID}/overview/events`}
              component={BondEvents}
            />
          </div> */}
        </BondsWrapper>
      </animated.div>
      <animated.div style={resizeAssistantPanel}>
        <FundingChat match={match} assistantPanelToggle={assistantPanelToggle} />
      </animated.div>
    </StyledContainer>
  )
}
