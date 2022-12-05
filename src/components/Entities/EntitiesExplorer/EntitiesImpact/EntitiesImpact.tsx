import React from 'react'
import { connect } from 'react-redux'
import { EntityType } from '../../../../types/entities'
import { Container } from '../EntitiesExplorer.container.styles'
import { EntitiesHero } from '../Components/EntitiesHero/EntitiesHero'
import { getEntities } from 'redux/entitiesExplorer/entitiesExplorer.actions'
import * as entitiesSelectors from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { RootState } from 'redux/types'
import { Spinner } from 'components/Spinner/Spinner'
import { EntitiesDashboard } from './Components/EntitiesDashboard/EntitiesDashboard'

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
  filterQuery: string
  handleGetEntities: () => void
}

class EntitiesImpact extends React.Component<Props> {
  componentDidMount(): void {
    this.props.handleGetEntities()
  }

  render(): JSX.Element {
    return (
      <Container>
        <EntitiesHero
          type={this.props.type}
          filterSector={this.props.filterSector}
          filterQuery={this.props.filterQuery}
          showSearch={false}
          handleChangeEntitiesType={() => null}
        />
        {this.props.isLoadingEntities && <Spinner info='Loading Impact Data' />}
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
  locations: entitiesSelectors.selectEntitiesCountries(state),
  requiredClaimsCount: entitiesSelectors.selectTotalRequiredClaimsCount(state),
  pendingClaimsCount: entitiesSelectors.selectTotalPendingClaimsCount(state),
  successfulClaimsCount: entitiesSelectors.selectTotalSuccessfulClaimsCount(state),
  rejectedClaimsCount: entitiesSelectors.selectTotalRejectedClaimsCount(state),
  remainingClaimsCount: entitiesSelectors.selectTotalRemainingClaimsCount(state),
  serviceProvidersCount: entitiesSelectors.selectTotalServiceProvidersCount(state),
  evaluatorsCount: entitiesSelectors.selectTotalEvaluatorsCount(state),
  isLoadingEntities: entitiesSelectors.selectIsLoadingEntities(state),
  filterQuery: entitiesSelectors.selectFilterQuery(state),
})

const mapDispatchToProps = (dispatch: any): any => ({
  handleGetEntities: (): void => dispatch(getEntities()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesImpact as any)
