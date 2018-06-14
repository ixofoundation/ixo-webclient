import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { PublicSiteStoreState } from '../../redux/public_site_reducer';
import { contentType, AgentRole } from '../../types/models';
import { ProjectHero } from './ProjectHero';
import { ProjectOverview } from './ProjectOverview';
import { setActiveProject } from '../../redux/activeProject/activeProject_action_creators';
import { ProjectDashboard } from './ProjectDashboard';
import { ProjectNewClaim } from './ProjectNewClaim';
import { ProjectClaims } from './ProjectClaims';
import styled from 'styled-components';
import { ProjectAgents } from './ProjectAgents';

const Loading = styled.div`
	display:flex;
	justify-content:center;
	align-items:center;
	height:calc(100vh - 140px);
`;
export interface State {
	isModalOpen: boolean;
	project: Object;
	ClaimList: Object[];
	PDSUrl: string;
	Agents: Object;
	selectedRoleToCreate: AgentRole;
}

export interface StateProps {
	ixo?: any;  
	projectDid?: any;
	keysafe?: any;
}

export interface DispatchProps {
	onSetActiveProject?: (project: any) => void;
}

export interface ParentProps {    
	location: any;   
	contentType: contentType;
	match: any;
}

export interface Props extends ParentProps, StateProps, DispatchProps {}

export class ProjectContainer extends React.Component<Props> {

	state = {
		isModalOpen: false,
		project: null,
		userDid: null,
		selectedRoleToCreate: null,
		claims: null,
		agents: {
			serviceProviders: null,
			investors: null,
			evaluators: null
		},
		PDSUrl: 'http://35.225.6.178:5000/'
	};

	handleToggleModal = (modalStatus: boolean) => {
		this.setState({ isModalOpen: modalStatus });
	}

	componentDidMount() {
			this.handleGetProjectData();
			this.handleGetUserDid();
	}

	handleGetUserDid = () => {
		this.props.keysafe.getInfo((error, response) => {
			if (response) {
				this.setState({userDid: response.didDoc.did});
				console.log('User Did has been captured');
			} else {
				console.log('Please login to your credential provider', error);
			}
		});
	}

	handleGetProjectData = () => {
		if (this.state.project === null) {
			this.props.onSetActiveProject(this.props.match.params.projectDID);
			const did = this.props.match.params.projectDID;
			let project = null;

			this.props.ixo.project.listProjects().then((response: any) => {
				project = response.result.filter((single) => single.projectDid === did)[0];
				this.setState({ project: project.data});
			}).catch((result: Error) => {
				console.log(result);
			});
		}
	}

	handleGetClaims = () => {
		if (this.state.claims === null) {
			this.state.claims = {};
			const ProjectDIDPayload: Object = { projectDid: this.props.match.params.projectDID};
			this.props.keysafe.requestSigning(JSON.stringify(ProjectDIDPayload), (error, signature) => {	
				if (!error) {
					this.props.ixo.claim.listClaimsForProject(ProjectDIDPayload, signature, this.state.PDSUrl).then((response: any) => {
						this.setState({claimList: response.result});
					}).catch((result: Error) => {
						console.log((result));
					});
				} else {
					console.log(error);
				}
			});
		}
	}

	handleListAgents = () => {
		if (this.state.agents.serviceProviders === null) {
			const ProjectDIDPayload: Object = { projectDid: this.props.match.params.projectDID};
			this.props.keysafe.requestSigning(JSON.stringify(ProjectDIDPayload), (error, signature) => {	
				if (!error) {
					this.props.ixo.agent.listAgentsForProject(ProjectDIDPayload, signature, this.state.PDSUrl).then((response: any) => {
						if (response.error) {
							console.log('error occured', response.error);
						} else {
							this.setState({agents: response.result});
						}
					}).catch((result: Error) => {
						console.log((result));
					});
				} else {
					console.log(error);
				}
			});
		}
	}

