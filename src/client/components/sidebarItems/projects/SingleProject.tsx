import * as React from 'react';
import { connect } from "react-redux";
import { IPublicSiteStoreState } from "../../../redux/public_site_reducer";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ModalWrapper } from '../../ModalWrapper';
import DynamicForm from '../../formTemplates/DynamicForm';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
var merge = require('merge');

const projectBG = require('../../../assets/images/project-bg.jpg');

export namespace SingleProject {

    export interface Props {
        location?: any,
        ixo?: any,
    }
    export interface State {
        projectMeta: any,
        isModalOpen: boolean,
        formSchema: any,
        submitStatus: string,
        agentList: any
    }

    export interface IProps extends Props {
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class SingleProject extends React.Component<SingleProject.IProps, SingleProject.State> {
    constructor(props?: SingleProject.IProps, context?: any) {
        super(props, context);
        this.state = {
            isModalOpen: false,
            projectMeta: this.props.location.state,
            formSchema: {},
            submitStatus: null,
            agentList: []
        }
    }

    componentDidMount() {
        this.props.ixo.agent.getAgentTemplate('default').then((response: any) => {
            if (response.result.form.fields !== this.state.formSchema) {
                this.setState({ formSchema: response.result.form.fields });
            }

        }).catch((error: Error) => {
            console.log(error);
        });

        this.getAgentList();
    }

    getAgentList() {
        this.props.ixo.agent.listAgentsForProject(this.props.ixo.credentialProvider.getDid(), this.state.projectMeta.tx).then(agentList => {
            this.setState({ agentList: agentList.result })
        }).catch(error => {
            console.log(error);
        })
    }

    handleSubmit = (formData: any) => {
        var data = merge(formData, { projectTx: this.state.projectMeta.tx })
        this.props.ixo.agent.createAgent(formData, 'default').then((response: any) => {
            if (response.result) {
                this.setState({ submitStatus: 'Your project has been submitted successfully' });
                this.getAgentList();
            } else if (response.error) {
                this.setState({ submitStatus: response.error.message });
            }
        }).catch((error) => {
            this.setState({ submitStatus: 'Error submitting the project' });
        })
    }
    handleRegisterAgent = () => {
        this.handleToggleModal(true);
    }

    handleToggleModal(modalStatus) {
        this.setState({ isModalOpen: modalStatus });
    };

    handleRenderAgentForm = () => {
        if (this.state.formSchema.length > 0) {
            let agentSchema = [...this.state.formSchema];
            agentSchema = agentSchema.filter((value) => value.name !== "template.name" && value.name !== "projectTx")
            return <DynamicForm formSchema={agentSchema} handleSubmit={this.handleSubmit} />
        } else {
            return <p>Loading Form...</p>
        }
    }

    createCustomClearButton = (onClick) => {
        return (
            <button className='btn btn-success' onClick={onClick}>Clear</button>
        );
    }

    renderAgentListTable() {
        const options = {
            clearSearch: true,
            clearSearchBtn: this.createCustomClearButton
        };
        return (
            <BootstrapTable data={this.state.agentList} options={options} version='4' search>
                <TableHeaderColumn dataField='did' isKey={true}>DID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='role'>Role</TableHeaderColumn>
                <TableHeaderColumn dataField='created'>Created</TableHeaderColumn>
                <TableHeaderColumn dataField='latestStatus'>Status</TableHeaderColumn>
            </BootstrapTable>);
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
                        <br />
                        {this.renderAgentListTable()}
                    </div>
                </ProjectContainer>

                <ModalWrapper
                    isModalOpen={this.state.isModalOpen}
                    handleToggleModal={(modalStatus) => this.handleToggleModal(modalStatus)}>

                    {this.handleRenderAgentForm()}
                    <SubmitStatus>{this.state.submitStatus}</SubmitStatus>
                </ModalWrapper>
            </div>
        );
    }
}

function mapStateToProps(state: IPublicSiteStoreState) {
    return {
        ixo: state.ixoStore.ixo,
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