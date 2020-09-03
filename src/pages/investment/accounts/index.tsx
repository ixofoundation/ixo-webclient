import React, { FunctionComponent, useState, useEffect } from 'react'
import { animated, useSpring } from 'react-spring'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import FundingChat from 'modules/Funding_Chat/FundingChat.container'
import BondAccountTable from 'modules/BondModules/BondAccountTable'
import { BondsWrapperConnected as BondsWrapper } from 'common/components/Investment/Wrapper'
import ProjectAccountWrapper from './components/ProjectAccountWrapper'
import ProjectAccount from './components/ProjectAccount'
import { getBondAccounts } from 'modules/BondModules/BondAccount/BondAccount.action'
import { selectPathnameProps } from 'modules/Router/router.selector'

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
`

export const Accounts: FunctionComponent<any> = ({ match }) => {
  const dispatch = useDispatch()
  const pathName = useSelector(selectPathnameProps)
  const projectDID = pathName.split('/')[2]
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
  const [selected, setSelected] = useState(0)

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

  useEffect(() => {
    dispatch(getBondAccounts(projectDID))
  }, [])
  return (
    <StyledContainer>
      <animated.div style={resizeMain}>
        <BondsWrapper {...match} enableAssistantButton>
          <ProjectAccountWrapper>
            <ProjectAccount count={7} selected={selected === 0} onSelect={(): void => setSelected(0)}></ProjectAccount>
            <ProjectAccount count={7} selected={selected === 1} onSelect={(): void => setSelected(1)}></ProjectAccount>
            <ProjectAccount count={7} selected={selected === 2} onSelect={(): void => setSelected(2)}></ProjectAccount>
            <ProjectAccount count={7} selected={selected === 3} onSelect={(): void => setSelected(3)}></ProjectAccount>
            <ProjectAccount count={7} selected={selected === 4} onSelect={(): void => setSelected(4)}></ProjectAccount>
            <ProjectAccount count={7} selected={selected === 5} onSelect={(): void => setSelected(5)}></ProjectAccount>
            <ProjectAccount count={7} selected={selected === 6} onSelect={(): void => setSelected(6)}></ProjectAccount>
          </ProjectAccountWrapper>
          <BondAccountTable />
        </BondsWrapper>
      </animated.div>
      {
        assistant && <animated.div style={resizeAssistantPanel}>
            <FundingChat match={match} assistantPanelToggle={assistantPanelToggle} />
          </animated.div>
      }
    </StyledContainer>
  )
}
