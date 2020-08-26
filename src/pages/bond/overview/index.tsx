import React, { FunctionComponent, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import BondChartScreen from 'modules/BondModules/BondChart/index.container'
import BondTable from 'modules/BondModules/BondTable'
import FundingChat from 'modules/Funding_Chat/FundingChat.container'
import Header from 'common/components/Bonds/BondsSummaryHeader/Header'
// import BondOrders from 'modules/BondOrders/BondOrders.container'
// import { BondEvents } from 'modules/BondEvents/BondEvents.container'
import { BondsWrapperConnected as BondsWrapper } from 'common/components/Bonds/BondsWrapper/BondsWrapper'
import { selectLocationProps } from 'modules/Router/router.selector'
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
  const [selectedHeader, setSelectedHeader] = useState('price')
  const location: any = useSelector(selectLocationProps)
  const projectPublic = location.state && location.state.projectPublic
        ? location.state.projectPublic
        : null
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
          <h1 className="mobile-header">{projectPublic?.title}</h1>
          <Header bondDID={match.params.bondDID} selectedHeader={selectedHeader} setSelectedHeader={setSelectedHeader} />
          <BondChartScreen selectedHeader={selectedHeader} />
          <BondTable />
        </BondsWrapper>
      </animated.div>
      <animated.div style={resizeAssistantPanel}>
        <FundingChat match={match} assistantPanelToggle={assistantPanelToggle} />
      </animated.div>
    </StyledContainer>
  )
}
