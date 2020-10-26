import { RootState } from 'common/redux/types'
import React, { Dispatch } from 'react'
import Dashboard from './components/Dashboard/Dashboard'
import * as entityImpactSelectors from '../EntityImpact.selectors'
import * as entitySelectors from '../../SelectedEntity.selectors'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { connect } from 'react-redux'
import { Agent } from 'modules/Entities/types'
import { LatLng } from 'common/components/Widgets/WorldMap/WorldMap'
import * as entityUtils from '../../../Entities.utils'
import { AgentRole } from 'modules/Account/types'

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
  ...props
}) => {
  return (
    <Dashboard
      did={did}
      goal={'0'}
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
    />
  )
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
})

const mapDispatchToProps = (dispatch: Dispatch<any>): any => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
