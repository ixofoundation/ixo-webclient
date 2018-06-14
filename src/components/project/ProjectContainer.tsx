import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { PublicSiteStoreState } from '../../redux/public_site_reducer';
import { contentType } from '../../types/models';
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
	modalData: any;
	project: Object;
	ClaimList: Object[];
	PDSUrl: string;
	Agents: Object;
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
		modalData: {},
		project: null,
		claims: null,
		agents: {
			serviceProviders: null,
			Investors: null,
			Evaluators: null
		},
		PDSUrl: 'http://35.225.6.178:5000/'
	};

	handleToggleModal = (data: any, modalStatus: boolean) => {
		console.log('modal changed');
		this.setState({ modalData: data, isModalOpen: modalStatus });
	}

	componentDidMount() {
		if (this.props.ixo !== null) {
			this.handleGetProjectData();
		}
	}

	componentDidUpdate() {
		if (this.props.ixo !== null) {
			this.handleGetProjectData();
		} 
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
						// expect(response.error.message).to.be.equal('Only the Evaluation agents on project can evaluate claims');
					}).catch((result: Error) => {
						console.log((result));
					});
				} else {
					console.log(error);
				}
			});
		}
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

	handleCreateAgent = (agentData) => {
		if (this.props.keysafe === null) {
			window.alert('Please install IXO Credential Manager first.');
		} else {
			let agentCreateJson = {agentData, agentDid: '', projectDid: this.props.match.params.projectDID};
			let message: string = JSON.stringify(agentCreateJson);
			this.props.keysafe.requestSigning(message, (error: any, signature: any) => {
				
				console.log('MESSAGE IS: ', JSON.parse(message));
				console.log('SIGNATURE IS: ', signature);
				// 'http://35.225.6.178:5000/' 'http://localhost:5000/'
				this.props.ixo.agent.createAgent(JSON.parse(message), signature, 'http://35.225.6.178:5000/').then((res) => {
					console.log('AGENT CREATE STATUS: ', res);
				});
			});
		}
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
								handleCreateAgent={this.handleCreateAgent}
								project={project}
								id={project._id}
								isModalOpen={this.state.isModalOpen}
								handleToggleModal={this.handleToggleModal}
								modalData={this.state.modalData}
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
					if (this.state.agents.Evaluators !== null) {
						return (
							<div>
								<ProjectHero project={project} match={this.props.match} />
								<ProjectAgents agents={this.state.agents.Evaluators}/>
							</div>
						);
					} else {		
						this.handleGetClaims();
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