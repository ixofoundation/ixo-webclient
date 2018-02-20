import * as React from 'react';
import { connect } from 'react-redux';
import { IPublicSiteStoreState } from '../../../redux/public_site_reducer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { renderIf } from '../../../utils/react_utils';
import { FlagIcon, fixCountryCode } from '../../FlagIcon';

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

    renderProjects = () => {
        return <div>
            {renderIf((typeof this.props.projectList !== 'undefined') && this.props.projectList.length > 0, {
                ifTrue: () => (
                    <ProjectsContainer className="container-fluid">
                        <div className="row">
                            {this.props.projectList.map((project, index) => {
                                return (
                                    <ProjectCard className="col-12 col-xl-3 col-lg-3 col-md-4 col-sm-6 " key={index}>
                                        <ProjectLink to={{
                                            pathname: `/project/${project._id}`,
                                            state: project
                                        }}
                                            project={project}>
                                            <ProjectCardInner>

                                                <TitleContainer><FlagIcon code={fixCountryCode(project.country)} size='lg' /> {project.name}</TitleContainer>

                                                <OwnerBox>
                                                    <h4>Owner information:</h4>
                                                    <EllipseText>Name: {project.owner.name}</EllipseText>
                                                    <EllipseText>Email: {project.owner.email}</EllipseText>
                                                </OwnerBox>
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
`;

const ProjectCardInner = styled.div`
    box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.2);
    border-radius: 5px;
    padding:10px;
    color:white;
    margin: 10px;
    transition:all 0.3s ease;

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

    &:nth-child(4n+0) ${ProjectCardInner}{
        background:${props => props.theme.randomColor(props.theme.projectColors)};
    }

    &:nth-child(4n+1) ${ProjectCardInner}{
        background:${props => props.theme.randomColor(props.theme.projectColors)};
    }

    &:nth-child(4n+2) ${ProjectCardInner}{
        background:${props => props.theme.randomColor(props.theme.projectColors)};
    }

    &:nth-child(4n+3) ${ProjectCardInner}{
        background:${props => props.theme.randomColor(props.theme.projectColors)};
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

const OwnerBox = styled.div`
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