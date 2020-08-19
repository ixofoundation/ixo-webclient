import React, { FunctionComponent, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import styled from 'styled-components'

import FundingChat from 'modules/Funding_Chat/FundingChat.container'
import BondAccountTable from 'modules/BondModules/BondAccountTable'
import { BondsWrapperConnected as BondsWrapper } from 'common/components/Bonds/BondsWrapper/BondsWrapper'
import ProjectAccountWrapper from './components/ProjectAccountWrapper'
import ProjectAccount from './components/ProjectAccount'

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
          <ProjectAccountWrapper>
            <ProjectAccount count={7}></ProjectAccount>
            <ProjectAccount count={7}></ProjectAccount>
            <ProjectAccount count={7}></ProjectAccount>
            <ProjectAccount count={7}></ProjectAccount>
            <ProjectAccount count={7}></ProjectAccount>
            <ProjectAccount count={7}></ProjectAccount>
            <ProjectAccount count={7}></ProjectAccount>
          </ProjectAccountWrapper>
          <BondAccountTable />
        </BondsWrapper>
      </animated.div>
      <animated.div style={resizeAssistantPanel}>
        <FundingChat match={match} assistantPanelToggle={assistantPanelToggle} />
      </animated.div>
    </StyledContainer>
  )
}
