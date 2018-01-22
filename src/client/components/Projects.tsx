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
                        return <div className="col-md-4" key={index}>
                            <h3>{project.name}</h3>
                            <p>Country: {project.country}</p>
                            <h4><u>Owner information: </u></h4>
                            <p>Name: {project.owner.name}</p>
                            <p>Email: {project.owner.email}</p>
                            <Link to={{
                                pathname:`/project/${project._id}`,
                                state: project
                            }}
                            
                            project={project}>View Project</Link>
                        </div>
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
`;