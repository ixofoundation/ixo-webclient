import * as React from 'react';
import styled from 'styled-components';
import { ProjectCard } from './ProjectCard';
import { ProjectsHero } from './ProjectsHero';
import { Spinner } from '../common/Spinner';
import { connect } from 'react-redux';

import { PublicSiteStoreState } from '../../redux/public_site_reducer';
import * as Toast from '../helpers/Toast';
import { contentType } from '../../types/models';
import { ProjectsDashboard } from './ProjectsDashboard';

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
`;

const ProjectsContainer = styled.div`
	overflow-y: scroll;
	background: ${props => props.theme.bg.lightGrey};
	flex: 1 1 auto;

	& > .row {
		margin-top: 30px;
		justify-content: center;
	}

	> .container {
		padding: 76px 0 50px;
	}
`;

const ErrorContainer = styled.div`
	display: flex;
	justify-content: center;
	color: white;
	align-items: center;
	background-color: ${props => props.theme.bg.blue};
	height:100%:
`;

export interface ParentProps {
	ixo?: any;
	location?: any;
	contentType: contentType;
}

export interface State {
	projectList: any;
	loaded: boolean;
	claims: any;
	claimsTotalRequired: number;
	agents: any;
}

export interface StateProps {
	ixo?: any;
}

export interface Props extends ParentProps, StateProps {}

export class Projects extends React.Component<Props, State> {
	state = {
		projectList: null,
		loaded: false,
		claims: null,
		claimsTotalRequired: 0,
		agents: null
	};

	loadingProjects = false;

	componentDidMount() {
		this.refreshProjects();
	}

	refreshProjects() {
		if (this.props.ixo && !this.loadingProjects) {
			this.loadingProjects = true;
			this.props.ixo.project
				.listProjects()
				.then((response: any) => {
					let projectList = response;
					projectList.sort((a, b) => {return new Date(b.data.createdOn).getTime() - new Date(a.data.createdOn).getTime(); } );

					let claimsArr = new Array();
					let reqClaims: number = 0;
					let agents = {
						serviceProviders: 0,
						evaluators: 0
					};
					for (let project of projectList) {

						agents.serviceProviders += project.data.agentStats.serviceProviders;
						agents.evaluators += project.data.agentStats.evaluators;

						// count and sum required claims
						reqClaims += project.data.requiredClaims;
						for (let claim of project.data.claims) {
							claimsArr.push(claim);
						}
					}

					this.setState({ 
						projectList: projectList,
						claims: claimsArr,
						claimsTotalRequired: reqClaims,
						agents: Object.assign({}, agents)
					});
					this.loadingProjects = false;
				})
				.catch((result: Error) => {
					Toast.errorToast('Unable to connect IXO Explorer');
					this.loadingProjects = false;
				});
		}
	}

	componentWillUpdate() {
		if (this.state.projectList === null) {
			this.refreshProjects();
		}
	}

	componentWillReceiveProps(nextProps: any) {
		if (this.props.contentType) {
			if (nextProps.location.key !== this.props.location.key) {
				// the route was clicked but not changed, so lets refresh the projects
				this.refreshProjects();
			}
		}
	}

	renderProjects = () => {
		if (this.state.projectList.length > 0) {		
			return (
				<ProjectsContainer className="container-fluid">
					<div className="container">
						<div className="row row-eq-height">
							{this.state.projectList.map((project, index) => {
								return (
									<ProjectCard
										ixo={this.props.ixo}
										project={project.data}
										did={project.projectDid}
										key={index}
									/>
								);
							})}
						</div>
					</div>
				</ProjectsContainer>
			);
		} else {
			return (
				<div className="container-fluid">
					<div className="row">
						<ErrorContainer className="col-md-12">
							<p>No projects were found</p>
						</ErrorContainer>
					</div>
				</div>
			);
		}
	}

	handleRenderProjects() {
		if (this.state.projectList === null) {
			return <Spinner info="Loading Projects" />;
		} else {
			if (this.props.contentType === contentType.dashboard) {
				return (
					<ProjectsDashboard 
						claims={this.state.claims} 
						claimsTotalRequired={this.state.claimsTotalRequired}
						agents={this.state.agents}
					/>
				);
			} else {
				return this.renderProjects();
			}
		}
	}

	render() {
			return (        
				<Container>
					<ProjectsHero ixo={this.props.ixo}/>
					{this.handleRenderProjects()}
				</Container>
			);
		}
	}

function mapStateToProps(state: PublicSiteStoreState) {
	return {
		ixo: state.ixoStore.ixo
	};
}

export const ProjectsContainerConnected = connect<{}, {}, ParentProps>(mapStateToProps)(Projects as any);
