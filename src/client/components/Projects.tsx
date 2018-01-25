import * as React              from 'react';
import {connect}               from 'react-redux';
import {IPublicSiteStoreState} from '../redux/public_site_reducer';
import {Link}                  from 'react-router-dom';
import styled                  from 'styled-components';

export namespace Projects {

    export interface Props {
        projectList: any,
        web3Instance?: any,
        isWeb3AccountLoaded?: boolean
    }

    export interface State {
    }

    export interface IProps extends Props {
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Projects extends React.Component<Projects.IProps, Projects.State> {

    constructor(props?: Projects.IProps, context?: any) {
        super(props, context);
        this.state = {
            isWeb3AccountLoaded: false
        };
    }

    render() {
        console.log('IN Projects');
        const projects = this.props.projectList;
        return (
            <ProjectsContainer className="container">
                <div className="row">
                    {projects.map((project, index) => {
                        return (
                            <ProjectCard className="col-md-4" key={index}>
                                <ProjectCardInner>
                                    <h3>{project.name}</h3>
                                    <p>Country: {project.country}</p>

                                    <OwnerBox>
                                        <h4>Owner information:</h4>
                                        <p>Name: {project.owner.name}</p>
                                        <p>Email: {project.owner.email}</p>
                                    </OwnerBox>
                                    <ViewProject to={{
                                        pathname: `/project/${project._id}`,
                                        state   : project
                                    }}
                                                 project={project}>View Project</ViewProject>

                                </ProjectCardInner>
                            </ProjectCard>);
                    })}
                </div>
            </ProjectsContainer>
        );
    }
}

function mapStateToProps(state: IPublicSiteStoreState) {
    return {
        web3Instance: state.web3Store.web3Instance
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

const ProjectsContainer = styled.div`
    height:calc(100vh - 140px);
    overflow-y: scroll;
    padding-top:30px;
`;

const ProjectCardInner = styled.div`
    box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.2);
    border-radius: 5px;
    padding:10px;
    color:white;
    margin: 5px;
`;

const ProjectCard = styled.div`

    &&{
        padding:0;
    }

    &:nth-child(4n+0) ${ProjectCardInner}{
        background:${props => props.theme.bgLightest};
    }

    &:nth-child(4n+1) ${ProjectCardInner}{
        background:${props => props.theme.bgLighter};
    }

    &:nth-child(4n+2) ${ProjectCardInner}{
        background:${props => props.theme.bgMain};
    }

    &:nth-child(4n+3) ${ProjectCardInner}{
        background:${props => props.theme.bgDarker};
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

const ViewProject = styled(Link)`
    display: block;
    text-align: center;
    border-radius: 5px;
    background: #0f8dab;
    margin:10px 0 0;
    padding:5px 0;
    color:white;
    transition:background 0.3s ease;
    

    &:hover {
        background:#c3f4ff;
        text-decoration:none;
        color:#0f8dab;
    }
`;