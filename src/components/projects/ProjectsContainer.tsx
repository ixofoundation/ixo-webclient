import * as React from 'react';
import styled from 'styled-components';
import { ProjectCard } from './ProjectCard';
import { ProjectsHero } from './ProjectsHero';
import { Spinner } from '../common/Spinner';
import { connect } from 'react-redux';

import { PublicSiteStoreState } from '../../redux/public_site_reducer';

const Container = styled.div`
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
	height: calc(100vh - 70px);
	background-color: ${props => props.theme.bg.blue};
`;

export interface ParentProps {
	projectList?: any;
}

export interface State {
}

export interface StateProps {
	ixo?: any;
}

export interface Props extends ParentProps, StateProps {}

export class Projects extends React.Component<Props, State> {
	state = {};

	renderProjects = () => {
		if (this.props.projectList === null) {
			return (
				<div className="container-fluid">
					<ErrorContainer className="row">
						<Spinner info="App: Loading Projects" />
					</ErrorContainer>
				</div>
			);
		} else if (this.props.projectList.length > 0) {		
			return (
				<ProjectsContainer className="container-fluid">
					<div className="container">
						<div className="row row-eq-height">
							{this.props.projectList.map((project, index) => {
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
