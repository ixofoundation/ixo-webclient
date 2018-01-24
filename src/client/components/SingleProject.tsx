import * as React              from 'react';
import {connect}               from "react-redux";
import {IPublicSiteStoreState} from "../redux/public_site_reducer";
import {Link} from 'react-router-dom';
import styled from 'styled-components';
const projectBG = require('../assets/images/project-bg.jpg');

export namespace SingleProject {

    export interface Props {
        location?: any,
        ixo?: any
    }
    export interface State {
        projectMeta: any
    }

    export interface IProps extends Props {
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class SingleProject extends React.Component<SingleProject.IProps, SingleProject.State> {

    constructor(props?: SingleProject.IProps, context?: any) {
        super(props, context);

        this.state = {
            projectMeta : this.props.location.state
        }

    }

    // componentWillMount(){

    //     const URLArray = window.location.pathname.split("/");
    //     const currProjectID =URLArray[URLArray.length-1];

    //     if(this.state.projectMeta.length === 0){
            
    //         this.props.ixo.project.listProjects().then((response:any)=>{
    //             const projectList = response.result;
                
    //             const currProject = projectList.filter((project)=>{
    //                 currProject === project._id;
    //             })
    //             console.log("Project name is: "+currProject.name);
    //         }).catch((error)=>{

    //         })
    //     }
    // }
    
    
    render() {        
        return (
            <div className="container">
                <ProjectContainer className="row">
                    <div className="col-md-12">
                        <Link to="/">Back to Home</Link>
                    </div>
                    <div className="col-md-4">
                        <h2>{this.state.projectMeta.name}</h2>
                    </div>
                    <div className="col-md-8">
                        <p>Country: {this.state.projectMeta.country}</p>
                        <p>Date created: {this.state.projectMeta.created}</p>
                        <p>Project ID: {this.state.projectMeta._id}</p>
                        <OwnerBox>
                            <h3>Owner information:</h3>
                            <p>Name: {this.state.projectMeta.owner.name}</p>
                            <p>Email: {this.state.projectMeta.owner.email}</p>
                        </OwnerBox>
                    </div>
                </ProjectContainer>
            </div>
        );
    }
}

function mapStateToProps(state: IPublicSiteStoreState) {
    return {
        ixo: state.ixoStore.ixo
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

const ProjectContainer = styled.div`
    margin-top:30px;
    box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.2);

    & .col-md-12 {
        padding-left:0;
    }

    & .col-md-12 a {
        background: ${props => props.theme.bgLightest};
        padding:10px;
        color:white;
        margin-bottom:20px;
        display:inline-block;
    }

    & .col-md-4 {
        background: url(${projectBG});
        display:flex;
        align-items:center;
        justify-content:center;
        position:relative;
    }

    & .col-md-4 h2 {
        color:white;
        position:relative;
        z-index:1;
    }

    & .col-md-4:after {
        content:"";
        position:absolute;
        width:100%;
        height:100%;
        background: rgba(0,0,0,0.3);
    }

    & .col-md-8 {
        padding-top:20px;
    }
`;

const OwnerBox = styled.div`

    background:${props => props.theme.bgLightest};
    padding:10px;
    color:white;
    border-radius:10px;
    margin-bottom:10px;

    & h3 {
        font-size:1em;
        font-weight:bold;
    }

    & p {
        margin-bottom:0;
    }
`;