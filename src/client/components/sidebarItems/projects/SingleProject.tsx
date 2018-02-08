import * as React              from 'react';
import {connect}               from "react-redux";
import {IPublicSiteStoreState} from "../../../redux/public_site_reducer";
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {ModalWrapper}          from '../../ModalWrapper';
import DynamicForm from '../../formTemplates/DynamicForm';

const projectBG = require('../../../assets/images/project-bg.jpg');

export namespace SingleProject {

    export interface Props {
        location?: any,
        ixo?: any,
        web3Instance?: any
    }
    export interface State {
        projectMeta: any,
        isModalOpen: boolean,
        formSchema: any,
        submitStatus: string
    }

    export interface IProps extends Props {
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class SingleProject extends React.Component<SingleProject.IProps, SingleProject.State> {

    constructor(props?: SingleProject.IProps, context?: any) {
        super(props, context);

        this.state = {
            isModalOpen  : false,
            projectMeta : this.props.location.state,
            formSchema: {},
            submitStatus: null
        }

    }

    handleSubmit = (formData:any) => {
        //Handle submission for register as new agent
        formData['projectTx'] = this.state.projectMeta.tx;

        this.props.ixo.auth.sign(this.props.web3Instance,formData).then((response: any)=>{
            this.props.ixo.agent.createAgent(formData,this.props.web3Instance.eth.accounts[0],response,new Date(),'default').then((response: any)=>{
                if(response.result){
                        this.setState({submitStatus : 'Your project has been submitted successfully'});
                        // formData : {}
                } else if(response.error){
                        this.setState({submitStatus : 'Error submitting the project, please ensure all fields have been entered correctly'});
                        // formData : {}
                }
                
            }).catch((error) => {
                this.setState({submitStatus : 'Error submitting the project'});
            })
        }).catch((error) => {
            this.setState({submitStatus : 'Error submitting the project'});
        })
    }

    handleRegisterAgent = () =>{
        this.handleToggleModal(true);
        this.props.ixo.agent.getAgentTemplate('default').then((response: any) => {

            if (response.result.form.fields !== this.state.formSchema) {
                this.setState({formSchema: response.result.form.fields});
            }

        }).catch((result: Error) => {
            console.log(result);
        });
    }

    handleToggleModal(modalStatus){
        this.setState({isModalOpen: modalStatus});
    };

    handleRenderAgentForm = () => {
        if(this.state.formSchema.length > 0){
            let agentSchema = [...this.state.formSchema];
            agentSchema = agentSchema.filter((value) => value.name !== "template.name" && value.name !== "projectTx")
            
             return <DynamicForm formSchema={agentSchema} handleSubmit={this.handleSubmit}/> 
        }
        else {
            return <p>Loading Form...</p>;
        }
    }

    handleListAgents(){
        this.props.ixo.agent.listAgentsForProject(this.props.web3Instance.eth.accounts[0], this.state.projectMeta.tx).then( agentList =>{
            console.log(agentList);
        }).catch( error =>{
            console.log(error);
        })
    }
    
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
                    <div className="col-md-12">
                        <RegisterAgent onClick={this.handleRegisterAgent}>Register as Agent</RegisterAgent>
                        <h3>List of agents for project:</h3>
                    </div>
                </ProjectContainer>
                <ModalWrapper 
                    isModalOpen={this.state.isModalOpen}
                    handleToggleModal={(modalStatus) => this.handleToggleModal(modalStatus)}>
                    {this.handleRenderAgentForm()}
                    {this.handleListAgents()}
                    <SubmitStatus>{this.state.submitStatus}</SubmitStatus>
                </ModalWrapper>
            </div>
        );
    }
}

function mapStateToProps(state: IPublicSiteStoreState) {
    return {
        ixo: state.ixoStore.ixo,
        web3Instance: state.web3Store.web3Instance
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

const RegisterAgent = styled.div`

    cursor:pointer;
    color:green;
`;

const SubmitStatus = styled.p`
    color:#0f8dab;
    margin-top:10px;
    text-align:center;
`;  