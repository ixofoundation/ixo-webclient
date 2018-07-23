import * as React from 'react';
import styled from 'styled-components';
import { ProjectCard } from './ProjectCard';
import { ProjectsHero } from './ProjectsHero';
import { Spinner } from '../common/Spinner';
import { connect } from 'react-redux';

import { PublicSiteStoreState } from '../../redux/public_site_reducer';
import * as Toast from '../helpers/Toast';

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
}

export interface State {
	projectList: any;
	loaded: boolean;
}

export interface StateProps {
	ixo?: any;
}

export interface Props extends ParentProps, StateProps {}

export class Projects extends React.Component<Props, State> {
	state = {
		projectList: null,
		loaded: false
	};

	loadingProjects = false;

	refreshProjects() {
		if (this.props.ixo && !this.loadingProjects) {
			this.loadingProjects = true;
			this.props.ixo.project
				.listProjects()
				.then((response: any) => {
					let projectList = response.result;
					if (response.error) {
						Toast.errorToast('Unable to connect IXO Explorer');
						this.loadingProjects = false;
					} else {
						projectList.sort((a, b) => {return (a.data.createdOn < b.data.createdOn); });
						this.setState({ projectList: projectList });
						this.loadingProjects = false;
					}
				})
				.catch((result: Error) => {
					Toast.errorToast(result.message);
					this.loadingProjects = false;
				});
		}
	}

	componentWillUpdate() {
		if ( this.state.projectList === null) {
			this.refreshProjects();
		}
	}

	componentWillReceiveProps(nextProps: any) {
		if (nextProps.location.key !== this.props.location.key) {
			// the route was clicked but not changed, so lets refresh the projects
			this.refreshProjects();
		}
	}

	renderProjects = () => {
		if (this.state.projectList === null) {
			this.refreshProjects();
			return (
				<Spinner info="Loading Projects" />
			);
		} else if (this.state.projectList.length > 0) {		
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

	render() {
		return (        
			<Container>
				<ProjectsHero ixo={this.props.ixo}/>
				{this.renderProjects()}
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
