import * as React from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { PublicSiteStoreState } from '../../redux/public_site_reducer';
import { decode as base64Decode } from 'base-64';
import { contentType, AgentRoles, ErrorTypes, RenderType } from '../../types/models';
import { Project } from '../../types/models/project';
import { ProjectHero } from './ProjectHero';
import { ProjectOverview } from './ProjectOverview';
import { setActiveProject } from '../../redux/activeProject/activeProject_action_creators';
import { ProjectDashboard } from './ProjectDashboard';
import { ProjectNewClaim } from './ProjectNewClaim';
import { ProjectSingleClaim } from './ProjectSingleClaim';
import { ProjectClaims } from './ProjectClaims';
import styled from 'styled-components';
import { ProjectAgents } from './ProjectAgents';
import { Spinner } from '../common/Spinner';
import { UserInfo } from '../../types/models';
import { ProjectSidebar } from './ProjectSidebar';
import * as Toast from '../helpers/Toast';
import { deviceWidth } from '../../lib/commonData';
import { ProjectClaimSubmitted } from './ProjectClaimSubmitted';

const placeholder = require('../../assets/images/ixo-placeholder-large.jpg');

const Loading = styled.div`

	display:flex;
	justify-content:center;
	align-items:center;

	height:calc(100vh - 140px);
`;

const DetailContainer = styled.div`
	background: ${props => props.theme.bg.gradientBlue};
	display:block;
	height: 100%;
	min-height: 700px;
	
	@media (min-width: ${deviceWidth.mobile}px) {
		display:flex;
	}
`;
export interface State {
	isModalOpen: boolean;
	modalData: any;
	projectPublic: Object;
	claims: Object[];
	serviceProviders: any[];
	investors: any[];
	evaluators: any[];
	PDSUrl: string;
	userRoles: AgentRoles[];
	imageLink: string;
	claimSubmitted: boolean;
	singleClaimFormFile: string;
	singleClaimDependentsFetched: boolean;
	singleClaim: Object;
}

export interface StateProps {
	ixo?: any;  
	projectDid?: any;
	keysafe?: any;
	userInfo?: UserInfo;
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

export class ProjectContainer extends React.Component<Props, State> {
	
	state = {
		isModalOpen: false,
		modalData: {},
		projectPublic: null,
		claims: null,
		serviceProviders: null,
		investors: null,
		evaluators: null,
		PDSUrl: 'http://35.192.187.110:5000/',
		userRoles: null,
		imageLink: placeholder,
		claimSubmitted: false,
		singleClaimFormFile: '',
		singleClaimDependentsFetched: false,
		singleClaim: null
	};

	handleToggleModal = (data: any, modalStatus: boolean) => {
		this.setState({ modalData: data, isModalOpen: modalStatus });
	}

	componentWillReceiveProps() {
		this.setState({ claimSubmitted: false, singleClaimDependentsFetched: false });
	}

	componentDidMount() {
		this.handleGetProjectData();
	}

	handleGetProjectData = () => {
		if (this.state.projectPublic === null) {
			this.props.onSetActiveProject(this.props.match.params.projectDID);
			const did = this.props.match.params.projectDID;
			this.props.ixo.project.getProjectByProjectDid(did).then((response: any) => {
				const project: Project = response.result.data;
				this.setState({ projectPublic: project});
				this.handleGetCapabilities();
			}).catch((result: Error) => {
				Toast.errorToast(result.message, ErrorTypes.goBack);
			});
		}
	}

	handleGetCapabilities = () => {
		const userRoles = [];
		const userInfo: UserInfo = this.props.userInfo;
		if (userInfo) {
			this.state.projectPublic.agents.map((agent) => {
				if (agent.did === userInfo.didDoc.did) {
					userRoles.push(agent.role);
				}
			});
		}
		this.setState({ userRoles: userRoles});
	}

	handleHasCapability = (role: AgentRoles) => {
		return (this.state.userRoles.includes(role)) ? true : false;
	}

	handleListClaims = () => {
		if (this.state.claims === null) {
			const ProjectDIDPayload: Object = { projectDid: this.props.projectDid};
			this.props.keysafe.requestSigning(JSON.stringify(ProjectDIDPayload), (error, signature) => {	
				if (!error) {
					this.props.ixo.claim.listClaimsForProject(ProjectDIDPayload, signature, 'test' + this.state.PDSUrl).then((response: any) => {
						if (response.error) {
							Toast.errorToast(response.error.message, ErrorTypes.goBack);
						} else {
							let claimsObj = [];
							if (this.state.claims !== null) {
								claimsObj = [...this.state.claims];
							}
							claimsObj = response.result;

							// @ts-ignore
							this.setState({ claims: [...claimsObj]});
						}
					}).catch((result: Error) => {
						Toast.errorToast(result.message, ErrorTypes.goBack);
					});
				} else {
					Toast.errorToast(error, ErrorTypes.goBack);
				}
			});
		}
	}

