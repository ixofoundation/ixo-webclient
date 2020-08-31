import * as React from 'react'
import { RouteProps } from 'react-router'
import { Moment } from 'moment'
import { EntitiesDashboard } from './components/EntitiesDashboard/EntitiesDashboard'
import { ProjectCard } from './components/EntityCard/ProjectCard/ProjectCard'
import { CellCard } from './components/EntityCard/CellCard/CellCard'
import { EntitiesHero } from './components/EntitiesHero/EntitiesHero'
import { Spinner } from 'common/components/Spinner'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import { contentType } from 'types/models'
import {
  Container,
  EntitiesContainer,
  ErrorContainer,
  NoEntitiesContainer,
} from './Entities.container.styles'
import {
  getEntities,
  filterToggleUserEntities,
  filterToggleFeaturedEntities,
  filterTogglePopularEntities,
  filterDates,
  resetDatesFilter,
  filterAddCategoryTag,
  resetCategoryFilter,
  resetSectorFilter,
  resetFilters,
  changeEntitiesType,
  filterCategoryTag,
  filterSector,
} from './Entities.actions'
import EntitiesFilter from './components/EntitiesFilter/EntitiesFilter'
import { Entity, EntityType } from './types'
import { Category } from './types'
import { Schema as FilterSchema } from './components/EntitiesFilter/schema/types'
import * as entitiesSelectors from './Entities.selectors'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { entityTypeMap } from './strategy-map'

export interface Props extends RouteProps {
  location?: any
  contentType: string
  entityType: EntityType
  entities: Entity[]
  entitiesCount: number
  userEntitiesCount: number
  requiredClaimsCount: number
  successfulClaimsCount: number
  pendingClaimsCount: number
  rejectedClaimsCount: number
  remainingClaimsCount: number
  serviceProvidersCount: number
  evaluatorsCount: number
  countries: any[]
  filteredEntitiesCount: number
  filterDateFrom: Moment
  filterDateFromFormatted: string
  filterDateTo: Moment
  filterDateToFormatted: string
  filterDateSummary: string
  filterCategories: Category[]
  filterCategoriesSummary: string
  filterUserEntities: boolean
  filterFeaturedEntities: boolean
  filterPopularEntities: boolean
  isLoadingEntities: boolean
  isLoggedIn: boolean
  filterSchema: FilterSchema
  filterSector: string
  handleGetEntities: () => void
  handleChangeEntitiesType: (entityType: EntityType) => void
  handleFilterToggleUserEntities: (userEntities: boolean) => void
  handleFilterToggleFeaturedEntities: (featuredEntities: boolean) => void
  handleFilterTogglePopularEntities: (popularEntities: boolean) => void
  handleFilterDates: (dateFrom: any, dateTo: any) => void
  handleResetDatesFilter: () => void
  handleFilterCategoryTag: (category: string, tag: string) => void
  handleFilterAddCategoryTag: (category: string, tag: string) => void
  handleFilterSector: (category: string) => void
  handleResetCategoryFilter: (category: string) => void
  handleResetSectorFilter: () => void
  handleResetFilters: () => void
}

export class Entities extends React.Component<any, any> {
  componentDidMount(): void {
    this.props.handleGetEntities()
  }

  resetWithDefaultViewFilters = (): void => {
    this.props.handleResetFilters()
  }

  renderCards = (): JSX.Element[] => {
    return this.props.entities.map((entity, index) => {
      switch (this.props.entityType) {
        case EntityType.Cell:
          return (
            <CellCard
              dateCreated={entity.dateCreated}
              imageUrl={entity.imageUrl}
              founderLogoUrl={entity.founderLogoUrl}
              projectDid={entity.did}
              shortDescription={entity.shortDescription}
              title={entity.title}
              sdgs={entity.sdgs}
              projectData={entity.data}
              key={index}
              status={entity.status}
              memberCount={162} // TODO
              projectCount={3} // TODO
            />
          )
        default:
          return (
            <ProjectCard
              imageUrl={entity.imageUrl}
              impactAction={entity.impactAction}
              projectDid={entity.did}
              rejectedClaims={entity.rejectedClaimsCount}
              successfulClaims={entity.successfulClaimsCount}
              requiredClaims={entity.requiredClaimsCount}
              shortDescription={entity.shortDescription}
              title={entity.title}
              sdgs={entity.sdgs}
              projectData={entity.data}
              key={index}
              founderLogoUrl={entity.founderLogoUrl}
              version={0.2} // TODO
              activeUsage={16} // TODO
              ratingScore={4.5}
              ratingCount={380}
            />
          )
      }
    })
  }

