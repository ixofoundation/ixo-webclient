import * as React from 'react'
import { RouteProps } from 'react-router'
import { Moment } from 'moment'
import ProjectCard from './components/EntityCard/ProjectCard/ProjectCard'
import LaunchpadCard from './components/EntityCard/LaunchpadCard/LaunchpadCard'
import CellCard from './components/EntityCard/CellCard/CellCard'
import TemplateCard from './components/EntityCard/TemplateCard/TemplateCard'
import InvestmentCard from './components/EntityCard/InvestmentCard/InvestmentCard'
import OracleCard from './components/EntityCard/OracleCard/OracleCard'
import AssetCard from './components/EntityCard/AssetCard/AssetNewCard'
import { EntitiesHero } from './components/EntitiesHero/EntitiesHero'
import { Spinner } from 'common/components/Spinner'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'
import {
  Container,
  EntitiesContainer,
  ErrorContainer,
  NoEntitiesContainer,
} from './EntitiesExplorer.container.styles'
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
  filterEntitiesQuery,
} from './EntitiesExplorer.actions'
import EntitiesFilter from './components/EntitiesFilter/EntitiesFilter'
import { EntityType } from '../types'
import { DDOTagCategory, ExplorerEntity } from './types'
import { Schema as FilterSchema } from './components/EntitiesFilter/schema/types'
import * as entitiesSelectors from './EntitiesExplorer.selectors'
import * as accountSelectors from 'modules/Account/Account.selectors'
import { entityTypeMap } from '../strategy-map'

export interface Props extends RouteProps {
  match: any
  type: EntityType
  entities: ExplorerEntity[]
  entitiesCount: number
  filteredEntitiesCount: number
  filterDateFrom: Moment
  filterDateFromFormatted: string
  filterDateTo: Moment
  filterDateToFormatted: string
  filterDateSummary: string
  filterCategories: DDOTagCategory[]
  filterCategoriesSummary: string
  filterUserEntities: boolean
  filterFeaturedEntities: boolean
  filterPopularEntities: boolean
  isLoadingEntities: boolean
  isLoggedIn: boolean
  filterSchema: FilterSchema
  filterSector: string
  handleGetEntities: () => void
  handleChangeEntitiesQuery: (query: string) => void
  handleChangeEntitiesType: (type: EntityType) => void
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

const EntityCard: any = {
  [EntityType.Project]: ProjectCard,
  [EntityType.Cell]: CellCard,
  [EntityType.Template]: TemplateCard,
  [EntityType.Oracle]: OracleCard,
  [EntityType.Investment]: InvestmentCard,
  [EntityType.Asset]: AssetCard,
}

class EntitiesExplorer extends React.Component<Props> {
  state = {
    assistantPanelActive: false,
  }

  componentDidMount(): void {
    this.props.handleGetEntities()
  }

  resetWithDefaultViewFilters = (): void => {
    this.props.handleResetFilters()
  }

  renderCards = (): JSX.Element[] => {
    const { filterSector } = this.props

    return this.props.entities.map((entity: ExplorerEntity, index) => {
      if (filterSector === 'Relayer Launchpad') {
        return React.createElement(LaunchpadCard, {
          ...entity,
          key: index,
        })
      }

      return React.createElement(EntityCard[this.props.type], {
        ...entity,
        key: index,
      })
    })
  }

  renderEntities = (): JSX.Element => {
    if (this.props.entitiesCount > 0) {
      return (
        <EntitiesContainer className="container-fluid">
          <div className="container">
            <EntitiesFilter
              title={`All ${entityTypeMap[this.props.type].plural}`}
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
                  {entityTypeMap[this.props.type].plural.toLowerCase()} that
                  match your search criteria
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
            No {entityTypeMap[this.props.type].plural.toLowerCase()} were found
          </p>
        </ErrorContainer>
      )
    }
  }

  assistantPanelToggle = (): void => {
    const { assistantPanelActive } = this.state

    // Assistant panel shown
    if (!assistantPanelActive) {
      document?.querySelector('body')?.classList?.add('noScroll')
    } else {
      document?.querySelector('body')?.classList.remove('noScroll')
    }

    this.setState({ assistantPanelActive: !assistantPanelActive })
  }

  render(): JSX.Element {
    return (
      <Container>
        <div className="d-flex">
          <div className="d-flex flex-column flex-grow-1">
            <EntitiesHero
              type={this.props.type}
              filterSector={this.props.filterSector}
              showSearch={true}
              handleChangeEntitiesType={this.props.handleChangeEntitiesType}
              handleChangeQuery={this.props.handleChangeEntitiesQuery}
              assistantPanelToggle={this.assistantPanelToggle}
            />
            {this.props.isLoadingEntities && (
              <Spinner
                info={`Loading ${entityTypeMap[this.props.type].plural}`}
              />
            )}
            {!this.props.isLoadingEntities && this.renderEntities()}
          </div>
        </div>
      </Container>
    )
  }
}

function mapStateToProps(state: RootState): Record<string, any> {
  return {
    entities: entitiesSelectors.selectedFilteredEntities(state),
    entitiesCount: entitiesSelectors.selectAllEntitiesCount(state),
    type: entitiesSelectors.selectSelectedEntitiesType(state),
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
  handleChangeEntitiesQuery: (query: string): void =>
    dispatch(filterEntitiesQuery(query)),
  handleChangeEntitiesType: (type: EntityType): void =>
    dispatch(changeEntitiesType(type)),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EntitiesExplorer as any)
