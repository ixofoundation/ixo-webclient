import * as React from 'react'
import { Moment } from 'moment'
import { ProjectsDashboard } from './components/ProjectsDashboard/ProjectsDashboard'
import { ProjectCard } from './components/ProjectCard/ProjectCard'
import { ProjectsHero } from './components/ProjectsHero/ProjectsHero'
import { Spinner } from '../../components/common/Spinner'
import { connect } from 'react-redux'
import { RootState } from '../../common/redux/types'
import { contentType } from '../../types/models'
import {
  Container,
  ProjectsContainer,
  ErrorContainer,
  NoProjectsContainer,
} from './Projects.container.styles'
import {
  getProjects,
  filterToggleUserProjects,
  filterToggleFeaturedProjects,
  filterTogglePopularProjects,
  filterProjectDates,
  resetProjectsDatesFilter,
  filterProjectsCategoryTag,
  resetProjectsCategoryFilter,
  resetProjectsFilters,
} from './Projects.actions'
import EntitiesFilter from '../../common/modules/Entities/components/EntitiesFilter/EntitiesFilter'
import { Project } from './types'
import { Category } from '../../common/modules/Entities/types'
import { Schema } from '../../common/modules/Entities/components/EntitiesFilter/types'
import * as projectsSelectors from './Projects.selectors'
import filterSchema from './ProjectsFilter.schema.json'

export interface Props {
  location?: any
  contentType: contentType
  projects: Project[]
  projectsCount: number
  userProjectsCount: number
  requiredClaimsCount: number
  successfulClaimsCount: number
  pendingClaimsCount: number
  rejectedClaimsCount: number
  remainingClaimsCount: number
  serviceProvidersCount: number
  evaluatorsCount: number
  countries: any[]
  filteredProjectsCount: number
  filterDateFrom: Moment
  filterDateFromFormatted: string
  filterDateTo: Moment
  filterDateToFormatted: string
  filterDateSummary: string
  filterCategories: Category[]
  filterCategoriesSummary: string
  filterUserProjects: boolean
  filterFeaturedProjects: boolean
  filterPopularProjects: boolean
  isLoadingProjects: boolean
  filterSchema: Schema
  handleGetProjects: () => void
  handleFilterToggleUserProjects: (userProjects: boolean) => void
  handleFilterToggleFeaturedProjects: (featuredProjects: boolean) => void
  handleFilterTogglePopularProjects: (popularProjects: boolean) => void
  handleFilterDates: (dateFrom: any, dateTo: any) => void
  handleResetDatesFilter: () => void
  handleFilterCategoryTag: (category: string, tag: string) => void
  handleResetCategoryFilter: (category: string) => void
  handleResetFilters: () => void
}

export class Projects extends React.Component<Props> {
  componentDidMount(): void {
    this.props.handleGetProjects()
  }

  renderProjects = (): JSX.Element => {
    if (this.props.projectsCount > 0) {
      return (
        <ProjectsContainer className="container-fluid">
          <div className="container">
            <EntitiesFilter
              title="Projects"
              filterSchema={this.props.filterSchema}
              startDate={this.props.filterDateFrom}
              startDateFormatted={this.props.filterDateFromFormatted}
              endDate={this.props.filterDateTo}
              endDateFormatted={this.props.filterDateToFormatted}
              dateSummary={this.props.filterDateSummary}
              categories={this.props.filterCategories}
              categoriesSummary={this.props.filterCategoriesSummary}
              userEntities={this.props.filterUserProjects}
              featuredEntities={this.props.filterFeaturedProjects}
              popularEntities={this.props.filterPopularProjects}
              handleFilterDates={this.props.handleFilterDates}
              handleResetDatesFilter={this.props.handleResetDatesFilter}
              handleFilterCategoryTag={this.props.handleFilterCategoryTag}
              handleResetCategoryFilter={this.props.handleResetCategoryFilter}
              handleFilterToggleUserEntities={
                this.props.handleFilterToggleUserProjects
              }
              handleFilterToggleFeaturedEntities={
                this.props.handleFilterToggleFeaturedProjects
              }
              handleFilterTogglePopularEntities={
                this.props.handleFilterTogglePopularProjects
              }
              handleResetFilters={this.props.handleResetFilters}
            />
            <div className="row row-eq-height">
              {this.props.filteredProjectsCount > 0 ? (
                this.props.projects.map((project, index) => {
                  return (
                    <ProjectCard
                      ownerName={project.ownerName}
                      imageUrl={project.imageUrl}
                      impactAction={project.impactAction}
                      projectDid={project.did}
                      rejectedClaims={project.rejectedClaimsCount}
                      successfulClaims={project.successfulClaimsCount}
                      requiredClaims={project.requiredClaimsCount}
                      shortDescription={project.shortDescription}
                      title={project.title}
                      sdgs={project.sdgs}
                      projectData={project.data}
                      key={index}
                      status={project.status}
                    />
                  )
                })
              ) : (
                <NoProjectsContainer>
                  <p>There are no projects that match your search criteria</p>
                </NoProjectsContainer>
              )}
            </div>
          </div>
        </ProjectsContainer>
      )
    } else {
      return (
        <ErrorContainer>
          <p>No projects were found</p>
        </ErrorContainer>
      )
    }
  }

