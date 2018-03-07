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
        selectStatuses: any,
        modalType: string,
        claimTxToEvaluate: any
        activeAgent: number,
        activeClaim: number
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
            claimTxToEvaluate: null,
            selectStatuses: [],
            modalType: null,
            activeAgent : null,
            activeClaim : null
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

            let selectStatuses = [...this.state.selectStatuses];

            agentList.result.map((val,index)=>{
                selectStatuses[index] = "Approved";
            });
            
            this.setState({ agentList: agentList.result ,selectStatuses});

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
                render: 'Successful',
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

    onUpdateStatus = (tx, selectedOption) => {
        if (this.props.ixo.credentialProvider.getDid()) {
            var agentData = {
                agentTx: tx,
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

    handleEvaluateClaim = (tx:String) => {
        this.setState({claimTxToEvaluate:tx});
        this.checkCredentialProvider('evaluate');
    }

    handleToggleModal(modalStatus) {
        this.setState({ isModalOpen: modalStatus });
    };

    handleRenderForm = (schema: any, handler: any, tx = '') => {
        if (this.state.claimFormSchema.length > 0) {
            let agentSchema = [...schema];
            let presetValues = [tx];
            agentSchema = agentSchema.filter((value) => value.name !== "template.name" && value.name !== "projectTx")
            return <DynamicForm presetValues={presetValues} formSchema={agentSchema} handleSubmit={handler} />
        } else {
            return <p>Loading Form...</p>
        }
    }

    handleRenderMetaMaskModal = () => {
        return <div>Please login to Metamask to perform this action.</div>;
    }

    getCountryName(countryCode: string): string {
        return iso3311a2.getCountry(fixCountryCode(countryCode).toUpperCase())
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

    handleAccordionToggle(type,index,event){
        if(event.target === event.currentTarget || event.target.tagName === 'SPAN'){
            if(type === 'agent'){
                this.state.activeAgent === index ? this.setState({activeAgent:null}) : this.setState({activeAgent:index})
            } else if (type === 'claim'){
                this.state.activeClaim === index ? this.setState({activeClaim:null}) : this.setState({activeClaim:index})
            }
        }
    }

    renderData(type:string) {

        let fieldsArray = [];
        let listToTraverse = [];
        let activeType = 0;

        if(type === 'agent'){
            fieldsArray =  ['email', '_id', 'did', 'latestStatus', 'tx','role'];
            listToTraverse = this.state.agentList;
            activeType = this.state.activeAgent;
        }
        else if(type ==='claim'){
            fieldsArray =  ['_id','attended', 'did', 'latestEvaluation', 'tx'];
            listToTraverse = this.state.claimList;
            activeType = this.state.activeClaim;
        }

        return (
            <DataCard>
                {listToTraverse.map((listItem,index)=>{
                    const tx = listToTraverse[index]['tx'];
                    return (
                        <div className={type} key={index}>
                            <DataHeading onClick={(event)=>this.handleAccordionToggle(type,index,event)}>
                                {listToTraverse[index]['name']}
                                <div className={`${(activeType === index) ? 'active-heading': ''}`}>
                                    {(type === 'agent') &&
                                        <div>
                                            <SelectStatus value={this.state.selectStatuses[index]} onChange={(e)=>this.handleSelectChange(index,e)}>
                                                <option value="Approved">Approve</option>
                                                <option value="NotApproved">Decline</option>
                                                <option value="Revoked">Revoke</option>
                                            </SelectStatus>
                                            <ProjectAnimatedButton onClick={()=>this.onUpdateStatus(tx,this.state.selectStatuses[index])}>Update Status</ProjectAnimatedButton>
                                        </div>
                                    }
                                    {(type === 'claim') &&
                                            <div>
                                                <ProjectAnimatedButton onClick={()=>this.handleEvaluateClaim(tx)}>Evaluate</ProjectAnimatedButton>
                                            </div>        
                                    }
                                    <span>&#8249;</span>
                                </div>


                            </DataHeading>
                            <div className="container">
                                <DataBody className={`${(activeType === index) ? 'active-row': ''} row`}>
                                    {this.renderObjectData(fieldsArray,listToTraverse,index)}
                                </DataBody>
                            </div>
                        </div>
                    );
                })}
            </DataCard>
        );
    }

    handleSelectChange(index:number,event:any){
        let selectStatuses = [...this.state.selectStatuses];
        selectStatuses[index] = event.target.value;
        this.setState({selectStatuses})
    }

    renderObjectData(fieldsArray:any,listToTraverse:any,index:number){
        return fieldsArray.map((value, key)=>{
            return (
                <Field key={key} className="col-md-4">
                    <div>
                        <FieldKey>{value}</FieldKey>
                        <FieldValue>{listToTraverse[index][value]}</FieldValue>
                    </div>
                </Field>
            );
        });
    }

    render() {
        if (this.state.projectMeta) {
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
                                    <CardHeading>
                                        <H2>Agents:</H2>
                                        <ProjectAnimatedButton onClick={this.handleRegisterAgent}><span>Register as Agent</span></ProjectAnimatedButton>
                                    </CardHeading>
                                        {renderIfTrue(this.state.agentList.length > 0, () => this.renderData('agent'))}
                                </ProjectCard>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <ProjectCard>
                                    <CardHeading>
                                        <H2>Claims:</H2>
                                        <ProjectAnimatedButton onClick={this.handleCaptureClaim}><span>Capture Claim</span></ProjectAnimatedButton>
                                    </CardHeading>
                                    {renderIfTrue(this.state.agentList.length > 0, () => this.renderData('claim'))}
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
                            evaluate: () => <div>{this.handleRenderForm(this.state.evaluationFormSchema, this.handleClaimEvaluation,this.state.claimTxToEvaluate)}</div>,
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

const CardHeading = styled.div`

    display:flex;
    justify-content:space-between;
    align-items:center;

    ${H2} {
        margin-bottom: 20px;
        color: #00d2ff;
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

const Number = styled.p`
    font-size:40px;
    font-weight:bold;
    text-align:center;
`

const ClaimStatistics = styled.div`
    display:flex;
    margin:0 auto;
`;

const SelectStatus = styled.select`
    justify-content: center;
    background-color: white;
    margin:0 5px;
    height: 35px;
    width: 160px;
    border: none;
    color: black;
`;

const ProjectAnimatedButton = styled.button`
    border-radius: 4px;
    background-color: ${props => props.theme.bgDarker};
    border: none;
    color: #FFFFFF;
    font-size: 1em;
    transition: all 0.5s;
    cursor: pointer;
    margin-left:5px;
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

  :hover {
    background-color: ${props => props.theme.bgDarkest};

  }
  
  &:hover span {
    padding-right: 25px;
  }
  
  &:hover span:after {
    opacity: 1;
    right: 0;
  }
`;

const DataBody = styled.div`
    padding: 10px;
    background: #b5f3ff;
    border-radius: 5px;
    margin-bottom:0px;
    color: #16a2b8;

    opacity:0;
    height:0;
    transform: scaleY(0);
    transform-origin:top;
    transition:opacity 0.5s ease;

`;

const DataCard = styled.div`
    ${DataBody}.active-row {
        opacity:1;
        transform: scaleY(1);
        height:auto;
        margin-bottom:20px;
        justify-content:start;

    }

`;

const DataHeading = styled.div`
    padding: 10px;
    border-radius: 5px;
    margin-bottom:2px;
    color: white;
    display: flex;
    background: #00d2ff;
    justify-content: space-between;
    align-items: center;

    transition:background 0.3s ease;

    :hover {
        cursor:pointer;
        background:#00b9e0;
    }
    div {
        display:flex;
    }

    span {
        display: flex;
        align-items: center;
        margin: 0 5px 0 10px;
        transform: rotate(-90deg);
        color: #ffffff;
        font-size: 2.5em;
        line-height: 35px;
        transition:transform 0.4s ease;
    }

    .active-heading span {
        transform: rotate(-270deg);
        margin: 0 0 0 15px;
    }
`;

const Field = styled.div`
    margin-bottom:10px;
`;

const FieldKey = styled.p`
    font-weight: bold;
    margin-right: 5px;
    border-radius: 5px;
`;

const FieldValue = styled.p`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
`;