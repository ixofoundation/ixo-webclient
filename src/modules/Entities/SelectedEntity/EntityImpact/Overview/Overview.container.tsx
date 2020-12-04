import { RootState } from 'common/redux/types'
import React, { Dispatch } from 'react'
import Dashboard from './components/Dashboard/Dashboard'
import * as entityImpactSelectors from '../EntityImpact.selectors'
import * as entitySelectors from '../../SelectedEntity.selectors'
import { Entity } from '../../types'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { connect } from 'react-redux'
import { Agent } from 'modules/Entities/types'
import { LatLng } from 'common/components/Widgets/WorldMap/WorldMap'
import * as entityUtils from '../../../Entities.utils'
import { AgentRole } from 'modules/Account/types'
import EntityImpactLayout from '../EntityImpact.container'

interface Props {
  match: any
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
  entity: Entity,
}

const Overview: React.FunctionComponent<Props> = ({
  match,
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
  ...props
}) => {
  return (<EntityImpactLayout match={match}>
    <Dashboard
      did={did}
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
      entityClaims={ entity.entityClaims.items }
    />
  </EntityImpactLayout>)
}

const mapStateToProps = (state: RootState): any => ({
  did: entitySelectors.selectEntityDid(state),
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
  claims: [], // TODO
  requiredClaimsCount: entityImpactSelectors.selectRequiredClaimsCount(state),
  successfulClaimsCount: entityImpactSelectors.selectSuccessfulClaimsCount(
    state,
  ),
  pendingClaimsCount: entityImpactSelectors.selectPendingClaimsCount(state),
  rejectedClaimsCount: entityImpactSelectors.selectRejectedClaimsCount(state),
  remainingClaimsCount: entityImpactSelectors.selectRemainingClaimsCount(state),
  latLng: entityImpactSelectors.selectLatLng(state),
  entity: entitySelectors.selectSelectedEntity(state),
  goal: entityImpactSelectors.selectGoal(state)
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
