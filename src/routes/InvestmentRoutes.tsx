import React, { useEffect, useState } from 'react'
import { Route, Switch, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'
import { useDispatch, useSelector } from 'react-redux'

import FundingChat from 'modules/Funding_Chat/FundingChat.container'
import { BondsWrapperConnected as BondsWrapper } from 'common/components/Investment/Wrapper'
import { getBondAccounts } from 'modules/BondModules/BondAccount/BondAccount.action'
import { selectPathnameProps } from 'modules/Router/router.selector'

import { Accounts } from 'pages/investment/accounts'

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
`
export const BondRoutes: React.SFC<Pick<RouteComponentProps, 'match'>> = ({
  match,
}) => {
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
        <BondsWrapper {...match}>
          <Switch>
            <Route exact path={`${match.path}/funds/accounts`} component={Accounts} />
          </Switch>
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

export default BondRoutes
