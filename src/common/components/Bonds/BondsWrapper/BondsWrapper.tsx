import * as React from 'react'
import Header from '../BondsSummaryHeader/Header'
import './BondsWrapper.scss'
import BondsSidebar from '../BondsSidebar/BondsSidebar'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { UserInfo } from '../../../../modules/Account/types'
import { RootState } from '../../../redux/types'

export interface Props {
  children: JSX.Element
  params: any
  ixo?: any
  isLoggedIn?: boolean
  location?: any
  userInfo?: UserInfo
  enableAssistantButton?: boolean
}

export interface State {
  // projectPublic: Record<string, any>
  projectStatus: string
}

export class BondsWrapper extends React.Component<Props, State> {
  state = {
    projectStatus:
      this.props.location.state && this.props.location.state.projectStatus
        ? this.props.location.state.projectStatus
        : null,
  }
  
  render(): JSX.Element {
    const {
      children,
      params,
    } = this.props
      return (
        <div className="BondsWrapper">
          <BondsSidebar
            projectDID={params.projectDID}
            bondDID={params.bondDID}
          />
          <div className="pane">
            <Header bondDID={params.bondDID} />
            {children}
          </div>
        </div>
      )
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
