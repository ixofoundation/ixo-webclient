import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { PublicSiteStoreState } from '../../redux/public_site_reducer';
import { contentType } from '../../types/models';
import { ProjectHero } from './ProjectHero';
import { ProjectOverview } from './ProjectOverview';
import { getCountryName } from '../../utils/formatters';
import { setActiveProject } from '../../redux/activeProject/activeProject_action_creators';
import { ProjectDashboard } from './ProjectDashboard';

export interface State {
	isModalOpen: boolean;
	project: Object;
}

export interface DispatchProps {
	ixo?: any;  
	projectDid?: any;
	onSetActiveProject: (project: any) => void;

}

export interface StateProps {    
	location: any;   
	contentType: contentType;
	match: any;
}

export interface Props extends DispatchProps, StateProps {}

export class SingleProject extends React.Component<Props> {

	state = {
		isModalOpen: false,
		project: null
	};

	handleToggleModal = (modalStatus: boolean) => {
		console.log('modal changed');
		this.setState({ isModalOpen: modalStatus });
	}

	componentDidMount() {
		this.handleGetProjectData();

		console.log(this.props.match);
	}

	componentDidUpdate() {
		this.handleGetProjectData();
	}

	handleGetProjectData = () => {
		if (this.props.ixo !== null && this.state.project === null) {
			this.props.onSetActiveProject(this.props.match.params.projectDID);
			const did = this.props.match.params.projectDID;
			let project = null;

			this.props.ixo.project.listProjects().then((response: any) => {
				project = response.result.filter((single, index) => single.projectDid === did)[0];
				this.setState({ project: project.data});
			}).catch((result: Error) => {
				console.log(result);
			});
		}
	}

	handleRenderProject = () => {
		if (this.state.project === null) {
			return <div><p>Loading</p></div>;
		} else {
			const project = this.state.project;

			switch (this.props.contentType) {
				case contentType.overview:
					return (
						<div>
							<ProjectHero 
								projectTitle={project.title}
								SDGs={project.sdgs}
								description={project.shortDescription}
								dateCreated={project.createdOn.split('T')[0]}
								country={getCountryName(project.projectLocation)}
								owner={project.ownerName}
								match={this.props.match}
							/>
							<ProjectOverview 
								project={project}
								id={project._id}
								isModalOpen={this.state.isModalOpen}
								handleToggleModal={this.handleToggleModal}
							/>
						</div>
					);
				case contentType.dashboard:
					return (
						<div>
							<ProjectHero 
								projectTitle={project.title}
								SDGs={project.sdgs}
								description={project.shortDescription}
								dateCreated={project.createdOn.split('T')[0]}
								country={getCountryName(project.projectLocation)}
								owner={project.ownerName}
								match={this.props.match}
							/>
							<ProjectDashboard
							/>
						</div>
					);
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
		projectDid: state.activeProjectStore.projectDid
	};
}

function mapDispatchToProps(dispatch: any): DispatchProps {
	return {
		onSetActiveProject: (project) => {
			dispatch(setActiveProject(project));
		}
	};
}

export const SingleProjectConnected = withRouter<StateProps & RouteComponentProps<{}>>(connect(
	mapStateToProps,
	mapDispatchToProps
)(SingleProject as any) as any);