import React, { FunctionComponent, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import styled from 'styled-components'

import BondChartScreen from 'modules/BondChart/BondChart.container'
import BondTable from 'modules/BondTable'
import FundingChat from 'modules/Funding_Chat/FundingChat.container'
// import BondOrders from 'modules/BondOrders/BondOrders.container'
// import { BondEvents } from 'modules/BondEvents/BondEvents.container'
import { BondsWrapperConnected as BondsWrapper } from '../BondsWrapper/BondsWrapper'

const StyledContainer = styled.div`
  display: flex;
`

export const Overview: FunctionComponent<any> = ({ match }) => {
  const [assistantPanelActive, setAssistantPanelActive] = useState(false)
  const [resizeMain, setResizeMain] = useSpring(() => ({
    width: '100%',
  }))
  const [resizeAssistantPanel, setResizeAssistantPanel] = useSpring(() => ({
    width: '0%',
    display: 'none',
  }))
  const assistantPanelToggle = () => {
    setResizeMain({
      width: assistantPanelActive ? '100%' : '80%',
    })
    setResizeAssistantPanel({
      width: assistantPanelActive ? '0%' : '20%',
      display: assistantPanelActive ? 'none' : 'block',
      max-height: '800px',
    })
    setAssistantPanelActive(!assistantPanelActive)
  }
  return (
    <StyledContainer>
      <animated.div style={resizeMain}>
        <BondsWrapper {...match} assistantPanelToggle={assistantPanelToggle}>
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
        <FundingChat match={match} />
      </animated.div>
    </StyledContainer>
  )
}
