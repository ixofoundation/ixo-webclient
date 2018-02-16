import * as React from 'react';
import { connect } from "react-redux";
import { IPublicSiteStoreState } from "../../../redux/public_site_reducer";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ModalWrapper } from '../../ModalWrapper';
import DynamicForm from '../../formTemplates/DynamicForm';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { toast } from 'react-toastify';
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
        agentList: any,
        selectedStatus: string,
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
            agentList: [],
            selectedStatus: 'Approved'
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
        var toastId = toast('Creating agent...', { autoClose: false });
        var data = merge(formData, { projectTx: this.state.projectMeta.tx })
        this.props.ixo.agent.createAgent(formData, 'default').then((response: any) => {
            if (response.result) {
                this.handleToggleModal(false);
                toast.update(toastId, {
                    render: 'Agent Created',
                    type: 'success',
                    autoClose: 3000
                });
                this.getAgentList();
            } else if (response.error) {
                this.handleToggleModal(false);
                toast.update(toastId, {
                    render: response.error.message,
                    type: 'error',
                    autoClose: 3000
                });
            }
        }).catch((error) => {
            this.handleToggleModal(false);
            toast.update(toastId, {
                render: 'Error creating agent',
                type: 'error',
                autoClose: 3000
            });;
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
            <ClearButton onClick={onClick}>Clear</ClearButton>
        );
    }

    onUpdateStatus(cell, row, rowIndex) {
        var agentData = {
            agentTx: row.tx,
            status: this.state.selectedStatus
        }
        var toastId = toast('Updating agent status...', { autoClose: false });

        this.props.ixo.agent.updateAgentStatus(agentData).then((response: any) => {
            if (response.error) {
                toast.update(toastId, {
                    render: response.error.message,
                    type: 'error',
                    autoClose: 3000
                })
            }
            if (response.result.latestStatus === this.state.selectedStatus) {
                toast.update(toastId, {
                    render: 'Agent status updated',
                    type: 'success',
                    autoClose: 3000
                })
                this.getAgentList();
            }
        });
    }

    onSetStatus = (selectedStatus) => {
        this.setState({ selectedStatus: selectedStatus.target.value });
    }

    cellStatusButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <select onChange={this.onSetStatus}>
                    <option value="Approved" label='Approve' />
                    <option value="NotApproved" label='Decline' />
                    <option value="Revoked" label='Revoke' />
                </select>
                <br />
                <button
                    className='btn btn-success'
                    type="button"
                    onClick={() =>
                        this.onUpdateStatus(cell, row, rowIndex)}>
                    Update
                </button>
            </div >
        )
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
                <TableHeaderColumn dataField='button' dataFormat={this.cellStatusButton.bind(this)}>Set Status</TableHeaderColumn>
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
                        <AgentHeader>List of agents for project:</AgentHeader>
                        <ButtonContainer>
                            <RegisterAgent onClick={this.handleRegisterAgent}><span>Register as Agent</span></RegisterAgent>
                        </ButtonContainer>
                        {this.renderAgentListTable()}
                    </div>
                </ProjectContainer>

                <ModalWrapper
                    isModalOpen={this.state.isModalOpen}
                    handleToggleModal={(modalStatus) => this.handleToggleModal(modalStatus)}>

                    {this.handleRenderAgentForm()}
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

const AgentHeader = styled.div`
    display: flex;
    justify-content: center;
    font-size: 28px;
    margin-top: 15px;
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

const ClearButton = styled.button`
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    height: 35px;
    background-color: ${props => props.theme.bgLightest};
    border: none;
    color: #FFFFFF;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content:flex-end;
`;

const RegisterAgent = styled.button`
    border-radius: 4px;
    background-color: ${props => props.theme.bgLightest};
    border: none;
    color: #FFFFFF;
    font-size: 1em;
    transition: all 0.5s;
    cursor: pointer;
    margin-bottom: 5px;
    display: flex;
    align-items: left;
    width: 180px;
    justify-content: space-around;
    height: 35px;
  
  & span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
  }
  
  & span:after {
    content: '\00bb';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
  }
  
  &:hover span {
    padding-right: 25px;
  }
  
  &:hover span:after {
    opacity: 1;
    right: 0;
  }
`;

const SubmitStatus = styled.p`
    color:#0f8dab;
    margin-top:10px;
    text-align:center;
`;  