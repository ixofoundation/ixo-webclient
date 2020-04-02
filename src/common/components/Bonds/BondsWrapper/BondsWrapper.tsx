import * as React from 'react'
import Header from '../BondsSummaryHeader/Header'
import 'react-toastify/dist/ReactToastify.css'
import './BondsWrapper.css'
import BondsSidebar from '../BondsSidebar/BondsSidebar'
import { Spinner } from '../../../../components/common/Spinner'
import { TypeForm } from '../../../../components/TypeForm'
import { ProjectHero } from '../../../../components/project/ProjectHero'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Data } from '../../../../modules/project/types'
import { UserInfo } from '../../../../modules/account/types'
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
    projectDid: this.props.match.params.projectDID,
    projectPublic:
      this.props.location.state && this.props.location.state.projectPublic
        ? this.props.location.state.projectPublic
        : null,
    projectStatus:
      this.props.location.state && this.props.location.state.projectStatus
        ? this.props.location.state.projectStatus
        : null,
    claims: null,
    serviceProviders: null,
    investors: null,
    evaluators: null,
    userRoles: null,
    claimSubmitted: false,
    claimEvaluated: false,
    singleClaimFormFile: '',
    singleClaimDependentsFetched: false,
    singleClaim: null,
    ledger: {
      modalResponse: '',
      isLedgering: false,
    },
  }

  handleGetProjectData = (): void => {
    this.props.ixo.project
      .getProjectByProjectDid(this.props.params.projectDID)
      .then((response: any) => {
        console.log(response)
        const project: Data = response.data
        const status: string = response.status
        this.setState({
          projectPublic: project,
          projectStatus: status,
        })
        console.log('thestate: ', this.state)
      })
      .catch(() => {})
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
          <ProjectHero
            project={this.state.projectPublic}
            match={match}
            isDetail={true}
            hasCapability={this.handleHasCapability}
            isLoggedIn={isLoggedIn}
          />
          <div className="BondsWrapper">
            <BondsSidebar
              projectDID={params.projectDID}
              bondDID={params.bondDID}
            />
            <div className="pane">
              <TypeForm />
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
