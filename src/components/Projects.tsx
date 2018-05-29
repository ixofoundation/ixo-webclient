import * as React from 'react';
import styled from 'styled-components';
import { ProjectCard } from './ProjectCard';

const imgArray = []; 
for (let i = 1; i < 10; i++) {
	imgArray[i] = require(`../assets/images/image${i}.jpg`);
}

const ProjectsContainer = styled.div`
    overflow-y: scroll;
    padding: 76px 0 50px;
	background: ${props => props.theme.bg.lightGrey};
    & > .row {
        margin-top:30px;
        justify-content:center;
    }
`;

const NoProjectsToDisplay = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:calc(100vh - 140px);
`;

export namespace Projects {
	export interface StateProps {
		projectList?: any;
	}
}

export const Projects: React.SFC<Projects.StateProps> = (props) => {

	const renderProjects = () => {
		if (props.projectList === null) {
			return (
				<div className="row">
					<NoProjectsToDisplay className="col-md-12"><p>Projects are loading...</p></NoProjectsToDisplay>;
				</div>
			);
		} else if (props.projectList.length > 0) {
			return (
					<div className="row">
						{props.projectList.map((project, index) => {
							return <ProjectCard project={project} bg={imgArray[index + 1]} key={index} />;
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
		<ProjectsContainer className="container-fluid">
			<div className="container">
				{renderProjects()}
			</div>
		</ProjectsContainer>
	);
};