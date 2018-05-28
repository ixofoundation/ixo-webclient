import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatJSONDateTime, excerptText } from '../utils/formatters';
import { SDGArray } from '../lib/commonData';

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

const TitleContainer = styled.h3`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    font-weight: 400;
    font-size: 21px;
    box-sizing: border-box;
    margin-top: 0;
	margin-bottom: 8px;
	color: ${props => props.theme.fontDarkGrey};
    line-height: 1.2;
`;

const EllipseText = styled.p`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: '100%';
    font-weight:100;
`;

const ProgressBox = styled.div`

`;

const CardTop = styled.div`
	border-radius:2px 2px 0 0;
	padding:0 10px;
	height: 170px;
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	justify-content: flex-end;
	box-shadow: 0 8px 16px -2px rgba(0,0,0,0.03);
	background: linear-gradient(180deg, rgba(0,0,0,0.63) 0%, rgba(0,0,0,0) 100%), ${props => props.theme.bg.lightBlue};

	i:before {
		color: white;
		font-size: 20px;
		margin: 10px 5px;
		display: inline-flex;
	}
`;

const CardBottom = styled.div`
	border-radius: 0 0 2px 2px;
	padding: 20px 14px;
	border: 1px solid #E2E2E2;
	border-top: 0;
	
`;

const ProjectCard = styled.div`

	margin-bottom: 34px;

    & p {
        font-weight:100;
		color: ${props => props.theme.fontDarkGrey};
    }
`;

const AboutBox = styled.div`
    padding:0px;
    border-radius:10px;
    margin-bottom:10px;
    width: '100%';
    color: #0f8dab;

    & div {

        text-overflow: ellipsis;
        margin-bottom:0;
    }
`;

const InfoBox = styled.div`
    & h4 {
        font-size:1em;
    }

    & p {
        margin-bottom:0;
    }
`;

const ProjectLink = styled(Link) `
    transition:background 0.3s ease;

    &:hover {
        text-decoration:none;
    }
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
							return (
								<ProjectCard className="col-12 col-xl-4 col-lg-3 col-md-4 col-sm-6 " key={index}>
									<ProjectLink 
										to={{
										pathname: `/${project._id}/home`,
										state: project
									}}
									>
										<CardTop>
											{SDGArray.map((SDG, SDGi) => {
												return (
												<i key={SDGi} className={`icon-${SDGArray[SDGi].ico}`} />
												);
											})}
										</CardTop>
										<CardBottom>
											<div>
												<TitleContainer>{project.country} {project.name}</TitleContainer>
												<EllipseText>By {project.owner.name}</EllipseText>
												<AboutBox>
													<div>{excerptText(project.about)}</div>
												</AboutBox>
											</div>
											<ProgressBox>
												{}
											</ProgressBox>
											<InfoBox>
												<EllipseText>Created: {formatJSONDateTime(project.created)}</EllipseText>
											</InfoBox>
										</CardBottom>
									</ProjectLink>
								</ProjectCard>);
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