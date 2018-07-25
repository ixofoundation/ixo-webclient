import * as React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { deviceWidth } from '../../lib/commonData';
import { AgentRoles } from '../../types/models';

const NavItem = styled(NavLink)`
	color: white;
	height: 50px;
	width: 50px;
	display:flex;
	justify-content: center;
	align-items: center;
	text-decoration: none;
	border-top: 5px solid transparent;

	@media (min-width: ${deviceWidth.mobile}px) {
		margin: 30px 0;
		width: 100%;	
		border-top: 0;
		border-left: 5px solid transparent;
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
`;

const Container = styled.div`
	width: 100%;
	padding-top: 0;
	position:relative;
	top:auto;
	display: flex;
	justify-content: space-evenly;
	height: auto;
	
	.active {
		border-top:5px solid ${props => props.theme.ixoBlue};
	}

	@media (min-width: ${deviceWidth.mobile}px) {
		position:sticky;
		top:70px;
		width: 75px;
		display: block;
		height: 450px;
		padding-top: 15px;

		.active {
			border-top: 0;
			border-left:5px solid ${props => props.theme.ixoBlue};
		}
	}

`;

export interface Props {
	match: string;
	projectDid: string;
	hasCapability: (role: [AgentRoles]) => boolean;
}

export interface State {
	activeLink: string;
}

export class ProjectSidebar extends React.Component<Props, State> {

	state = {
		activeLink: 'detail'
	};

	componentDidMount() {
		this.setState({ activeLink: this.props.match});
	}

	setActiveLink = (name: string) => {
		this.setState({ activeLink: name});
	}

	render() {
		return (
			<Container>
				<NavItem 
					exact={true}
					title="Dashboard"
					to={`/projects/${this.props.projectDid}/detail`}
					onClick={() => this.setActiveLink('detail')}
				>
					<i className={(this.state.activeLink === 'detail') ? 'icon-home-active' : 'icon-home'} />
				</NavItem>
				{(this.props.hasCapability([AgentRoles.owners])) ?
					(<React.Fragment>
						<NavItem 
							exact={true} 
							title="Service Providers" 
							to={`/projects/${this.props.projectDid}/detail/service-providers`} 
							onClick={() => this.setActiveLink('serviceProviders')}
						>
							<i className={this.state.activeLink === 'serviceProviders' ? 'icon-serviceproviders-active' : 'icon-serviceproviders'} />
						</NavItem>
						<NavItem 
							exact={true} 
							title="Evaluators" 
							to={`/projects/${this.props.projectDid}/detail/evaluators`}
							onClick={() => this.setActiveLink('evaluators')}
						>
							<i className={this.state.activeLink === 'evaluators' ? 'icon-evaluators-active' : 'icon-evaluators'} />
						</NavItem>
					</React.Fragment>) : null
				}
				<NavItem 
					exact={true} 
					title="Claims"
					to={`/projects/${this.props.projectDid}/detail/claims`}
					onClick={() => this.setActiveLink('claims')}
				>
						<i className={this.state.activeLink === 'claims' ? 'icon-claims-active' : 'icon-claims'} />
				</NavItem>
				{/* <NavItem 
					exact={true}
					title="Settings"
					to={`/projects/${this.props.projectDid}/overview`}
					onClick={() => this.setActiveLink('overview')}
				>
					<i className={this.state.activeLink === 'overview' ? 'icon-settings-active' : 'icon-settings'} />
				</NavItem> */}
			</Container>
	);
	}
}