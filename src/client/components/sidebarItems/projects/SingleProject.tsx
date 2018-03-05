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
import { Doughnut } from 'react-chartjs-2';

var merge = require('merge');
var JSONPretty = require('react-json-pretty');
const projectBG = require('../../../assets/images/project-bg.jpg');

export namespace SingleProject {

    export interface Props {
        location?: any,
        ixo?: any,
        match?: any
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

    export interface Callbacks {
        refreshProjects: () => void
    }

    export interface IProps extends Props, Callbacks {
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
        if (!this.state.projectMeta) {
            this.props.ixo.project.findProjectById(this.props.match.params.projectID).then((response: any) => {
                this.setState({ projectMeta: response.result[0] });
                this.handleInitialLoad();
            }).catch((error: Error) => {
                console.log(error);
            });
        }
        else {
            this.handleInitialLoad();
        }

    }

    handleInitialLoad = () => {
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
            this.setState({ claimList: claimList.result });
        }).catch(error => {
            console.log(error);
        })
    }

    handleClaimSubmit = (formData: any) => {
        var toastId = toast('Submitting claim...', { autoClose: false });
        var data = merge(formData, { projectTx: this.state.projectMeta.tx })
        this.props.ixo.claim.createClaim(formData, 'default').then((response: any) => {
            this.handleResponse(toastId, response, 'submitClaim');
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
        merge(formData, { projectTx: this.state.projectMeta.tx })
        this.props.ixo.agent.createAgent(formData, 'default').then((response: any) => {
            this.handleResponse(toastId, response, 'createAgent');
        }).catch((error) => {
            this.handleToggleModal(false);
            toast.update(toastId, {
                render: 'Error creating agent',
                type: 'error',
                autoClose: 3000
            });;
        })
    }

    handleResponse = (toastId: any, response: any, responseType: string) => {
        if (response.result) {
            this.handleToggleModal(false);
            toast.update(toastId, {
                render: 'Successfull',
                type: 'success',
                autoClose: 3000
            });

            switch (responseType) {
                case 'evaluateClaim':
                    this.getClaimList();
                    break;
                case 'submitClaim':
                    this.getClaimList();
                    break;
                case 'updateAgentStatus':
                    this.getAgentList();
                    break;
                case 'createAgent':
                    this.getAgentList();
                    break;
            }
        } else if (response.error) {
            this.handleToggleModal(false);
            toast.update(toastId, {
                render: response.error.message,
                type: 'error',
                autoClose: 3000
            });
        }
    }

    handleClaimEvaluation = (formData: any) => {
        var toastId = toast('Evaluating claim...');
        var data = { claimTx: formData.claimTx, result: formData.result };
        this.props.ixo.claim.evaluateClaim(data, 'default').then((response: any) => {
            this.props.refreshProjects();
            this.handleResponse(toastId, response, 'evaluateClaim');
        }).catch((error) => {
            this.handleToggleModal(false);
            toast.update(toastId, {
                render: 'Error evaluating claim',
                type: 'error',
                autoClose: 3000
            });;
        })
    }

    onUpdateStatus = (row, selectedOption) => {
        if (this.props.ixo.credentialProvider.getDid()) {
            var agentData = {
                agentTx: row.tx,
                status: selectedOption
            }
            var toastId = toast('Updating agent status...');
            this.props.ixo.agent.updateAgentStatus(agentData).then((response: any) => {
                this.handleResponse(toastId, response, 'updateAgentStatus');
            });
            
        } else {
            this.setState({ modalType: 'metaMask' });
            this.handleToggleModal(true);
        }

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

    claimStatistics() {

        const total = this.state.projectMeta.numberOfSuccessfulClaims;

        const approved = this.getCountClaimsOfType('Approved');
        const pending = this.getCountClaimsOfType('Pending');
        const rejected = this.getCountClaimsOfType('NotApproved');

        const approvedPercent = (approved / total) * 100;
        const rejectedPercent = (rejected / total) * 100;
        const pendingPercent = (pending / total) * 100;

        const data = {
            labels: [
                'Approved',
                'Pending',
                'Rejected'
            ],
            datasets: [{
                data: [approvedPercent, pendingPercent, rejectedPercent],
                backgroundColor: [
                    '#22d022',
                    '#ffa500',
                    '#FF0000'
                ],
                hoverBackgroundColor: [
                    '#1bb51b',
                    '#ec9900',
                    '#e20303'
                ]
            }],
        };
        const options = {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, chart) {
                        const label = chart.labels[tooltipItem.index];
                        const title = chart.datasets[0].data[tooltipItem.index];

                        return `${label} ${title}%`;
                    }
                }
            }
        }

        return (
            <ClaimStatistics>
                <Doughnut data={data} options={options} />
            </ClaimStatistics>
        );
    }

    getCountClaimsOfType(claimType: string) {

        let amount = 0;
        
        this.state.claimList.map((claim, index) => {
            if (claim.latestEvaluation == claimType) {
                amount++;
            }
        });
        return amount;
    }

    getCountAgentsOfRole(agentType: string) {
        let amount = 0;

        this.state.agentList.map((agent, index) => {
            if (agentType == agent.role) {
                amount++;
            }
        });
        return amount;
    }

    render() {
        if (this.state.projectMeta) {
            console.log(this.state.projectMeta);

            return (
                <div className="container">
                    <ProjectContainer>
                        <div className="row">
                            <div className="col-md-12">
                                <ProjectHeader>
                                    <Link to="/">&larr; Back to Home</Link>
                                    <h1>{this.state.projectMeta.name}</h1>
                                    <FlagBox title={this.getCountryName(this.state.projectMeta.country)}>
                                        <FlagIcon code={fixCountryCode(this.state.projectMeta.country)} size='3x'></FlagIcon>
                                    </FlagBox>
                                </ProjectHeader>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <ProjectCard>
                                    <H2>Project Description</H2>
                                    <p>{this.state.projectMeta.about}</p>
                                </ProjectCard>
                            </div>
                            <div className="col-md-6">
                                <ProjectCard>
                                    <H2>Additional Project Information</H2>
                                    <p><strong>Created:</strong> {formatJSONDateTime(this.state.projectMeta.created)}</p>
                                    <p><strong>Owner Name:</strong> {this.state.projectMeta.owner.name}</p>
                                    <p><strong>Owner Email:</strong> {this.state.projectMeta.owner.email}</p>
                                    <p><strong>Sustainable Development Goal:</strong> {this.state.projectMeta.sdg.name}</p>
                                </ProjectCard>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <ProjectCard>
                                    <div className="row">
                                        <div className="col-12">
                                            <H2>Project Statistics:</H2>
                                        </div>
                                        {this.state.claimList.length > 0 &&
                                        <div className="col-xl-4 col-md-6 ">
                                            <p>Claims breakdown (%)</p>
                                            {this.claimStatistics()}
                                        </div>
                                        }
                                        <div className="col-xl-2 col-md-3 col-sm-6 vertical-center">
                                            <p>Successful Claims</p>
                                            <Number>{this.getCountClaimsOfType('Approved')}/{this.state.projectMeta.numberOfSuccessfulClaims}</Number>
                                        </div>
                                        <div className="col-xl-2 col-md-3 col-sm-6 vertical-center">
                                            <p>Evaluation Agents</p>
                                            <Number>{this.getCountAgentsOfRole('EA')}</Number>
                                        </div>
                                        <div className="col-xl-2 col-md-3 col-sm-6 vertical-center">
                                            <p>Service Agents</p>
                                            <Number>{this.getCountAgentsOfRole('SA')}</Number>
                                        </div>
                                        <div className="col-xl-2 col-md-3 col-sm-6 vertical-center">
                                            <p>Investor Agents</p>
                                            <Number>{this.getCountAgentsOfRole('IA')}</Number>
                                        </div>
                                    </div>
                                </ProjectCard>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <ProjectCard>
                                    <H2>Agents:</H2>
                                    <ButtonContainer>
                                        <ProjectAnimatedButton onClick={this.handleRegisterAgent}><span>Register as Agent</span></ProjectAnimatedButton>
                                    </ButtonContainer>
                                    <ProjectTable>
                                        {renderIfTrue(this.state.agentList.length > 0, () => this.renderTable('agents'))}
                                    </ProjectTable>
                                </ProjectCard>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <ProjectCard>
                                    <H2>Claims:</H2>
                                    <ButtonContainer>
                                        <ProjectAnimatedButton onClick={this.handleCaptureClaim}><span>Capture Claim</span></ProjectAnimatedButton>
                                    </ButtonContainer>
                                    <ProjectTable>
                                        {renderIfTrue(this.state.claimList.length > 0, () => this.renderTable('claims'))}
                                    </ProjectTable>
                                </ProjectCard>
                            </div>
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
        } else {
            return <p>Loading...</p>
        }
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

    > .row {
        margin-bottom:30px;
    }
`;

const H2 = styled.h2`
    font-size: 28px;
    margin-top: 15px;
`;

const ProjectTable = styled.div`
    .table {
        background:white;
    }

    .table thead th {
        background: #64e4ff;
        color: white;
        text-align:center;
        text-transform:uppercase;
        border: 5px solid white;
    }

    .table td {
        border: 0;
        border: 5px solid #ffffff;
        background: #dcecf1;
        color: #16a2b8;
    }
`;

const ProjectCard = styled.div`
    background: white;
    box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.1);
    padding: 10px 20px 30px;
    height:100%;
    border-radius:5px;
    border-bottom:5px solid #b6f2ff;

    .row {
        justify-content: center;
    }

    a {
        color: ${props => props.theme.bgLightest};
        padding:10px;
        display:inline-block;
    }

    ${H2} {
        margin-bottom: 20px;
        color: #00d2ff;
    }

    p {
        margin-bottom:0;
    }

    .vertical-center {
        justify-content:center;
        align-items:center;
        display:flex;
        flex-direction:column;
    }
`;

const ProjectHeader = ProjectCard.extend`

    display:flex;
    justify-content:space-between;
    align-items:center;
    padding-bottom:10px;

    h1,a {
        flex:1;
    }

    h1 {
        text-align:center;
        margin-bottom:0;
        font-size:30px;
        color: #00d2ff;
    }

    a:hover {
        text-decoration:none;

    }
`;

const FlagBox = styled.div`
    padding: 5px;
    flex:1;
    text-align:right;
`;
const OwnerBox = styled.div`

    margin-bottom:10px;

    & p {
        margin-bottom:0;
    }
`;

const Number = styled.p`
    font-size:40px;
    font-weight:bold;
    text-align:center;
`

const ClearButton = styled.button`
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    height: 35px;
    background-color: ${props => props.theme.bgLightest};
    border: none;
    color: #FFFFFF;
`;

const ClaimStatistics = styled.div`
    display:flex;
    margin:0 auto;
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