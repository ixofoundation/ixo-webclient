import React from 'react'
import { connect } from 'react-redux'
import { EntityType } from '../../types'
import { Container } from '../EntitiesExplorer.container.styles'
import { EntitiesHero } from '../components/EntitiesHero/EntitiesHero'
import * as entitiesSelectors from '../EntitiesExplorer.selectors'
import * as entitiesImpactSelectors from './EntitiesImpact.selectors'
import { RootState } from 'common/redux/types'
import { Spinner } from 'common/components/Spinner'
import { EntitiesDashboard } from './components/EntitiesDashboard/EntitiesDashboard'

interface Props {
  type: EntityType
  locations: any[]
  requiredClaimsCount: number
  successfulClaimsCount: number
  pendingClaimsCount: number
  rejectedClaimsCount: number
  remainingClaimsCount: number
  serviceProvidersCount: number
  evaluatorsCount: number
  isLoadingEntities: boolean
  filterSector: string
}

class EntitiesImpact extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <Container>
        <EntitiesHero
          type={this.props.type}
          filterSector={this.props.filterSector}
          showSearch={false}
          handleChangeEntitiesType={(): void => null}
        />
        {this.props.isLoadingEntities && <Spinner info="Loading Impact Data" />}
        {!this.props.isLoadingEntities && (
          <EntitiesDashboard
            type={this.props.type}
            requiredClaims={this.props.requiredClaimsCount}
            successfulClaims={this.props.successfulClaimsCount}
            pendingClaims={this.props.pendingClaimsCount}
            rejectedClaims={this.props.rejectedClaimsCount}
            remainingClaims={this.props.remainingClaimsCount}
            serviceProviders={this.props.serviceProvidersCount}
            evaluators={this.props.evaluatorsCount}
            locations={this.props.locations}
          />
        )}
      </Container>
    )
  }
}

const mapStateToProps = (state: RootState): Record<string, any> => ({
  type: entitiesSelectors.selectSelectedEntitiesType(state),
  locations: entitiesImpactSelectors.selectEntitiesCountries(state),
  requiredClaimsCount:
    entitiesImpactSelectors.selectTotalRequiredClaimsCount(state),
  pendingClaimsCount:
    entitiesImpactSelectors.selectTotalPendingClaimsCount(state),
  successfulClaimsCount:
    entitiesImpactSelectors.selectTotalSuccessfulClaimsCount(state),
  rejectedClaimsCount:
    entitiesImpactSelectors.selectTotalRejectedClaimsCount(state),
  remainingClaimsCount:
    entitiesImpactSelectors.selectTotalRemainingClaimsCount(state),
  serviceProvidersCount:
    entitiesImpactSelectors.selectTotalServiceProvidersCount(state),
  evaluatorsCount: entitiesImpactSelectors.selectTotalEvaluatorsCount(state),
  isLoadingEntities: entitiesSelectors.selectIsLoadingEntities(state),
})

export default connect(mapStateToProps)(EntitiesImpact as any)
