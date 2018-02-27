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
import { renderIf, renderSwitch, renderIfTrue } from '../../../utils/react_utils';
import { Table } from '../../shared/Table';
import { ICustomButton } from '../../../../../types/models';

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

    checkCredentialProvider(modalType?: string) {
        if (this.props.ixo.credentialProvider.getDid() && modalType) {
            this.setState({ modalType: modalType });
        } else {
            this.setState({ modalType: 'metaMask' });
        }
        this.handleToggleModal(true);
    }

    handleRegisterAgent = () => {
        this.checkCredentialProvider('agent');
    }

    handleCaptureClaim = () => {
        this.checkCredentialProvider('claim');
    }

    handleEvaluateClaim = () => {
        this.checkCredentialProvider('evaluate');
    }

    handleToggleModal(modalStatus) {
        this.setState({ isModalOpen: modalStatus });
    };

    handleRenderForm = (schema: any, handler: any) => {
        if (this.state.claimFormSchema.length > 0) {
            let agentSchema = [...schema];
            agentSchema = agentSchema.filter((value) => value.name !== "template.name" && value.name !== "projectTx")
            return <DynamicForm formSchema={agentSchema} handleSubmit={handler} />
        } else {
            return <p>Loading Form...</p>
        }
    }

    handleRenderMetaMaskModal = () => {
        return <div>Please login to Metamask to perform this action.</div>;
    }

    handleRenderClaimJson = () => {
        return <div><JSONPretty id="json-pretty" json={this.state.currentClaimJson}></JSONPretty></div>;
    }

    createCustomClearButton = (onClick) => {
        return (
            <ClearButton onClick={onClick}>Clear</ClearButton>
        );
    }

    onUpdateStatus = (row, selectedOption) => {
        if (this.props.ixo.credentialProvider.getDid()) {
            var agentData = {
                agentTx: row.tx,
                status: selectedOption
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
                if (response.result.latestStatus === selectedOption) {
                    toast.update(toastId, {
                        render: 'Agent status updated',
                        type: 'success',
                        autoClose: 3000
                    })
                    this.getAgentList();
                }
            });
        } else {
            this.setState({ modalType: 'metaMask' });
            this.handleToggleModal(true);
        }
    }

    getCountryName(countryCode: string): string {
        return iso3311a2.getCountry(fixCountryCode(countryCode).toUpperCase())
    }

    onViewClaimClicked = (row) => {
        this.handleToggleModal(true);
        this.setState({ currentClaimJson: row, modalType: 'json' })
    }

    renderTable(type: string) {
        const options = {
            clearSearch: true,
            clearSearchBtn: this.createCustomClearButton
        };
        var selectOptions = [
            { label: 'Approve', value: 'Approved' },
            { label: 'Decline', value: 'NotApproved' },
            { label: 'Revoke', value: 'Revoked' }
        ];

        switch (type) {
            case 'agents': {
                const agentsButtons: ICustomButton[] = [
                    {
                        headerLabel: 'Update Status',
                        buttonLabel: 'Update',
                        callback: this.onUpdateStatus
                    }
                ]

                const visibleAgentColumns = [
                    '_id', 'name', 'email', 'role', 'did', 'latestStatus'
                ]
                return <Table tableDataSet={this.state.agentList}
                    tableOptions={options}
                    customButtons={agentsButtons}
                    selectOptions={selectOptions}
                    tableVisibleColumns={visibleAgentColumns} />
            }
            case 'claims': {
                const claimsButtons: ICustomButton[] = [
                    {
                        headerLabel: 'jsonData',
                        buttonLabel: 'View Claim Data',
                        callback: this.onViewClaimClicked
                    },
                    {
                        headerLabel: 'Evaluate',
                        buttonLabel: 'Evaluate',
                        callback: this.handleEvaluateClaim
                    }
                ]

                const visibleClaimColumns = [
                    '_id', 'name', 'attended', 'did', 'latestEvaluation', 'tx'
                ]

                return <Table tableDataSet={this.state.claimList}
                    tableOptions={options}
                    customButtons={claimsButtons}
                    tableVisibleColumns={visibleClaimColumns}
                />
            }
        }
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
                                    <p>Created: {formatJSONDateTime(this.state.projectMeta.created)}</p>
                                </div>
                                <FlagBox className="col-4" title={this.getCountryName(this.state.projectMeta.country)}>
                                    <FlagIcon code={fixCountryCode(this.state.projectMeta.country)} size='3x'></FlagIcon>
                                </FlagBox>
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
                        {renderIfTrue(this.state.agentList.length > 0, () => this.renderTable('agents'))}
                    </div>
                    <div className="col-md-12">
                        <AgentHeader>Claims:</AgentHeader>
                        <ButtonContainer>
                            <ProjectAnimatedButton onClick={this.handleCaptureClaim}><span>Capture Claim</span></ProjectAnimatedButton>
                        </ButtonContainer>
                        {renderIfTrue(this.state.claimList.length > 0, () => this.renderTable('claims'))}
                    </div>
                </ProjectContainer>

                <ModalWrapper
                    isModalOpen={this.state.isModalOpen}
                    handleToggleModal={(modalStatus) => this.handleToggleModal(modalStatus)}>

                    {renderSwitch(this.state.modalType, {
                        agent: () => <div>{this.handleRenderForm(this.state.agentFormSchema, this.handleAgentSubmit)}</div>,
                        claim: () => <div>{this.handleRenderForm(this.state.claimFormSchema, this.handleClaimSubmit)}</div>,
                        json: () => <div>{this.handleRenderClaimJson()}</div>,
                        evaluate: () => <div>{this.handleRenderForm(this.state.evaluationFormSchema, this.handleClaimEvaluation)}</div>,
                        metaMask: () => <div>{this.handleRenderMetaMaskModal()}</div>
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
    padding-bottom:10%;
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
const FlagBox = styled.div`
    padding: 5px;
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