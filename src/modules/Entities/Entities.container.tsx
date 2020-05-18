import * as React from 'react'
import { Moment } from 'moment'
import { EntitiesDashboard } from './components/EntitiesDashboard/EntitiesDashboard'
import { ProjectCard } from './components/EntityCard/ProjectCard/ProjectCard'
import { CellCard } from './components/EntityCard/CellCard/CellCard'
import { EntitiesHero } from './components/EntitiesHero/EntitiesHero'
import { Spinner } from '../../components/common/Spinner'
import { connect } from 'react-redux'
import { RootState } from '../../common/redux/types'
import { contentType } from '../../types/models'
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
  filterEntitiesDates,
  resetEntitiesDatesFilter,
  filterEntitiesCategoryTag,
  resetEntitiesCategoryFilter,
  resetEntitiesFilters,
  changeEntitiesType,
} from './Entities.actions'
import EntitiesFilter from './components/EntitiesFilter/EntitiesFilter'
import { Entity, EntityType, EntityTypeMap } from './types'
import { Category } from './types'
import { Schema } from './components/EntitiesFilter/types'
import * as entitiesSelectors from './Entities.selectors'
import * as accountSelectors from '../Account/Account.selectors'

export interface Props {
  location?: any
  contentType: contentType
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
  filterSchema: Schema
  handleGetEntities: () => void
  handleChangeEntityTypes: (entityType: EntityType) => void
  handleFilterToggleUserEntities: (userEntities: boolean) => void
  handleFilterToggleFeaturedEntities: (featuredEntities: boolean) => void
  handleFilterTogglePopularEntities: (popularEntities: boolean) => void
  handleFilterDates: (dateFrom: any, dateTo: any) => void
  handleResetDatesFilter: () => void
  handleFilterCategoryTag: (category: string, tag: string) => void
  handleResetCategoryFilter: (category: string) => void
  handleResetFilters: () => void
}

export class Entities extends React.Component<Props> {
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
              title={`All ${EntityTypeMap[this.props.entityType].plural}`}
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
              handleFilterDates={this.props.handleFilterDates}
              handleResetDatesFilter={this.props.handleResetDatesFilter}
              handleFilterCategoryTag={this.props.handleFilterCategoryTag}
              handleResetCategoryFilter={this.props.handleResetCategoryFilter}
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
            <div className="row row-eq-height">
              {this.props.filteredEntitiesCount > 0 ? (
                this.renderCards()
              ) : (
                <NoEntitiesContainer>
                  <p>
                    There are no{' '}
                    {EntityTypeMap[this.props.entityType].plural.toLowerCase()}{' '}
                    that match your search criteria
                  </p>
                </NoEntitiesContainer>
              )}
            </div>
          </div>
        </EntitiesContainer>
      )
    } else {
      return (
        <ErrorContainer>
          <p>
            No {EntityTypeMap[this.props.entityType].plural.toLowerCase()} were
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
          info={`Loading ${EntityTypeMap[this.props.entityType].plural}`}
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
          entitiesCount={this.props.entitiesCount}
          userEntitiesCount={this.props.userEntitiesCount}
          requiredClaimsCount={this.props.requiredClaimsCount}
          successfulClaimsCount={this.props.successfulClaimsCount}
          contentType={this.props.contentType}
          handleChangeEntityTypes={this.props.handleChangeEntityTypes}
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
  handleChangeEntityTypes: (entityType: EntityType): void =>
    dispatch(changeEntitiesType(entityType)),
  handleFilterToggleUserEntities: (userEntities: boolean): void =>
    dispatch(filterToggleUserEntities(userEntities)),
  handleFilterTogglePopularEntities: (popularEntities: boolean): void =>
    dispatch(filterTogglePopularEntities(popularEntities)),
  handleFilterToggleFeaturedEntities: (featuredEntities: boolean): void =>
    dispatch(filterToggleFeaturedEntities(featuredEntities)),
  handleFilterDates: (dateFrom: any, dateTo: any): void =>
    dispatch(filterEntitiesDates(dateFrom, dateTo)),
  handleResetDatesFilter: (): void => dispatch(resetEntitiesDatesFilter()),
  handleFilterCategoryTag: (category: string, tag: string): void =>
    dispatch(filterEntitiesCategoryTag(category, tag)),
  handleResetCategoryFilter: (category: string): void =>
    dispatch(resetEntitiesCategoryFilter(category)),
  handleResetFilters: (): void => dispatch(resetEntitiesFilters()),
})

export const EntitiesContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Entities as any)