	handleRenderClaims = (renderType: RenderType) => {
		if (this.state.claims === null) {
			this.handleListClaims();
			return <Spinner info="Loading..." />;
		} else if (renderType === RenderType.widget) {
			return <ProjectClaims fullPage={false} claims={this.state.projectPublic.claims} projectDid={this.props.projectDid}/>;
		} else if (this.state.claims.length > 0) {		
			return (
				<Fragment>
					<ProjectHero project={this.state.projectPublic} match={this.props.match} isDetail={true} hasCapability={this.handleHasCapability} />
					<DetailContainer>
						<ProjectSidebar match={this.props.match} projectDid={this.props.projectDid}/>
						<ProjectClaims fullPage={true} claims={this.state.claims} projectDid={this.props.projectDid}/>
					</DetailContainer>
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<ProjectHero project={this.state.projectPublic} match={this.props.match} isDetail={true} hasCapability={this.handleHasCapability} />
					<DetailContainer>
						<ProjectSidebar match={this.props.match} projectDid={this.props.projectDid}/>
						<Loading className="container-fluid"><p>No Claims found</p></Loading>
					</DetailContainer>
				</Fragment>
			);
		} 
	}

	handleRenderAgents = (agentRole: string) => {
		if (this.state[agentRole] === null) {
			this.handleListAgents(agentRole);
			return <Spinner info="Loading agents..." />;
		} else if (this.state[agentRole].length > 0) {
			return (
				<Fragment>
					<ProjectHero project={this.state.projectPublic} match={this.props.match} isDetail={true} hasCapability={this.handleHasCapability} />
					<DetailContainer>
						<ProjectSidebar match={this.props.match} projectDid={this.props.projectDid}/>
						<ProjectAgents agents={...this.state[agentRole]} handleUpdateAgentStatus={this.handleUpdateAgent}/>
					</DetailContainer>
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<ProjectHero project={this.state.projectPublic} match={this.props.match} isDetail={true} hasCapability={this.handleHasCapability} />
					<DetailContainer>
						<ProjectSidebar match={this.props.match} projectDid={this.props.projectDid}/>
						<Loading className="container-fluid"><p>No Agents found</p></Loading>
					</DetailContainer>
				</Fragment>
			);
		}
	}

