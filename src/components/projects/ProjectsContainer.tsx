import * as React from 'react'
import styled from 'styled-components'
import { ProjectCard } from './ProjectCard'
import { ProjectsHero } from './ProjectsHero'
import { Spinner } from '../common/Spinner'
import { connect } from 'react-redux'
import { RootState } from '../../common/redux/types'
import { contentType } from '../../types/models'
import { UserInfo } from '../../modules/account/types'
import { ProjectsDashboard } from './ProjectsDashboard'
import FilterSortButtons from '../common/AdvancedFilter/FilterSortButtons'
import { deviceWidth } from '../../lib/commonData'
import { fetchProjects } from '../../modules/Projects/Projects.actions'
import { Project } from '../../modules/project/types'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  .example-enter {
    opacity: 0.01;
  }

  .example-enter.example-enter-active {
    opacity: 1;
    transition: opacity 1000ms ease-in;
  }

  .example-leave {
    opacity: 1;
  }

  .example-leave.example-leave-active {
    opacity: 0.01;
    transition: opacity 800ms ease-in;
  }
`

const ProjectsContainer = styled.div`
  background: ${/* eslint-disable-line */ props => props.theme.bg.lightGrey};
  flex: 1 1 auto;
  min-height: 480px;

  & > .row {
    margin-top: 30px;
    justify-content: center;
  }

  > .container {
    padding: 2rem 0 3.125rem;
    @media (min-width: ${deviceWidth.tablet}px) {
      padding: 4.5rem 0 3.125rem;
    }
  }
`

const ErrorContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  color: white;
  align-items: center;
  background-color: ${/* eslint-disable-line */ props => props.theme.bg.blue};
  height: 100%;
  min-height: 480px;
`

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
            <FilterSortButtons />
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
    dispatch(fetchProjects())
  },
})

export const ProjectsContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Projects as any)