  handleRenderProjectList(): JSX.Element {
    if (this.props.isLoadingProjects) {
      return <Spinner info="Loading Projects" />
    } else {
      if (this.props.contentType === contentType.dashboard) {
        return (
          <ProjectsDashboard
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
        return this.renderProjects()
      }
    }
  }

  render(): JSX.Element {
    return (
      <Container>
        <ProjectsHero
          projectsCount={this.props.projectsCount}
          userProjectsCount={this.props.userProjectsCount}
          requiredClaimsCount={this.props.requiredClaimsCount}
          successfulClaimsCount={this.props.successfulClaimsCount}
          contentType={this.props.contentType}
        />
        {this.handleRenderProjectList()}
      </Container>
    )
  }
}

function mapStateToProps(state: RootState): Record<string, any> {
  return {
    projects: projectsSelectors.selectedFilteredProjects(state),
    countries: projectsSelectors.selectProjectCountries(state),
    projectsCount: projectsSelectors.selectAllProjectsCount(state),
    userProjectsCount: projectsSelectors.selectUserProjectsCount(state),
    requiredClaimsCount: projectsSelectors.selectTotalRequiredClaimsCount(
      state,
    ),
    pendingClaimsCount: projectsSelectors.selectTotalPendingClaimsCount(state),
    successfulClaimsCount: projectsSelectors.selectTotalSuccessfulClaimsCount(
      state,
    ),
    rejectedClaimsCount: projectsSelectors.selectTotalRejectedClaimsCount(
      state,
    ),
    remainingClaimsCount: projectsSelectors.selectTotalRemainingClaimsCount(
      state,
    ),
    serviceProvidersCount: projectsSelectors.selectTotalServiceProvidersCount(
      state,
    ),
    evaluatorsCount: projectsSelectors.selectTotalEvaluatorsCount(state),
    filteredProjectsCount: projectsSelectors.selectFilteredProjectsCount(state),
    filterDateFrom: projectsSelectors.selectFilterDateFrom(state),
    filterDateTo: projectsSelectors.selectFilterDateTo(state),
    filterDateFromFormatted: projectsSelectors.selectFilterDateFromFormatted(
      state,
    ),
    filterDateToFormatted: projectsSelectors.selectFilterDateToFormatted(state),
    filterDateSummary: projectsSelectors.selectFilterDateSummary(state),
    filterCategories: projectsSelectors.selectFilterCategories(state),
    filterCategoriesSummary: projectsSelectors.selectFilterCategoriesSummary(
      state,
    ),
    filterUserProjects: projectsSelectors.selectFilterUserProjects(state),
    filterFeaturedProjects: projectsSelectors.selectFilterFeaturedProjects(
      state,
    ),
    filterPopularProjects: projectsSelectors.selectFilterPopularProjects(state),
    isLoadingProjects: projectsSelectors.selectIsLoadingProjects(state),
    filterSchema,
  }
}

const mapDispatchToProps = (dispatch: any): any => ({
  handleGetProjects: (): void => dispatch(getProjects()),
  handleFilterToggleUserProjects: (userProjects: boolean): void =>
    dispatch(filterToggleUserProjects(userProjects)),
  handleFilterTogglePopularProjects: (popularProjects: boolean): void =>
    dispatch(filterTogglePopularProjects(popularProjects)),
  handleFilterToggleFeaturedProjects: (featuredProjects: boolean): void =>
    dispatch(filterToggleFeaturedProjects(featuredProjects)),
  handleFilterDates: (dateFrom: any, dateTo: any): void =>
    dispatch(filterProjectDates(dateFrom, dateTo)),
  handleResetDatesFilter: (): void => dispatch(resetProjectsDatesFilter()),
  handleFilterCategoryTag: (category: string, tag: string): void =>
    dispatch(filterProjectsCategoryTag(category, tag)),
  handleResetCategoryFilter: (category: string): void =>
    dispatch(resetProjectsCategoryFilter(category)),
  handleResetFilters: (): void => dispatch(resetProjectsFilters()),
})

export const ProjectsContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Projects as any)
