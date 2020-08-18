import React, { FunctionComponent, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { animated, useSpring } from 'react-spring'
import styled from 'styled-components'

import BondChartScreen from 'modules/BondModules/BondChart/BondChart.container'
import BondTable from 'modules/BondModules/BondTable'
import FundingChat from 'modules/Funding_Chat/FundingChat.container'
import { ProjectHero } from 'components/project/ProjectHero'
import { BondsWrapperConnected as BondsWrapper } from '../../../common/components/Bonds/BondsWrapper/BondsWrapper'
import { AgentRoles } from 'types/models'
import { UserInfo } from 'modules/Account/types'
import { selectLocationProps } from 'modules/Router/router.selector'
import { selectIxo } from 'common/selector/ixo.selector'
import { Data } from 'modules/project/types'
import { Spinner } from 'common/components/Spinner'

const MemorizedSpinner = React.memo(
  () => <Spinner info="Loading..." />,
  (a, b) => true,
)
const StyledContainer = styled.div`
  display: flex;
  flex: 1;
`

export const Accounts: FunctionComponent<any> = ({ match }) => {
  const assistant =
    match.path.split('/')[match.path.split('/').length - 1] === 'assistant'
      ? true
      : false
  const location: any = useSelector(selectLocationProps)
  const ixo: any = useSelector(selectIxo)
  const [projectPublic, setProjectPublic] = useState(
    location?.state?.projectPublic
      ? location.state.projectPublic
      : null
  )
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

  const handleHasCapability = (roles: AgentRoles[]): boolean => {
    const userInfo: UserInfo | undefined = match.userInfo
    let found = false
    if (userInfo) {
      if (projectPublic.createdBy === userInfo.didDoc.did) {
        if (
          roles.some(val => {
            return val === AgentRoles.owners
          })
        ) {
          return true
        }
      }
      projectPublic.agents.forEach((agent: any) => {
        if (agent.did === userInfo.didDoc.did) {
          if (
            roles.some(val => {
              return val === agent.role
            })
          ) {
            found = true
          }
        }
      })
    }
    return found
  }

  const handleGetProjectData = (): void => {
    ixo.project
      .getProjectByProjectDid(match.params.projectDID)
      .then((response: any) => {
        const project: Data = response.data
        setProjectPublic(project)
      })
  }

  useEffect(() => {
    handleGetProjectData()
  }, [])
  if (projectPublic === null)
   return <MemorizedSpinner />
  return (
    <StyledContainer>
      <animated.div style={resizeMain}>
        <BondsWrapper {...match} enableAssistantButton>
          <h1 className="mobile-header">{projectPublic.title}</h1>
          <ProjectHero
            project={projectPublic}
            match={match}
            isDetail={true}
            onlyTitle
            hasCapability={handleHasCapability}
            assistantPanelToggle={assistantPanelToggle}
            enableAssistantButton
          />
          <BondChartScreen />
          <BondTable />
        </BondsWrapper>
      </animated.div>
      <animated.div style={resizeAssistantPanel}>
        <FundingChat match={match} assistantPanelToggle={assistantPanelToggle} />
      </animated.div>
    </StyledContainer>
  )
}