	handleListAgents = (agentRole: string) => {
		if (this.state[agentRole] === null) {
			const ProjectDIDPayload: Object = { projectDid: this.props.projectDid, role: AgentRoles[agentRole]};
			this.props.keysafe.requestSigning(JSON.stringify(ProjectDIDPayload), (error, signature) => {	
				if (!error) {
					this.props.ixo.agent.listAgentsForProject(ProjectDIDPayload, signature, this.state.PDSUrl).then((response: any) => {
						if (response.error) {
							Toast.errorToast(response.error.message, ErrorTypes.goBack);
							console.log('error occured', response.error);
						} else {
							let agentsObj = [];
							if (this.state[agentRole] !== null) {
								agentsObj = [...this.state[agentRole]];
							}
							agentsObj = response.result;

							// @ts-ignore
							this.setState({ [agentRole]: [...agentsObj]});
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

	checkUserDid = () => {
		if (this.props.keysafe === null || this.props.userInfo === null) {
			window.alert('Please install IXO Credential Manager first.');
			return false;
		} else {
			return true;
		}
	}

	handleCreateAgent = (agentFormData) => {
		if (this.checkUserDid() == null) {
			return;
		}
		const agentData = {
			email: agentFormData.email,
			name: agentFormData.name,
			role: agentFormData.role,
			agentDid: this.props.userInfo.didDoc.did,
			projectDid: this.props.projectDid
		};
		this.props.keysafe.requestSigning(JSON.stringify(agentData), (error: any, signature: any) => {
			if (!error) {
				this.props.ixo.agent.createAgent(agentData, signature, this.state.PDSUrl).then((res) => {
					if (res.error !== undefined) {
						Toast.errorToast(res.error.message);
					} else {
						Toast.successToast(`Successfully registered as ${agentData.role}`);
					}
				});
			} else {
				Toast.errorToast('PDS is not responding');
			}
		});
	}

	handleUpdateAgent = (statusObj: any, did: string, role: string) => {
		let agentPaylod = {
			agentDid: did,
			status: statusObj.status,
			projectDid: this.props.projectDid,
			role: role
		};

		if (statusObj.version) {
			agentPaylod['version'] = statusObj.version;
		}

		this.props.keysafe.requestSigning(JSON.stringify(agentPaylod), (error, signature) => {
			if (!error) {
				this.props.ixo.agent.updateAgentStatus(agentPaylod, signature, this.state.PDSUrl).then((res) => {
					console.log(res);
				}); 
			} else {
				console.log(error);
			}
		});
	}

	handleEvaluateClaim = (statusObj: any, id: string) => {
		let claimPayload = {
			claimId: id,
			status: statusObj.status,
			projectDid: this.props.projectDid,
		};

		if (statusObj.version) {
			claimPayload['version'] = statusObj.version;
		}

		this.props.keysafe.requestSigning(JSON.stringify(claimPayload), (error, signature) => {
			if (!error) {
				this.props.ixo.claim.evaluateClaim(claimPayload, signature, this.state.PDSUrl).then((res) => {
					console.log(res);
				}); 
			} else {
				console.log(error);
			}
		});
	}

	handleSubmitClaim = (claimData) => {
		let claimPayload = Object.assign(claimData);
		claimPayload['projectDid'] = this.props.projectDid;
		this.props.keysafe.requestSigning(JSON.stringify(claimPayload), (error, signature) => {			
			if (!error) {
				this.props.ixo.claim.createClaim(claimPayload, signature, this.state.PDSUrl).then((response) => {
					Toast.successToast('Claim has been submitted successfully');
					this.setState({ claimSubmitted: true });
				}).catch((claimError: Error) => {
					Toast.errorToast(claimError.message);
				});
			} else {
				Toast.errorToast(error);
				console.log(error);
			}
		});
	}

	handleGetClaim(ProjectDIDPayload: object, signature: string): Promise<any> {
		return new Promise((resolve) => {
			this.props.ixo.claim.listClaimsForProject(ProjectDIDPayload, signature, this.state.PDSUrl).then((response: any) => {
				if (response.error) {
					Toast.errorToast(response.error.message, ErrorTypes.goBack);
				} else {
					const claimFound = response.result.filter((theClaim) => theClaim.txHash === this.props.match.params.claimID)[0];
					return resolve(claimFound);
				}
			});
		});
	}

	handleFetchFormFile(claimFormKey: string, pdsURL: string): Promise<any> {
		return new Promise ((resolve) => {
			this.props.ixo.project.fetchPublic(claimFormKey, pdsURL).then((res: any) => {
				let fileContents = base64Decode(res.data);
				return resolve(fileContents);
			});
		});
	}

	handleSingleClaimFetch = (project: any) => {
		const ProjectDIDPayload: Object = { projectDid: this.props.projectDid};
		this.props.keysafe.requestSigning(JSON.stringify(ProjectDIDPayload), (error, signature) => {	
			if (!error) {
				const claimPromise = this.handleGetClaim(ProjectDIDPayload, signature); // get claim
				const formFilePromise = this.handleFetchFormFile(project.templates.claim.form, this.state.PDSUrl); // get form file
				Promise.all([claimPromise, formFilePromise]).then(([claim, formFile]) => {
					this.setState({ singleClaim: claim, singleClaimFormFile: formFile, singleClaimDependentsFetched: true });
					this.handleFetchClaimImages(formFile, claim); // go fetch images
				});
			} else {
				console.log(error);
			}
		});
	}

	handleFetchClaimImages = (formFile: any, claim: any) => {
		const { fields = [] } = JSON.parse(formFile);
		let promises = [];
		fields.forEach(field => {
			if (field.type === 'image') {
				promises.push(
					this.props.ixo.project.fetchPublic(claim[field.name], this.state.PDSUrl).then((res: any) => {
						let imageSrc = 'data:' + res.contentType + ';base64,' + res.data;
						claim[field.name] = imageSrc;
						this.setState({ singleClaim: claim });
					})
				);
			}
		});
		Promise.all(promises);
	}

	fetchImage = (imageLink: string, pdsURL: string) => {
		this.props.ixo.project.fetchPublic(imageLink, pdsURL).then((res: any) => {
			let imageSrc = 'data:' + res.contentType + ';base64,' + res.data;
			this.setState({ imageLink: imageSrc });
		});
	}

	handleRenderProject = () => {
		if (this.state.projectPublic === null || this.state.userRoles === null) {
			return <Spinner info="ProjectContainer: Loading Project"/>;
		} else {
			const project = this.state.projectPublic;
			switch (this.props.contentType) {
				case contentType.overview:
					if (this.state.imageLink === placeholder) {
						this.fetchImage(project.imageLink, project.serviceEndpoint);
					}
					return (
						<Fragment>
							<ProjectHero project={project} match={this.props.match} isDetail={false} hasCapability={this.handleHasCapability} />
							<ProjectOverview
								checkUserDid={this.checkUserDid} 
								createAgent={this.handleCreateAgent}
								userInfo={this.props.userInfo}
								project={project}
								id={project._id}
								isModalOpen={this.state.isModalOpen}
								toggleModal={this.handleToggleModal}
								modalData={this.state.modalData}
								hasCapability={this.handleHasCapability}
								imageLink={this.state.imageLink}
							/>
						</Fragment>
					);
				case contentType.dashboard:
					if (this.state.projectPublic.claims === null) {
						return <Spinner info="ProjectContainer: Loading claims"/>;
					} else {
						return (
							<Fragment>
								<ProjectHero project={project} match={this.props.match} isDetail={true} hasCapability={this.handleHasCapability} />
								<DetailContainer>
									<ProjectSidebar match={this.props.match} projectDid={this.props.projectDid}/>
									<ProjectDashboard 
										projectDid={this.props.projectDid}
										agentStats={this.state.projectPublic.agentStats}
										hasCapability={this.handleHasCapability}
										claimStats={this.state.projectPublic.claimStats}
										claims={this.state.projectPublic.claims}
									/>
									
								</DetailContainer>
							</Fragment>
						);
					}
				case contentType.newClaim:
					return (
						<Fragment>
							<ProjectHero isClaim={true} project={project} match={this.props.match} isDetail={true} hasCapability={this.handleHasCapability} />
								{(this.state.claimSubmitted) ?
									<ProjectClaimSubmitted projectDid={this.props.projectDid} /> : 
									<DetailContainer>
										<ProjectSidebar match={this.props.match} projectDid={this.props.projectDid}/>
										<ProjectNewClaim projectData={project} ixo={this.props.ixo} submitClaim={(claimData) => this.handleSubmitClaim(claimData)}/>
									</DetailContainer>
								}
						</Fragment>
					);
				case contentType.singleClaim:
				if (!this.state.singleClaimDependentsFetched)  {
					this.handleSingleClaimFetch(project);
					return <Spinner info="ProjectContainer: Loading Project"/>;	
				}
				return (
					<Fragment>
						<ProjectHero isClaim={true} project={project} match={this.props.match} isDetail={true} hasCapability={this.handleHasCapability} />
						<DetailContainer>
							<ProjectSidebar match={this.props.match} projectDid={this.props.projectDid}/>
							<ProjectSingleClaim
								singleClaimFormFile={this.state.singleClaimFormFile}
								claim={this.state.singleClaim}
								match={this.props.match}
								handleListClaims={this.handleListClaims}
								handleEvaluateClaim={this.handleEvaluateClaim}
								hasCapability={this.handleHasCapability}
							/>
						</DetailContainer>
					</Fragment>
				);
				case contentType.claims:
					return this.handleRenderClaims(RenderType.fullPage);
				case contentType.evaluators:
					return this.handleRenderAgents('evaluators');
				case contentType.investors:
					return this.handleRenderAgents('investors');
				case contentType.serviceProviders:
					return this.handleRenderAgents('serviceProviders');
				default:
					return <p>Nothing to see here...</p>;
			}
		}
	}

	render() {
		return(
			<Fragment>
				{this.handleRenderProject()}
			</Fragment>	
		);	
	}
}

function mapStateToProps(state: PublicSiteStoreState) {
	return {
		ixo: state.ixoStore.ixo,
		projectDid: state.activeProjectStore.projectDid,
		keysafe: state.keysafeStore.keysafe,
		userInfo: state.loginStore.userInfo,
	};
}

function mapDispatchToProps(dispatch: any): DispatchProps {
	return {
		onSetActiveProject: (project) => {
			dispatch(setActiveProject(project));
		},
	};
}

export const ProjectContainerConnected = withRouter<Props & RouteComponentProps<{}>>(connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectContainer as any) as any);