  renderEntities = (): JSX.Element => {
    if (this.props.entitiesCount > 0) {
      return (
        <EntitiesContainer className="container-fluid">
          <div className="container">
            <EntitiesFilter
              title={`All ${entityTypeMap[this.props.entityType].plural}`}
              filterSchema={this.props.filterSchema}
              startDate={this.props.filterDateFrom}
              startDateFormatted={this.props.filterDateFromFormatted}
              endDate={this.props.filterDateTo}
              endDateFormatted={this.props.filterDateToFormatted}
              dateSummary={this.props.filterDateSummary}
              categories={this.props.filterCategories}
              categoriesSummary={this.props.filterCategoriesSummary}
              userEntities={this.props.filterUserEntities}
              featuredEntities={this.props.filterFeaturedEntities}
              popularEntities={this.props.filterPopularEntities}
              sector={this.props.filterSector}
              handleFilterDates={this.props.handleFilterDates}
              handleResetDatesFilter={this.props.handleResetDatesFilter}
              handleFilterCategoryTag={this.props.handleFilterCategoryTag}
              handleFilterSector={this.props.handleFilterSector}
              handleFilterAddCategoryTag={this.props.handleFilterAddCategoryTag}
              handleResetCategoryFilter={this.props.handleResetCategoryFilter}
              handleResetSectorFilter={this.props.handleResetSectorFilter}
              handleFilterToggleUserEntities={
                this.props.handleFilterToggleUserEntities
              }
              handleFilterToggleFeaturedEntities={
                this.props.handleFilterToggleFeaturedEntities
              }
              handleFilterTogglePopularEntities={
                this.props.handleFilterTogglePopularEntities
              }
              handleResetFilters={this.resetWithDefaultViewFilters}
            />
            {this.props.filteredEntitiesCount > 0 ? (
              <div className="row row-eq-height">{this.renderCards()}</div>
            ) : (
              <NoEntitiesContainer>
                <p>
                  There are no{' '}
                  {entityTypeMap[this.props.entityType].plural.toLowerCase()}{' '}
                  that match your search criteria
                </p>
              </NoEntitiesContainer>
            )}
          </div>
        </EntitiesContainer>
      )
    } else {
      return (
        <ErrorContainer>
          <p>
            No {entityTypeMap[this.props.entityType].plural.toLowerCase()} were
            found
          </p>
        </ErrorContainer>
      )
    }
  }

  handleRenderEntityList(): JSX.Element {
    if (this.props.isLoadingEntities) {
      return (
        <Spinner
          info={`Loading ${entityTypeMap[this.props.entityType].plural}`}
        />
      )
    } else {
      if (this.props.contentType === contentType.dashboard) {
        return (
          <EntitiesDashboard
            entityType={this.props.entityType}
            requiredClaims={this.props.requiredClaimsCount}
            successfulClaims={this.props.successfulClaimsCount}
            pendingClaims={this.props.pendingClaimsCount}
            rejectedClaims={this.props.rejectedClaimsCount}
            remainingClaims={this.props.remainingClaimsCount}
            serviceProviders={this.props.serviceProvidersCount}
            evaluators={this.props.evaluatorsCount}
            countries={this.props.countries}
          />
        )
      } else {
        return this.renderEntities()
      }
    }
  }

  render(): JSX.Element {
    return (
      <Container>
        <EntitiesHero
          entityType={this.props.entityType}
          filterSector={this.props.filterSector}
          showSearch={this.props.contentType !== contentType.dashboard}
          handleChangeEntitiesType={this.props.handleChangeEntitiesType}
        />
        {this.handleRenderEntityList()}
      </Container>
    )
  }
}

