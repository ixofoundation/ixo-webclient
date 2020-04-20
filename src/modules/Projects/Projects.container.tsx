import * as React from 'react'
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
} from './Projects.container.styles'
import {
  getProjects,
  filterToggleUserProjects,
  filterDates,
  resetDatesFilter,
  filterCategoryTag,
  resetCategoryFilter,
  resetFilters,
} from './Projects.actions'
import ProjectsFilter from './components/ProjectsFilter/ProjectsFilter'
import { schema } from './components/ProjectsFilter/schema'
import { Project, Category } from './types'
import * as projectsSelectors from './Projects.selectors'

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
  filterDateFrom: Date
  filterDateTo: Date
  filterCategories: Category[]
  filterUserProjectsOnly: boolean
  isLoadingProjects: boolean
  handleGetProjects: () => void
  handleFilterToggleUserProjects: (userProjectsOnly: boolean) => void
  handleFilterDates: (dateFrom: any, dateTo: any) => void
  handleResetDatesFilter: () => void
  handleFilterCategoryTag: (category: string, tag: string) => void
  handleResetCategoryFilter: (category: string) => void
  handleResetFilters: () => void
}

export class Projects extends React.Component<Props> {
  componentDidMount(): void {
    console.log(this.props.filterCategories)
    this.props.handleGetProjects()
  }

  renderProjects = (): JSX.Element => {
    if (this.props.projectsCount > 0) {
      return (
        <ProjectsContainer className="container-fluid">
          <div className="container">
            <ProjectsFilter
              schema={schema}
              startDate={this.props.filterDateFrom}
              endDate={this.props.filterDateTo}
              categorySelections={this.props.filterCategories}
              handleFilterDates={this.props.handleFilterDates}
              handleResetDatesFilter={this.props.handleResetDatesFilter}
              handleFilterCategoryTag={this.props.handleFilterCategoryTag}
              handleResetCategoryFilter={this.props.handleResetCategoryFilter}
              handleResetFilters={this.props.handleResetFilters}
            />
            <div className="row row-eq-height">
              {this.props.projects.map((project, index) => {
                return (
                  <ProjectCard
                    ownerName={project.ownerName}
                    imageUrl={project.imageUrl}
                    impactAction={project.impactAction}
                    projectDid={project.projectDid}
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
              })}
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
          myProjectsCount={this.props.userProjectsCount}
          showMyProjects={(): void => null} //(val): void => this.showMyProjects(val)
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
    projectsCount: projectsSelectors.selectFilteredProjectsCount(state),
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
    filterDateFrom: projectsSelectors.selectFilterDateFrom(state),
    filterDateTo: projectsSelectors.selectFilterDateTo(state),
    filterCategories: projectsSelectors.selectFilterCategories(state),
    filterUserProjectsOnly: projectsSelectors.selectFilterUserProjectsOnly(
      state,
    ),
    isLoadingProjects: projectsSelectors.selectIsLoadingProjects(state),
  }
}

const mapDispatchToProps = (dispatch: any): any => ({
  handleGetProjects: (): void => dispatch(getProjects()),
  handleFilterToggleUserProjects: (userProjectsOnly: boolean): void =>
    dispatch(filterToggleUserProjects(userProjectsOnly)),
  handleFilterDates: (dateFrom: any, dateTo: any): void =>
    dispatch(filterDates(dateFrom, dateTo)),
  handleResetDatesFilter: (): void => dispatch(resetDatesFilter()),
  handleFilterCategoryTag: (category: string, tag: string): void =>
    dispatch(filterCategoryTag(category, tag)),
  handleResetCategoryFilter: (category: string): void =>
    dispatch(resetCategoryFilter(category)),
  handleResetFilters: (): void => dispatch(resetFilters()),
})

export const ProjectsContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Projects as any)
