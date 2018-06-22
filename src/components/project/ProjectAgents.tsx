import * as React from 'react';
import styled from 'styled-components';
import { ProjectWidget } from './ProjectWidget';
import { ProjectDetailWrapper } from './ProjectDetailWrapper';
import { ButtonTypes, Button } from '../common/Buttons';

const Section = styled.section`

	padding-bottom: 30px;
	border-bottom: 1px solid #164A63;

	h2 {
		color: white;
		font-size: 30px;
		font-family: ${props => props.theme.fontRobotoCondensed};
	}

	i {

	}

	i:before {
		color: #5AB946;
	}
`;

const Indicator = styled.div`
	width: 7px;
	height: 25px;
	position: absolute;
	top:18px;
	left:-7px;

	background: ${props => props.color};

`;

const Mail = styled.a`
`;

const Col = styled.div`

	font-size: 15px;
	font-weight: 300;
	
	${Mail} {
		color: #5094ac;
		text-decoration:none;
		display:block;
	}

	p {
		margin:0;
	}

	${Mail}:hover {
		color:white;
		font-weight: 600;
	}

	> div {
		position: relative;
		padding-bottom: 50px;
	}

`;

const Hover = styled.div`
	position:absolute;
	top:0;
	left:0;
	right:0;
	bottom:0;
	background: rgba(0,0,0, 0.5);
	z-index: 2;
	display: flex;
	justify-content: center;
	align-items: center;

	> a {
		padding-left: 30px;
		padding-right: 30px;
	}
`;

const Actions = styled.div`
	position: absolute;
	top:0;
	width: 100%;

	display: flex;
	justify-content: space-between;
`;

const Selector = styled.div`
	width: 20px;
	height: 20px;
	border:1px solid white;
	background: ${props => props.theme.bg.blue};
	padding: 2px;
	border-radius: 50%;

	> div {
		background: ${props => props.theme.fontDarkBlueButtonHover};
		width: 100%;
		border-radius: 50%;
		height: 100%;
		opacity: 0;

		transition: opacity 0.3s ease;
	}

	> div.selected {
		opacity: 1;
	}
`;

const Buttons = styled.div`
	border-radius: 50%;
`;

const SmallButton = styled.a`
	width: 100px;
	color: white;
	display:inline-block;
`;

export interface ParentProps {
	agents: any;
	handleUpdateAgentStatus: (status: object, did: string, role: string) => void;
}

export interface State {
	selectedAgents: string[];
}
export class ProjectAgents extends React.Component<ParentProps, State> {

	state: State = {
		selectedAgents: []
	};

	handleUpdateAgentStatus = (status: string, statusObj: any, did: string, role: string) => {
		if (statusObj === null) {
			this.props.handleUpdateAgentStatus({status: status}, did, role);
		} else {
			this.props.handleUpdateAgentStatus({status, version: statusObj.version}, did, role);
		}
	}

	handleAgentSelect = (agentDid: string) => {
		let tempSelect = [...this.state.selectedAgents];
		// @ts-ignore
		if (tempSelect.includes(agentDid)) {
			tempSelect = tempSelect.filter((agent) => agentDid !== agent);
			this.setState({selectedAgents: tempSelect});
		} else {
			tempSelect.push(agentDid);
			this.setState({selectedAgents: tempSelect});
		}
	}

	handleIsSelected = (agentDid: string) => {
		if (this.state.selectedAgents !== null) {
			// @ts-ignore
			return (this.state.selectedAgents.includes(agentDid)) ? 'selected' : '';
		}
		return '';
	}

	handleRenderSection = (iconClass: string, agents: any[], colorClass: string, title: string,  key: number) => {
		return (
			<Section className="row" key={key}>
					<div className="col-md-12">
						<h2><i className={iconClass}/>{title}</h2>
					</div>
					{agents.map((agent, index) => {
						return (
							<Col className="col-md-3" key={index}>
								<ProjectWidget title={agent.name}>
									<Indicator color={colorClass}/>
									<p>{agent.role}</p>
									<p><strong>DID: </strong>{agent.agentDid}</p>
									<Mail href={`mailto:${agent.email}`}>{agent.email}</Mail>
									<Hover>
										<Actions>
											<Selector onClick={() => this.handleAgentSelect(agent.agentDid)}>
												<div className={this.handleIsSelected(agent.agentDid)}/>
											</Selector>
											<Buttons>
												<SmallButton onClick={() => this.handleUpdateAgentStatus('1', agent.currentStatus, agent.agentDid, agent.role)}>&check;</SmallButton>
												<SmallButton onClick={() => this.handleUpdateAgentStatus('2', agent.currentStatus, agent.agentDid, agent.role)}>&cross;</SmallButton>
											</Buttons>
										</Actions>
										<Button onClick={() => console.log('clicked')} type={ButtonTypes.dark}>View</Button>
									</Hover>
								</ProjectWidget>
							</Col>
						);
					})}
			</Section>
		);
	}

	handleMapAgents = () => {

		const approved = [];
		const pending = [];
		const revoked = [];
		const sections = [];
		this.props.agents.map((agent) => {
			if (agent.currentStatus === null) {
				pending.push(agent);
			} else {
				switch (agent.currentStatus.status) {				
					case '1':
						approved.push(agent);
						break;
					case '2':
						revoked.push(agent);
						break;
					case '0':
					default:
						pending.push(agent);
						break;
				}
			}
		});

		pending.length > 0 && sections.push(this.handleRenderSection('icon-ixo-logo', pending, '#F89D28', 'Pending Approval', 1));
		approved.length > 0 && sections.push(this.handleRenderSection('icon-ixo-logo', approved, '#5AB946', 'Service Providers', 2));
		revoked.length > 0 && sections.push(this.handleRenderSection('icon-ixo-logo', revoked, '#E2223B', 'Revoked', 3));

		return sections;
	}

	render() {
		console.log(this.props.agents);
		return (
			<ProjectDetailWrapper>
				{this.handleMapAgents()}
			</ProjectDetailWrapper>
		);
	}
}