import * as React from 'react'
import styled from 'styled-components'
import { ProjectCard } from './ProjectCard'
import { ProjectsHero } from './ProjectsHero'
import { Spinner } from '../common/Spinner'
import { connect } from 'react-redux'

import { RootState } from '../../common/redux/types'
import * as Toast from '../helpers/Toast'
import { contentType } from '../../types/models'
import { UserInfo } from '../../modules/account/types'
import { ProjectsDashboard } from './ProjectsDashboard'
import { explorerSocket } from '../helpers/explorerSocket'
import FilterSortButtons from '../common/AdvancedFilter/FilterSortButtons'
import { deviceWidth } from '../../lib/commonData'

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
}

export interface State {
  projectList: any[]
  claims: any
  claimsTotalRequired: number
  agents: any
  myProjects: any[]
  showOnlyMyProjects: boolean
}

export interface StateProps {
  ixo?: any
}

export interface Props extends ParentProps, StateProps {}

export class Projects extends React.Component<Props, State> {
  state = {
    projectList: null,
    claims: null,
    claimsTotalRequired: 0,
    agents: null,
    myProjects: [],
    showOnlyMyProjects: false,
  }

  loadingProjects = false

  componentDidMount(): void {
    this.refreshAllProjects()
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

  getProjectsCountries = (): any => {
    return this.state.projectList.map(project => {
      return project.data.projectLocation
    })
  }

  refreshAllProjects(): void {
    if (this.props.ixo && !this.loadingProjects) {
      this.loadingProjects = true
      this.props.ixo.project
        .listProjects()
        .then((response: any) => {
          const projectList = response
          projectList.sort((a, b) => {
            return (
              new Date(b.data.createdOn).getTime() -
              new Date(a.data.createdOn).getTime()
            )
          })

          const claimsArr = []
          let reqClaims = 0
          const agents = {
            serviceProviders: 0,
            evaluators: 0,
          }
          for (const project of projectList) {
            agents.serviceProviders += project.data.agentStats.serviceProviders
            agents.evaluators += project.data.agentStats.evaluators

            // count and sum required claims
            reqClaims += project.data.requiredClaims
            for (const claim of project.data.claims) {
              claimsArr.push(claim)
            }
          }
          this.setState({
            projectList: projectList,
            claims: claimsArr,
            claimsTotalRequired: reqClaims,
            agents: Object.assign({}, agents),
            myProjects: this.getMyProjects(this.props.userInfo, projectList),
          })
          this.loadingProjects = false
        })
        .catch(() => {
          Toast.errorToast('Unable to connect IXO Explorer')
          this.loadingProjects = false
        })
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: any): void {
    if (this.props.contentType) {
      if (
        nextProps.location &&
        nextProps.location.key !== this.props.location.key
      ) {
        // the route was clicked but not changed, so lets refresh the projects
        this.refreshAllProjects()
      }
    }
    if (
      this.state.projectList !== null &&
      this.props.userInfo !== nextProps.userInfo
    ) {
      this.setState({
        myProjects: this.getMyProjects(
          nextProps.userInfo,
          this.state.projectList,
        ),
      })
    }
  }

  renderProjects = (): JSX.Element => {
    if (this.state.projectList.length > 0) {
      const projects = this.state.showOnlyMyProjects
        ? this.state.myProjects
        : this.state.projectList
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
    if (this.state.projectList === null) {
      return <Spinner info="Loading Projects" />
    } else {
      if (this.props.contentType === contentType.dashboard) {
        return (
          <ProjectsDashboard
            claims={this.state.claims}
            claimsTotalRequired={this.state.claimsTotalRequired}
            agents={this.state.agents}
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
          myProjectsCount={this.state.myProjects.length}
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
  }
}

export const ProjectsContainerConnected = connect(mapStateToProps)(
  Projects as any,
)
