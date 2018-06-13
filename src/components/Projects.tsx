import * as React from 'react';
import styled from 'styled-components';
import { ProjectCard } from './ProjectCard';
import { HeroOverview } from './HeroOverview';
import { StatType } from '../types/models';
import { imgArray } from '../lib/commonData';

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

const NoProjectsToDisplay = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:calc(100vh - 140px);
`;

export namespace IProjects {
	export interface StateProps {
		projectList?: any;
	}

	export interface Props extends StateProps {}
}

export const Projects: React.SFC<IProjects.Props> = (props) => {

	const renderProjects = () => {
		if (props.projectList === null) {
			return (
				<div className="row">
					<NoProjectsToDisplay className="col-md-12"><p>Projects are loading...</p></NoProjectsToDisplay>;
				</div>
			);
		} else if (props.projectList.length > 0) {
			console.log(props.projectList);
			return (
					<div className="row row-eq-height">
						{props.projectList.map((project, index) => {
							return <ProjectCard project={project.data} did={project.projectDid} bg={imgArray()[index]} key={index} />;
						})}
					</div>
			);
		} else {
			return (
				<div className="row">
					<NoProjectsToDisplay className="col-md-12"><p>No projects were found</p></NoProjectsToDisplay>;
				</div>
			);
		}
	};

	return (
		<div>
			<HeroOverview 
				statistics={[
					{title: 'CLAIM AMOUNT',
					type: StatType.fraction,
					descriptor: [{class: 'text', value: 'test'}, {class: 'number', value: 2}, {class: 'text', value: 'test2'}],
					amount: [20, 1110]},
					{title: 'SERVICE PROVIDER',
					type: StatType.decimal,
					descriptor: [{class: 'number', value: 24}, {class: 'text', value: 'test'}, {class: 'text', value: ' test2'}],
					amount: 12},
					{title: 'IXO REMAINING',
					type: StatType.ixoAmount,
					descriptor: [{class: 'text', value: 'This is a test text for a single statistic type'}],
					amount: 40.67},
					{title: 'SERVICE PROVIDER',
					type: StatType.decimal,
					descriptor: [{class: 'text', value: 'claims available: '}, {class: 'number', value: 2}],
					amount: 142}
				]} 
			/>
			<ProjectsContainer className="container-fluid">
				<div className="container">
					{renderProjects()}
				</div>
			</ProjectsContainer>
		</div>
	);
};