import * as React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { deviceWidth } from '../../lib/commonData'
import { AgentRoles } from '../../types/models'

const ToolTip = styled.div`
  position: absolute;
  left: 90%;
  background: #001926;
  padding: 6px 10px;
  margin-left: 15px;
  border-radius: 5px;
  font-size: 12px;
  pointer-events: none;
  opacity: 0;
  transition: all 0.3s ease;
  color: white;

  :after {
    content: '';
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    position: absolute;
    right: 100%;
    border-right: 8px solid #001926;
    top: 8px;
  }
`

const NavItem = styled(NavLink)`
  color: white;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border-top: 5px solid transparent;
  position: relative;

  @media (min-width: ${deviceWidth.mobile}px) {
    margin: 30px 0;
    width: 100%;
    border-top: 0;
    border-left: 5px solid transparent;

    :hover ${ToolTip} {
      opacity: 1;
      left: 100%;
    }
  }

  :hover {
    text-decoration: none;
  }

  i {
    font-size: 24px;
  }
  i:before {
    color: white;
  }
`

const Container = styled.div`
  width: 100%;
  padding-top: 0;
  position: relative;
  top: auto;
  display: flex;
  justify-content: space-evenly;
  height: auto;
  z-index: 1;

  .active {
    border-top: 5px solid
      ${/* eslint-disable-line */ props => props.theme.ixoBlue};
  }

  @media (min-width: ${deviceWidth.mobile}px) {
    position: sticky;
    top: 70px;
    width: 75px;
    display: block;
    height: 450px;
    padding-top: 15px;

    .active {
      border-top: 0;
      border-left: 5px solid
        ${/* eslint-disable-line */ props => props.theme.ixoBlue};
    }
  }
`

export interface Props {
  match: string
  projectDid: string
  hasCapability: (role: [AgentRoles]) => boolean
  singleClaimDependentsFetchedCallback: () => void
}

export interface State {
  activeLink: string
}

export class ProjectSidebar extends React.Component<Props, State> {
  state = {
    activeLink: 'detail',
  }

  componentDidMount(): void {
    this.setState({ activeLink: this.props.match })
  }

  setActiveLink = (name: string): void => {
    this.setState({ activeLink: name })
    this.props.singleClaimDependentsFetchedCallback()
  }

  render(): JSX.Element {
    return (
      <Container>
        <NavItem
          exact={true}
          to={`/projects/${this.props.projectDid}/detail`}
          onClick={(): void => this.setActiveLink('detail')}
        >
          <i
            className={
              this.state.activeLink === 'detail'
                ? 'icon-home-active'
                : 'icon-home'
            }
          />
          <ToolTip>Dashboard</ToolTip>
        </NavItem>
        {this.props.hasCapability([AgentRoles.owners]) ? (
          <React.Fragment>
            <NavItem
              exact={true}
              to={`/projects/${this.props.projectDid}/detail/service-providers`}
              onClick={(): void => this.setActiveLink('serviceProviders')}
            >
              <i
                className={
                  this.state.activeLink === 'serviceProviders'
                    ? 'icon-serviceproviders-active'
                    : 'icon-serviceproviders'
                }
              />
              <ToolTip>Service Providers</ToolTip>
            </NavItem>
            <NavItem
              exact={true}
              to={`/projects/${this.props.projectDid}/detail/evaluators`}
              onClick={(): void => this.setActiveLink('evaluators')}
            >
              <i
                className={
                  this.state.activeLink === 'evaluators'
                    ? 'icon-evaluators-active'
                    : 'icon-evaluators'
                }
              />
              <ToolTip>Evaluators</ToolTip>
            </NavItem>
          </React.Fragment>
        ) : null}
        <NavItem
          exact={true}
          to={`/projects/${this.props.projectDid}/detail/claims`}
          onClick={(): void => this.setActiveLink('claims')}
        >
          <i
            className={
              this.state.activeLink === 'claims'
                ? 'icon-claims-active'
                : 'icon-claims'
            }
          />
          <ToolTip>Claims</ToolTip>
        </NavItem>
        {/* <NavItem
					exact={true}
					title="Settings"
					to={`/projects/${this.props.projectDid}/overview`}
					onClick={() => this.setActiveLink('overview')}
				>
					<i className={this.state.activeLink === 'overview' ? 'icon-settings-active' : 'icon-settings1'} />
				</NavItem> */}
      </Container>
    )
  }
}
