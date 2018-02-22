import * as React from 'react';
import { connect } from "react-redux";
import { IPublicSiteStoreState } from "../../../redux/public_site_reducer";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ModalWrapper } from '../../ModalWrapper';
import DynamicForm from '../../formTemplates/DynamicForm';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { toast } from 'react-toastify';
import { FlagIcon, fixCountryCode } from '../../FlagIcon';
import * as iso3311a2 from 'iso-3166-1-alpha-2';
import { formatJSONDateTime } from '../../../utils/formatters';
import { renderIf, renderSwitch } from '../../../utils/react_utils';

var merge = require('merge');
var JSONPretty = require('react-json-pretty');
const projectBG = require('../../../assets/images/project-bg.jpg');

export namespace SingleProject {

    export interface Props {
        location?: any,
        ixo?: any,
    }
    export interface State {
        projectMeta: any,
        isModalOpen: boolean,
        agentFormSchema: any,
        claimFormSchema: any,
        evaluationFormSchema: any,
        agentList: any,
        claimList: any,
        selectedStatus: string,
        modalType: string,
        currentClaimJson: any
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
            agentFormSchema: {},
            claimFormSchema: {},
            evaluationFormSchema: {},
            agentList: [],
            claimList: [],
            currentClaimJson: null,
            selectedStatus: 'Approved',
            modalType: null
        }
    }

    componentDidMount() {
        this.props.ixo.agent.getAgentTemplate('default').then((response: any) => {
            if (response.result.form.fields !== this.state.agentFormSchema) {
                this.setState({ agentFormSchema: response.result.form.fields });
            }
        }).catch((error: Error) => {
            console.log(error);
        });

        this.props.ixo.claim.getClaimTemplate('default').then((response: any) => {
            if (response.result.form.fields !== this.state.claimFormSchema) {
                this.setState({ claimFormSchema: response.result.form.fields });
            }
        }).catch((error: Error) => {
            console.log(error);
        });

        this.props.ixo.claim.getEvaluationTemplate('default').then((response: any) => {
            if (response.result.form.fields !== this.state.evaluationFormSchema) {
                this.setState({ evaluationFormSchema: response.result.form.fields });
            }
        }).catch((error: Error) => {
            console.log(error);
        });


        this.getClaimList();
        this.getAgentList();
    }

    getAgentList() {
        this.props.ixo.agent.listAgentsForProject(this.props.ixo.credentialProvider.getDid(), this.state.projectMeta.tx).then(agentList => {
            this.setState({ agentList: agentList.result })
        }).catch(error => {
            console.log(error);
        })
    }

    getClaimList() {
        this.props.ixo.claim.listClaimsByProjectId(this.state.projectMeta.tx).then(claimList => {
            this.setState({ claimList: claimList.result })
        }).catch(error => {
            console.log(error);
        })
    }

    handleClaimEvaluation = (formData: any) => {
        var toastId = toast('Evaluating claim...', { autoClose: false });
        var data = { claimTx: formData.claimTx, result: formData.result };
        this.props.ixo.claim.evaluateClaim(data, 'default').then((response: any) => {
            if (response.result) {
                this.handleToggleModal(false);
                toast.update(toastId, {
                    render: 'Claim evaluated',
                    type: 'success',
                    autoClose: 3000
                });
                this.getClaimList();
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
                render: 'Error submitting claim',
                type: 'error',
                autoClose: 3000
            });;
        })
    }

    handleClaimSubmit = (formData: any) => {
        var toastId = toast('Submitting claim...', { autoClose: false });
        var data = merge(formData, { projectTx: this.state.projectMeta.tx })
        this.props.ixo.claim.createClaim(formData, 'default').then((response: any) => {
            if (response.result) {
                this.handleToggleModal(false);
                toast.update(toastId, {
                    render: 'Claim submitted',
                    type: 'success',
                    autoClose: 3000
                });
                this.getClaimList();
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
                render: 'Error submitting claim',
                type: 'error',
                autoClose: 3000
            });;
        })
    }

    handleAgentSubmit = (formData: any) => {
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
        this.setState({ modalType: 'agent' });
        this.handleToggleModal(true);
    }

    handleCaptureClaim = () => {
        this.setState({ modalType: 'claim' });
        this.handleToggleModal(true);
    }

    handleEvaluateClaim = (claimData: string) => {
        this.setState({ modalType: 'evaluate' });
        this.handleToggleModal(true);
    }

    handleToggleModal(modalStatus) {
        this.setState({ isModalOpen: modalStatus });
    };

    handleRenderEvaluateForm = () => {
        if (this.state.agentFormSchema.length > 0) {
            let agentSchema = [...this.state.evaluationFormSchema];
            agentSchema = agentSchema.filter((value) => value.name !== "template.name" && value.name !== "projectTx")
            return <DynamicForm formSchema={agentSchema} handleSubmit={this.handleClaimEvaluation} />
        } else {
            return <p>Loading Form...</p>
        }
    }

    handleRenderAgentForm = () => {
        if (this.state.agentFormSchema.length > 0) {
            let agentSchema = [...this.state.agentFormSchema];
            agentSchema = agentSchema.filter((value) => value.name !== "template.name" && value.name !== "projectTx")
            return <DynamicForm formSchema={agentSchema} handleSubmit={this.handleAgentSubmit} />
        } else {
            return <p>Loading Form...</p>
        }
    }

    handleRenderClaimForm = () => {
        if (this.state.claimFormSchema.length > 0) {
            let agentSchema = [...this.state.claimFormSchema];
            agentSchema = agentSchema.filter((value) => value.name !== "template.name" && value.name !== "projectTx")
            return <DynamicForm formSchema={agentSchema} handleSubmit={this.handleClaimSubmit} />
        } else {
            return <p>Loading Form...</p>
        }
    }

    handleRenderClaimJson = () => {
        return <div><JSONPretty id="json-pretty" json={this.state.currentClaimJson}></JSONPretty></div>;
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

    getCountryName(countryCode: string): String {
        return iso3311a2.getCountry(fixCountryCode(countryCode).toUpperCase())
    }

    cellStatusButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <SelectStatus onChange={this.onSetStatus}>
                    <option value="Approved" label='Approve' />
                    <option value="NotApproved" label='Decline' />
                    <option value="Revoked" label='Revoke' />
                </SelectStatus>
                <CellButton
                    onClick={() =>
                        this.onUpdateStatus(cell, row, rowIndex)}>
                    Update
                </CellButton>
            </div >
        )
    }

    cellEvaluateButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <CellButton
                    onClick={() =>
                        this.handleEvaluateClaim(row)}>
                    Evaluate
                </CellButton>
            </div>
        );
    }

    claimJson(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <button
                    className='btn-info'
                    onClick={() =>
                        this.onViewClaimClicked(cell, row, rowIndex)}>
                    View Claim Data
                </button>
            </div>
        )
    }

    onViewClaimClicked(cell, row, rowIndex) {
        this.handleToggleModal(true);
        this.setState({ currentClaimJson: row, modalType: 'json' })
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

    renderClaimListTable() {
        const options = {
            clearSearch: true,
            clearSearchBtn: this.createCustomClearButton
        };
        return (
            <BootstrapTable data={this.state.claimList} options={options} version='4' search>
                <TableHeaderColumn dataField='_id' isKey={true}>Claim ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='latestEvaluation'>Evaluation</TableHeaderColumn>
                <TableHeaderColumn dataField='json' dataFormat={this.claimJson.bind(this)}>JSON Data</TableHeaderColumn>
                <TableHeaderColumn dataField='button' dataFormat={this.cellEvaluateButton.bind(this)}>Evaluate</TableHeaderColumn>
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
                        <div className='fluid-container'>
                            <div className='row'>
                                <div className="col-8">
                                    <p>ID: {this.state.projectMeta._id}</p>
                                    <p>Created: {formatJSONDateTime(this.state.projectMeta.created)}</p>
                                </div>
                                <div className="col-4">
                                    <FlagIcon code={fixCountryCode(this.state.projectMeta.country)} size='3x'></FlagIcon>
                                    <p>{this.getCountryName(this.state.projectMeta.country)}</p>
                                </div>
                            </div>
                        </div>
                        <OwnerBox>
                            <h3>Owner information:</h3>
                            <p>Name: {this.state.projectMeta.owner.name}</p>
                            <p>Email: {this.state.projectMeta.owner.email}</p>
                        </OwnerBox>
                    </div>
                    <div className="col-md-12">
                        <AgentHeader>Agents:</AgentHeader>
                        <ButtonContainer>
                            <ProjectAnimatedButton onClick={this.handleRegisterAgent}><span>Register as Agent</span></ProjectAnimatedButton>
                        </ButtonContainer>
                        {this.renderAgentListTable()}
                    </div>
                    <div className="col-md-12">
                        <AgentHeader>Claims:</AgentHeader>
                        <ButtonContainer>
                            <ProjectAnimatedButton onClick={this.handleCaptureClaim}><span>Capture Claim</span></ProjectAnimatedButton>
                        </ButtonContainer>
                        {this.renderClaimListTable()}
                    </div>
                </ProjectContainer>

                <ModalWrapper
                    isModalOpen={this.state.isModalOpen}
                    handleToggleModal={(modalStatus) => this.handleToggleModal(modalStatus)}>

                    {renderSwitch(this.state.modalType, {
                        agent: () => <div>{this.handleRenderAgentForm()}</div>,
                        claim: () => <div>{this.handleRenderClaimForm()}</div>,
                        json: () => <div>{this.handleRenderClaimJson()}</div>,
                        evaluate: () => <div>{this.handleRenderEvaluateForm()}</div>
                    })}
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


const CellButton = styled.button`
    display: block;
    justify-content: center;
    border-radius: 4px;
    height: 35px;
    width: 90px;
    background-color: black;
    border: none;
    color: ${props => props.theme.bgLightest};
`;

const SelectStatus = styled.select`
    display: block;
    justify-content: center;
    background-color: white;
    height: 35px;
    width: 90px;
    border: none;
    color: black;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content:flex-end;
`;

const ProjectAnimatedButton = styled.button`
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