	handleCreateAgent = () => {
		console.log(this.state.userDid);
		debugger;
		const agentData = {
			email: 'don@ixo.com',
			name: 'Don',
			role: this.state.selectedRoleToCreate,
			agentDid: this.state.userDid,
			projectDid: this.props.match.params.projectDID
		};

		console.log(agentData);
		this.props.keysafe.requestSigning(JSON.stringify(agentData), (error: any, signature: any) => {
			if (!error) {
				this.props.ixo.agent.createAgent(agentData, signature, this.state.PDSUrl).then((res) => {
					console.log('AGENT CREATE STATUS: ', res);
				});
			} else {
				console.log(error);
			}
		});
	}

	handleSubmitClaim = (claimData) => {
		this.props.keysafe.requestSigning(JSON.stringify(claimData), (error, signature) => {			
			if (!error) {
				this.props.ixo.claim.createClaim(claimData, signature, this.state.PDSUrl).then((response) => {
					console.log('claim has been submitted successfully', response);
				}).catch((claimError: Error) => {
					console.log(claimError);
				});
			} else {
				console.log(error);
			}
		});
	}

	handleSelectedRoleToCreate = (role) => {
		this.setState({selectedRoleToCreate: role});
	}

	handleRenderProject = () => {
		if (this.state.project === null) {
			return <Loading className="col-md-12"><p>Loading...</p></Loading>;
		} else {
			const project = this.state.project;

			switch (this.props.contentType) {
				case contentType.overview:
					return (
						<div>
							<ProjectHero project={project} match={this.props.match} />
							<ProjectOverview 
								project={project}
								id={project._id}
								isModalOpen={this.state.isModalOpen}
								handleToggleModal={this.handleToggleModal}
								handleCreateAgent={this.handleCreateAgent}
								selectedRoleToCreate={this.state.selectedRoleToCreate}
								handleselectedRoleToCreate={(role: AgentRole) => this.handleSelectedRoleToCreate(role)}
							/>
						</div>
					);
				case contentType.dashboard:
					return (
						<div>
							<ProjectHero project={project} match={this.props.match} />
							<ProjectDashboard
							/>
						</div>
					);
				case contentType.newClaim:
					return (
						<div>
							<ProjectHero project={project} match={this.props.match} />
							<ProjectNewClaim submitClaim={(claimData) => this.handleSubmitClaim(claimData)}/>
						</div>
					);
				case contentType.claims:
					if (this.state.claims !== null) {
						return (
							<div>
								<ProjectHero project={project} match={this.props.match} />
								<ProjectClaims claims={this.state.claims}/>
							</div>
						);
					} else {		
						this.handleGetClaims();
						return <Loading className="col-md-12"><p>Loading...</p></Loading>;
					}
				case contentType.evaluators:
				case contentType.serviceProviders:
				case contentType.investors:
					let agents: Object = null;
					if (this.props.contentType === contentType.evaluators) {
						agents = this.state.agents.evaluators;
					} else if (this.props.contentType === contentType.serviceProviders) {
						agents = this.state.agents.serviceProviders;
					} else if (this.props.contentType === contentType.investors) {
						agents = this.state.agents.investors;
					}
					if (agents !== null) {
						return (
							<div>
								<ProjectHero project={project} match={this.props.match} />
								<ProjectAgents agents={agents}/>
							</div>
						);
					} else {		
						this.handleListAgents();
						return <Loading className="col-md-12"><p>Loading...</p></Loading>;
					}
				default:
					return <p>Nothing to see here...</p>;
			}
		}
	}
		// if (performance.navigation.type === 1) {
		// 	console.info( 'This page is reloaded' );
		// } else {
		// 	console.info( 'This page is not reloaded');
		// }	
	render() {
		return(
			<div>
				{this.handleRenderProject()}
			</div>	
		);	
	}
}

function mapStateToProps(state: PublicSiteStoreState) {
	return {
		ixo: state.ixoStore.ixo,
		projectDid: state.activeProjectStore.projectDid,
		keysafe: state.keysafeStore.keysafe
	};
}

function mapDispatchToProps(dispatch: any): DispatchProps {
	return {
		onSetActiveProject: (project) => {
			dispatch(setActiveProject(project));
		}
	};
}

export const ProjectContainerConnected = withRouter<Props & RouteComponentProps<{}>>(connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectContainer as any) as any);