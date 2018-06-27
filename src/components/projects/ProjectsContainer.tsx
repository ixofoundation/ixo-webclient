import * as React from 'react';
import styled from 'styled-components';
import { ProjectCard } from './ProjectCard';
import { ProjectsHero } from './ProjectsHero';
import { Spinner } from '../common/Spinner';
import { StatType } from '../../types/models';
// import { imgArray } from '../../lib/commonData';
import { connect } from 'react-redux';
import { Stats } from '../../types/models/stats';

import { PublicSiteStoreState } from '../../redux/public_site_reducer';

const ProjectsContainer = styled.div`
    overflow-y: scroll;
	background: ${props => props.theme.bg.lightGrey};
    & > .row {
        margin-top:30px;
        justify-content:center;
	}
	
	> .container {
		padding: 76px 0 50px;
	}
`;

const ErrorContainer = styled.div`
	display:flex;
	justify-content:center;
	color: white;
    align-items:center;
	height:calc(100vh - 70px);
	background-color: ${props => props.theme.bg.blue};
`;

export interface ParentProps {
	projectList?: any;
}

export interface State {
	statistics: Stats;
}

export interface StateProps {
	ixo?: any;
}

export interface Props extends ParentProps, StateProps {}

export class Projects extends React.Component<Props, State> {

	state = {
		statistics: {
			claims: {
				total: 0,
				totalSuccessful: 0,
				totalSubmitted: 0,
				totalPending: 0,
				totalRejected: 0,
			},
			totalServiceProviders: 0,
			totalProjects: 0,
			totalEvaluationAgents: 0,
		},
	};

	componentDidMount() {
		this.handleGetGlobalData();
	}

	handleGetGlobalData = () => {
		this.props.ixo.stats.getGolbalStats().then((res) => {
			if (res.result) {
				const statistics: Stats = res.result;
				this.setState({ statistics });
			}
		}); 
	}

	renderProjects = () => {
		if (this.props.projectList === null) {
			return (
				<div className="container-fluid">
					<ErrorContainer className="row">
						<Spinner info="App: Loading Projects" />
						<p>Loading Projects</p>
					</ErrorContainer>
				</div>
			);
		} else if (this.props.projectList.length > 0) {
			return (
				<ProjectsContainer className="container-fluid">
					<div className="container">
						<div className="row row-eq-height">
							{this.props.projectList.map((project, index) => {
								return <ProjectCard ixo={this.props.ixo} project={project.data} did={project.projectDid} key={index} />;
							})}
						</div>
					</div>
				</ProjectsContainer>
			);
		} else {
			return (
				<div className="container-fluid">
					<div className="row">
						<ErrorContainer className="col-md-12"><p>No projects were found</p></ErrorContainer>
					</div>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				<ProjectsHero 
					statistics={[
						{title: 'MY ACTIVE PROJECTS',
						type: StatType.decimal,
						descriptor: [{class: 'text', value: 'Expired'}, {class: 'number', value: '?'}],
						amount: this.state.statistics.totalProjects},
						{title: 'TOTAL PROJECTS',
						type: StatType.decimal,
						descriptor: [{class: 'text', value: ' '}],
						amount: this.state.statistics.totalProjects},
						{title: 'TOTAL IMPACT CLAIMS',
						type: StatType.fraction,
						descriptor: [{class: 'text', value: 'verified to date'}],
						amount: [this.state.statistics.claims.totalSuccessful, this.state.statistics.claims.total]},
						{title: 'TOTAL IXO IN CIRCULATION',
						type: StatType.fraction,
						descriptor: [{class: 'text', value: 'IXO staked to date'}],
						amount: [0, 0]}
					]} 
				/>
					{this.renderProjects()}
			</div>
		);
	}
}

function mapStateToProps(state: PublicSiteStoreState) {
	return {
		ixo: state.ixoStore.ixo,
	};
}

export const ProjectsContainerConnected = connect<{}, {}, ParentProps>(
	mapStateToProps
)(Projects as any);