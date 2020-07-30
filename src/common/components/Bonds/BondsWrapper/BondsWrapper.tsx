import * as React from 'react'
import Header from '../BondsSummaryHeader/Header'
import './BondsWrapper.css'
import BondsSidebar from '../BondsSidebar/BondsSidebar'
import { Spinner } from '../../Spinner'
import { ProjectHero } from '../../../../components/project/ProjectHero'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Data } from '../../../../modules/project/types'
import { UserInfo } from '../../../../modules/Account/types'
import { RootState } from '../../../redux/types'
import { AgentRoles } from '../../../../types/models'

export interface Props {
  children: JSX.Element
  params: any
  ixo?: any
  isLoggedIn: boolean
  location: any
  match: any
  userInfo?: UserInfo
}

export interface State {
  projectPublic: Record<string, any>
  projectStatus: string
}

export class BondsWrapper extends React.Component<Props, State> {
  state = {
    projectPublic:
      this.props.location.state && this.props.location.state.projectPublic
        ? this.props.location.state.projectPublic
        : null,
    projectStatus:
      this.props.location.state && this.props.location.state.projectStatus
        ? this.props.location.state.projectStatus
        : null,
  }

  handleGetProjectData = (): void => {
    this.props.ixo.project
      .getProjectByProjectDid(this.props.params.projectDID)
      .then((response: any) => {
        const project: Data = response.data
        const status: string = response.status
        this.setState({
          projectPublic: project,
          projectStatus: status,
        })
      })
  }

  handleHasCapability = (roles: AgentRoles[]): boolean => {
    const userInfo: UserInfo = this.props.userInfo
    let found = false
    if (userInfo) {
      if (this.state.projectPublic.createdBy === userInfo.didDoc.did) {
        if (
          roles.some(val => {
            return val === AgentRoles.owners
          })
        ) {
          return true
        }
      }
      this.state.projectPublic.agents.forEach(agent => {
        if (agent.did === userInfo.didDoc.did) {
          if (
            roles.some(val => {
              return val === agent.role
            })
          ) {
            found = true
          }
        }
      })
    }
    return found
  }

  componentDidMount(): void {
    this.handleGetProjectData()
  }

  render(): JSX.Element {
    const { children, params, isLoggedIn, match } = this.props

    if (this.state.projectPublic === null) {
      this.handleGetProjectData()
      return <Spinner info="Loading..." />
    } else {
      return (
        <div>
          <div className="BondsWrapper">
            <BondsSidebar
              projectDID={params.projectDID}
              bondDID={params.bondDID}
            />
            <div className="pane">
              <ProjectHero
                project={this.state.projectPublic}
                match={match}
                isDetail={true}
                onlyTitle
                hasCapability={this.handleHasCapability}
                isLoggedIn={isLoggedIn}
              />
              <Header bondDID={params.bondDID} />
              {children}
            </div>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state: RootState): Record<string, any> {
  return {
    ixo: state.ixo.ixo,
    userInfo: state.account.userInfo,
    isLoggedIn:
      state.account.userInfo && state.account.userInfo.loggedInKeysafe,
  }
}

export const BondsWrapperConnected = withRouter(
  connect(mapStateToProps)(BondsWrapper as any) as any,
)