function mapStateToProps(state: RootState): Record<string, any> {
  return {
    entities: entitiesSelectors.selectedFilteredEntities(state),
    entityType: entitiesSelectors.selectSelectedEntitiesType(state),
    countries: entitiesSelectors.selectEntitiesCountries(state),
    entitiesCount: entitiesSelectors.selectAllEntitiesCount(state),
    userEntitiesCount: entitiesSelectors.selectUserEntitiesCount(state),
    requiredClaimsCount: entitiesSelectors.selectTotalRequiredClaimsCount(
      state,
    ),
    pendingClaimsCount: entitiesSelectors.selectTotalPendingClaimsCount(state),
    successfulClaimsCount: entitiesSelectors.selectTotalSuccessfulClaimsCount(
      state,
    ),
    rejectedClaimsCount: entitiesSelectors.selectTotalRejectedClaimsCount(
      state,
    ),
    remainingClaimsCount: entitiesSelectors.selectTotalRemainingClaimsCount(
      state,
    ),
    serviceProvidersCount: entitiesSelectors.selectTotalServiceProvidersCount(
      state,
    ),
    evaluatorsCount: entitiesSelectors.selectTotalEvaluatorsCount(state),
    filteredEntitiesCount: entitiesSelectors.selectFilteredEntitiesCount(state),
    filterDateFrom: entitiesSelectors.selectFilterDateFrom(state),
    filterDateTo: entitiesSelectors.selectFilterDateTo(state),
    filterDateFromFormatted: entitiesSelectors.selectFilterDateFromFormatted(
      state,
    ),
    filterDateToFormatted: entitiesSelectors.selectFilterDateToFormatted(state),
    filterDateSummary: entitiesSelectors.selectFilterDateSummary(state),
    filterCategories: entitiesSelectors.selectFilterCategories(state),
    filterCategoriesSummary: entitiesSelectors.selectFilterCategoriesSummary(
      state,
    ),
    filterSector: entitiesSelectors.selectFilterSector(state),
    filterUserEntities: entitiesSelectors.selectFilterUserEntities(state),
    filterFeaturedEntities: entitiesSelectors.selectFilterFeaturedEntities(
      state,
    ),
    filterPopularEntities: entitiesSelectors.selectFilterPopularEntities(state),
    isLoadingEntities: entitiesSelectors.selectIsLoadingEntities(state),
    filterSchema: entitiesSelectors.selectFilterSchema(state),
    isLoggedIn: accountSelectors.selectUserIsLoggedIn(state),
  }
}

const mapDispatchToProps = (dispatch: any): any => ({
  handleGetEntities: (): void => dispatch(getEntities()),
  handleChangeEntitiesType: (entityType: EntityType): void =>
    dispatch(changeEntitiesType(entityType)),
  handleFilterToggleUserEntities: (userEntities: boolean): void =>
    dispatch(filterToggleUserEntities(userEntities)),
  handleFilterTogglePopularEntities: (popularEntities: boolean): void =>
    dispatch(filterTogglePopularEntities(popularEntities)),
  handleFilterToggleFeaturedEntities: (featuredEntities: boolean): void =>
    dispatch(filterToggleFeaturedEntities(featuredEntities)),
  handleFilterDates: (dateFrom: any, dateTo: any): void =>
    dispatch(filterDates(dateFrom, dateTo)),
  handleResetDatesFilter: (): void => dispatch(resetDatesFilter()),
  handleFilterCategoryTag: (category: string, tag: string): void =>
    dispatch(filterCategoryTag(category, tag)),
  handleFilterSector: (tag: string): void => dispatch(filterSector(tag)),
  handleFilterAddCategoryTag: (category: string, tag: string): void =>
    dispatch(filterAddCategoryTag(category, tag)),
  handleResetCategoryFilter: (category: string): void =>
    dispatch(resetCategoryFilter(category)),
  handleResetSectorFilter: (): void => dispatch(resetSectorFilter()),
  handleResetFilters: (): void => dispatch(resetFilters()),
})

export const EntitiesContainerConnected: any = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Entities as any)
