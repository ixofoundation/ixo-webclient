import * as React from 'react';
import { connect } from 'react-redux';
import { IPublicSiteStoreState } from '../../../redux/public_site_reducer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { renderIf } from '../../../utils/react_utils';
import {FlagIcon, fixCountryCode} from '../../FlagIcon';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {formatJSONDateTime} from '../../../utils/formatters';

export namespace Projects {

    export interface Props {
        projectList: any,
    }

    export interface State {
    }

    export interface IProps extends Props {
    }
}

export class Projects extends React.Component<Projects.IProps, Projects.State> {

    percentageComplete = (project: any) => { 
//        debugger;
        return Math.round((project.approvedClaimCount / project.numberOfSuccessfulClaims) * 100);
    }

    renderProjects = () => {
        return <div>
            {renderIf(this.props.projectList.length > 0, {
                ifTrue: () => (
                    <ProjectsContainer className="container-fluid">
                        <div className="row">
                            {this.props.projectList.map((project, index) => {
                                project.percentageComplete = 50;
                                return (
                                    <ProjectCard className="col-12 col-xl-3 col-lg-3 col-md-4 col-sm-6 " key={index}>
                                        <ProjectLink to={{
                                                    pathname: `/project/${project._id}`,
                                                    state: project
                                                }}
                                                project={project}>
                                            <ProjectCardInner>
                                                
                                                <TitleContainer><FlagIcon code={fixCountryCode(project.country)} size='lg' /> {project.name}</TitleContainer>
                                                <AboutBox>
                                                    <div>{project.about}</div>
                                                </AboutBox>
                                                <ProgressBox>
                                                    <CircularProgressbar className='progressbar' percentage={this.percentageComplete(project)} textForPercentage={(percent) => percent < 100 ? percent + '%' : 'complete'} />
                                                </ProgressBox>
                                                <InfoBox>
                                                    <EllipseText>Created: {formatJSONDateTime(project.created)}</EllipseText>
                                                    <EllipseText>Owner: {project.owner.name}</EllipseText>
                                                </InfoBox>
                                            </ProjectCardInner>
                                        </ProjectLink>
                                    </ProjectCard>);
                            })}
                        </div>
                    </ProjectsContainer>
                ),
                ifFalse: () => (
                    <div>
                        There are currently no projects...
                    </div>
                )
            })}
        </div>
    }

    render() {
        return (
            <div>
                {this.renderProjects()}
            </div>
        );
    }
}


const ProjectsContainer = styled.div`
    overflow-y: scroll;
    padding-top:70px;
    padding-bottom: 50px;
`;

const TitleContainer = styled.div`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: '100%';
    color: #0f8dab;
    font-weight: 400;
    font-size: 1.3rem;
    box-sizing: border-box;
    margin-top: 0;
    margin-bottom: .5rem;
    line-height: 1.2;
`;

const EllipseText = styled.p`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: '100%';
    color: #0f8dab;
    font-weight:100;
`;

const ProjectCardInner = styled.div`
    box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.2);
    border-radius: 5px;
    padding:10px;
    color:white;
    margin: 10px;
    transition:all 0.3s ease;
    background:${props => props.theme.randomColor(props.theme.projectColors)};

    &&:hover {
        box-shadow: 0px 3px 5px 0px #383d41b8;
        transform: scale(1.05);
        position:relative;
        z-index:50;
    }
`;

const ProjectCard = styled.div`
    &&{
        padding:0;
    }

    & h3 {
        font-weight: 400;
        color:#0f8dab;
    }

    & p {
        font-weight:100;
        color:${props => props.theme.fontMain};
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

const ProgressBox = styled.div`
    padding:20px;
    margin: auto;
    width: 75%;
    background: ${props => props.theme.bgDarker};

    .progressbar .CircularProgressbar-path { stroke: ${props => props.theme.bgDarkest}; }
    .progressbar .CircularProgressbar-trail {stroke: ${props => props.theme.bgLighter}; }
    .progressbar .CircularProgressbar-text { text-anchor: "middle" alignment-baseline: "middle" }
`;

const ProgressText = styled.div`
    height: 50px;
    width: 100px;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    position: absolute;
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