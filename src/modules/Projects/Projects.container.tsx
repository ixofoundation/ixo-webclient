import * as React from 'react'
import { ProjectsDashboard } from './components/ProjectsDashboard'
import { ProjectCard } from './components/ProjectCard'
import { ProjectsHero } from './components/ProjectsHero'
import { Spinner } from '../../components/common/Spinner'
import { connect } from 'react-redux'
import { RootState } from '../../common/redux/types'
import { contentType } from '../../types/models'
import {
  Container,
  ProjectsContainer,
  ErrorContainer,
} from './components/ProjectsContainer.styles'
import { UserInfo } from '../account/types'
import ProjectsFilter from '../../common/components/ProjectsFilter/ProjectsFilter'
import { schema } from '../../../src/common/components/ProjectsFilter/schema'
import { getProjects } from './Projects.actions'
import { Project } from '../project/types'
import * as ProjectsSelectors from './Projects.selectors'

export interface ParentProps {
  ixo?: any
  location?: any
  contentType: contentType
  userInfo?: UserInfo
  projects?: Project[]
  dateSortedProjects?: Project[]
  projectCountries?: any
  projectClaimsAgents?: any
  projectClaims?: any
  totalClaimsRequired: number
}

export interface State {
  showOnlyMyProjects: boolean
}

export interface StateProps {
  ixo?: any
  onGetProjects: () => void
}

export interface Props extends ParentProps, StateProps {}

export class Projects extends React.Component<Props, State> {
  state = {
    showOnlyMyProjects: false,
  }

  componentDidMount(): void {
    this.props.onGetProjects()
  }

  showMyProjects(showMyProjects: boolean): void {
    this.setState({ showOnlyMyProjects: showMyProjects })
  }

  getMyProjects(): Array<any> {
    if (this.props.userInfo != null) {
      const did = this.props.userInfo.didDoc.did
      const myProjects = this.props.dateSortedProjects.filter(proj => {
        return (
          proj.data.createdBy === did ||
          proj.data.agents.some(agent => agent.did === did)
        )
      })
      return myProjects
    } else {
      return []
    }
  }

  renderProjects = (): JSX.Element => {
    if (this.props.projects.length > 0) {
      const projects = this.state.showOnlyMyProjects
        ? this.getMyProjects()
        : this.props.dateSortedProjects
      return (
        <ProjectsContainer className="container-fluid">
          <div className="container">
            <ProjectsFilter schema={schema} />
            <div className="row row-eq-height">
              {projects.map((project, index) => {
                return (
                  <ProjectCard
                    ixo={this.props.ixo}
                    project={project.data}
                    did={project.projectDid}
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
    if (this.props.projects === null) {
      return <Spinner info="Loading Projects" />
    } else {
      if (this.props.contentType === contentType.dashboard) {
        return (
          <ProjectsDashboard
            claims={this.props.projectClaims}
            claimsTotalRequired={this.props.totalClaimsRequired}
            agents={this.props.projectClaimsAgents}
            projectCountries={this.props.projectCountries}
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
          ixo={this.props.ixo}
          myProjectsCount={this.getMyProjectsList().length}
          showMyProjects={(val): void => this.showMyProjects(val)}
          contentType={this.props.contentType}
        />
        {this.handleRenderProjectList()}
      </Container>
    )
  }
}

function mapStateToProps(state: RootState): Record<string, any> {
  return {
    ixo: state.ixo.ixo,
    userInfo: state.account.userInfo,
    projects: ProjectsSelectors.selectAllProjects(state),
    dateSortedProjects: ProjectsSelectors.selectDateSortedProjects(state),
    projectCountries: ProjectsSelectors.selectProjectCountries(state),
    projectClaimsAgents: ProjectsSelectors.selectClaimsAgents(state),
    projectClaims: ProjectsSelectors.selectClaims(state),
    totalClaimsRequired: ProjectsSelectors.selectTotalClaimsRequired(state),
  }
}

const mapDispatchToProps = (dispatch: any): any => ({
  onGetProjects: (): void => {
    dispatch(getProjects())
  },
})

export const ProjectsContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Projects as any)
