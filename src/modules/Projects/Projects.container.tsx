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

export interface ParentProps {
  ixo?: any
  location?: any
  contentType: contentType
  userInfo?: UserInfo
  projects?: Project[]
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

  getMyProjects(userInfo: UserInfo, projList: any): Array<any> {
    if (userInfo != null) {
      const did = userInfo.didDoc.did
      const myProjects = projList.filter(proj => {
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
  getMyProjectsList = (): Project[] => {
    return this.getMyProjects(this.props.userInfo, this.getSortedProjectList())
  }

  getSortedProjectList = (): Project[] => {
    return this.props.projects && this.props.projects.length
      ? this.props.projects.sort((a, b) => {
          return (
            new Date(b.data.createdOn).getTime() -
            new Date(a.data.createdOn).getTime()
          )
        })
      : []
  }

  getProjectsCountries = (): any => {
    return this.props.projects.map(project => {
      return project.data.projectLocation
    })
  }

  getClaimsInformation = (): Record<any, any> => {
    const claimsArr = []
    let reqClaims = 0
    const agents = {
      serviceProviders: 0,
      evaluators: 0,
    }
    for (const project of this.props.projects) {
      agents.serviceProviders += project.data.agentStats.serviceProviders
      agents.evaluators += project.data.agentStats.evaluators

      // count and sum required claims
      reqClaims += project.data.requiredClaims
      for (const claim of project.data.claims) {
        claimsArr.push(claim)
      }
    }
    return {
      claims: claimsArr,
      claimsTotalRequired: reqClaims,
      agents: agents,
    }
  }

  renderProjects = (): JSX.Element => {
    if (this.props.projects.length > 0) {
      const projects = this.state.showOnlyMyProjects
        ? this.getMyProjectsList()
        : this.getSortedProjectList()
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
            claims={this.getClaimsInformation().claims}
            claimsTotalRequired={
              this.getClaimsInformation().claimsTotalRequired
            }
            agents={this.getClaimsInformation().agents}
            projectCountries={this.getProjectsCountries()}
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
    projects: state.projects.projects,
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
