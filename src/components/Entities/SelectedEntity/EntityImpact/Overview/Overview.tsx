import { LatLng } from 'components/Widgets/WorldMap/WorldMap'
import { RootState } from 'redux/types'
import * as accountSelectors from 'redux/account/account.selectors'
import { AgentRole } from 'redux/account/account.types'
import { Agent } from 'types/entities'
import React from 'react'
import { connect } from 'react-redux'
import * as entityUtils from 'utils/entities'
import * as entitySelectors from 'redux/selectedEntity/selectedEntity.selectors'
import { Entity } from 'redux/selectedEntity/selectedEntity.types'
import Dashboard from './Components/Dashboard/Dashboard'

interface Props {
  did: string
  goal: string
  creatorDid: string
  userDid: string
  agents: Agent[]
  serviceProvidersCount: number
  serviceProvidersPendingCount: number
  evaluatorsCount: number
  evaluatorsPendingCount: number
  claims: any[] // TODO - give type
  requiredClaimsCount: number
  successfulClaimsCount: number
  pendingClaimsCount: number
  rejectedClaimsCount: number
  disputedClaimsCount: number
  remainingClaimsCount: number
  latLng: LatLng
  entity: Entity
  bondDid: string
}

const Overview: React.FunctionComponent<Props> = ({
  did,
  creatorDid,
  userDid,
  agents,
  serviceProvidersCount,
  serviceProvidersPendingCount,
  evaluatorsCount,
  evaluatorsPendingCount,
  claims,
  requiredClaimsCount,
  successfulClaimsCount,
  pendingClaimsCount,
  rejectedClaimsCount,
  disputedClaimsCount,
  remainingClaimsCount,
  latLng,
  entity,
  goal,
  bondDid,
}) => {
  return (
    <Dashboard
      did={did}
      bondDid={bondDid}
      goal={goal}
      serviceProvidersCount={serviceProvidersCount}
      serviceProvidersPendingCount={serviceProvidersPendingCount}
      evaluatorsCount={evaluatorsCount}
      evaluatorsPendingCount={evaluatorsPendingCount}
      claims={claims}
      requiredClaimsCount={requiredClaimsCount}
      successfulClaimsCount={successfulClaimsCount}
      pendingClaimsCount={pendingClaimsCount}
      rejectedClaimsCount={rejectedClaimsCount}
      disputedClaimsCount={disputedClaimsCount}
      remainingClaimsCount={remainingClaimsCount}
      agents={agents}
      latLng={latLng}
      showAgentLinks={entityUtils.isUserInRolesOfEntity(userDid, creatorDid, agents, [AgentRole.Owner])}
      showClaimLinks={entityUtils.isUserInRolesOfEntity(userDid, creatorDid, agents, [
        AgentRole.Owner,
        AgentRole.Evaluator,
        AgentRole.ServiceProvider,
        AgentRole.Investor,
      ])}
      entityClaims={entity.entityClaims.items}
    />
  )
}

const mapStateToProps = (state: RootState): any => ({
  did: entitySelectors.selectEntityDid(state),
  bondDid: entitySelectors.selectEntityBondDid(state),
  creatorDid: entitySelectors.selectEntityCreator(state),
  userDid: accountSelectors.selectUserDid(state),
  agents: entitySelectors.selectEntityAgents(state),
  serviceProvidersCount: entitySelectors.selectServiceProvidersCount(state),
  serviceProvidersPendingCount: entitySelectors.selectServiceProvidersPendingCount(state),
  evaluatorsCount: entitySelectors.selectEvaluatorsCount(state),
  evaluatorsPendingCount: entitySelectors.selectEvaluatorsPendingCount(state),
  claims: entitySelectors.selectEntityRootClaims(state),
  requiredClaimsCount: entitySelectors.selectRequiredClaimsCount(state),
  successfulClaimsCount: entitySelectors.selectSuccessfulClaimsCount(state),
  pendingClaimsCount: entitySelectors.selectPendingClaimsCount(state),
  rejectedClaimsCount: entitySelectors.selectRejectedClaimsCount(state),
  disputedClaimsCount: entitySelectors.selectDisputedClaimsCount(state),
  remainingClaimsCount: entitySelectors.selectRemainingClaimsCount(state),
  latLng: entitySelectors.selectLatLng(state),
  entity: entitySelectors.selectSelectedEntity(state),
  goal: entitySelectors.selectGoal(state),
})

export default connect(mapStateToProps)(Overview)
