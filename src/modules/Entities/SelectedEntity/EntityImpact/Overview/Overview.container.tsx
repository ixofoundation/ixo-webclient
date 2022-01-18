import { LatLng } from 'common/components/Widgets/WorldMap/WorldMap'
import { RootState } from 'common/redux/types'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { AgentRole } from 'modules/Account/types'
import * as entityClaimsSelectors from 'modules/Entities/SelectedEntity/EntityImpact/EntityClaims/EntityClaims.selectors'
import { Agent } from 'modules/Entities/types'
import React from 'react'
import { connect } from 'react-redux'
import * as entityUtils from '../../../Entities.utils'
import * as entitySelectors from '../../SelectedEntity.selectors'
import { Entity } from '../../types'
import * as entityImpactSelectors from '../EntityImpact.selectors'
import Dashboard from './components/Dashboard/Dashboard'

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
      remainingClaimsCount={remainingClaimsCount}
      agents={agents}
      latLng={latLng}
      showAgentLinks={entityUtils.isUserInRolesOfEntity(
        userDid,
        creatorDid,
        agents,
        [AgentRole.Owner],
      )}
      showClaimLinks={entityUtils.isUserInRolesOfEntity(
        userDid,
        creatorDid,
        agents,
        [
          AgentRole.Owner,
          AgentRole.Evaluator,
          AgentRole.ServiceProvider,
          AgentRole.Investor,
        ],
      )}
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
  serviceProvidersCount: entityImpactSelectors.selectServiceProvidersCount(
    state,
  ),
  serviceProvidersPendingCount: entityImpactSelectors.selectServiceProvidersPendingCount(
    state,
  ),
  evaluatorsCount: entityImpactSelectors.selectEvaluatorsCount(state),
  evaluatorsPendingCount: entityImpactSelectors.selectEvaluatorsPendingCount(
    state,
  ),
  claims: entityClaimsSelectors.selectEntityClaims(state),
  requiredClaimsCount: entityImpactSelectors.selectRequiredClaimsCount(state),
  successfulClaimsCount: entityImpactSelectors.selectSuccessfulClaimsCount(
    state,
  ),
  pendingClaimsCount: entityImpactSelectors.selectPendingClaimsCount(state),
  rejectedClaimsCount: entityImpactSelectors.selectRejectedClaimsCount(state),
  remainingClaimsCount: entityImpactSelectors.selectRemainingClaimsCount(state),
  latLng: entityImpactSelectors.selectLatLng(state),
  entity: entitySelectors.selectSelectedEntity(state),
  goal: entityImpactSelectors.selectGoal(state),
})

export default connect(mapStateToProps)(Overview)
