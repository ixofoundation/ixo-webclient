import React, { FunctionComponent, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import styled from 'styled-components'

// import BondChartScreen from 'modules/BondModules/BondChart/BondChart.container'
// import BondTable from 'modules/BondModules/BondTable'
import FundingChat from 'modules/Funding_Chat/FundingChat.container'
import { BondsWrapperConnected as BondsWrapper } from '../../../common/components/Bonds/BondsWrapper/BondsWrapper'

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
`

export const Accounts: FunctionComponent<any> = ({ match }) => {
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
        <BondsWrapper {...match} enableAssistantButton>
          {/* <BondChartScreen />
          <BondTable /> */}
        </BondsWrapper>
      </animated.div>
      <animated.div style={resizeAssistantPanel}>
        <FundingChat match={match} assistantPanelToggle={assistantPanelToggle} />
      </animated.div>
    </StyledContainer>
  )
}
