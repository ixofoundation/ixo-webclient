import * as React              from 'react';
import {connect}               from "react-redux";
import {IPublicSiteStoreState} from "../redux/public_site_reducer";
import {Link}                  from 'react-router-dom';
import styled                  from 'styled-components';

export namespace Projects {

    export interface Props {
        projectList: any
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
        };
    }

    componentDidUpdate(prevProps: Projects.IProps){
        const projects = this.props.projectList;
    }

    render() {
        const projects = this.props.projectList;
        return (
            <ProjectsContainer className=" container">
                <div className="row">
                    { projects.map((project,index)=>{
                        return (
                        <ProjectCard className="col-md-4" key={index}>
                            <h3>{project.name}</h3>
                            <p>Country: {project.country}</p>

                            <OwnerBox>
                                <h4>Owner information:</h4>
                                <p>Name: {project.owner.name}</p>
                                <p>Email: {project.owner.email}</p>
                            </OwnerBox>

                            <ViewProject to={{
                                pathname:`/project/${project._id}`,
                                state: project
                            }}
                            project={project}>View Project</ViewProject>
                        </ProjectCard>);
                    }) }
                </div>
            </ProjectsContainer>
        );
    }
}

function mapStateToProps(state: IPublicSiteStoreState) {
    return {
        
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

const ProjectCard = styled.div`
    background:${props => props.theme.darkBlue};
    padding:10px;
    color:white;

    &:nth-child(4n+0) {
        background:${props => props.theme.bgLightest};
        & h3, h4, p {
            color:${props => props.theme.fontMain};
        }
    }

    &:nth-child(4n+1) {
        background:${props => props.theme.bgLighter};
        & h3, h4, p {
            color:${props => props.theme.fontMain};
        }
    }

    &:nth-child(4n+2) {
        background:${props => props.theme.bgMain};
        & h3, h4, p {
            color:${props => props.theme.fontMain};
        }
    }

    &:nth-child(4n+3) {
        background:${props => props.theme.bgDarker};
        & h3, h4, p {
            color:${props => props.theme.fontMain};
        }
    }

    & h3 {
        font-weight: 400;
    }

    & p {
        font-weight:100;
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
    margin:10px 0;
    padding:5px 0;
    color:white;
    transition:background 0.3s ease;
    

    &:hover {
        background:#c3f4ff;
        text-decoration:none;
        color:#0f8dab;
    }
`;