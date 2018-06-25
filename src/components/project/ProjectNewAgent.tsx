import * as React from 'react';
import styled from 'styled-components';
import { AgentRoles } from '../../types/models';
import { Button, ButtonTypes } from '../common/Buttons';
import DynamicForm from '../form/DynamicForm';
import { claimJson } from '../../lib/commonData';

const Text = styled.input`
	margin: 20px 0;
	display: block;
	width: 100%;
`;

const Container = styled.div`
	button {
		margin: 0 10px 10px 10px;
	}
`;

const FlexContainer = styled.div`
	display: flex;
	padding:0 30px 0 0;
	
	i {
		margin-right: 10px;
	}
	
	h3 {
		font-weight: 300;
		font-size: 23px;
		text-transform: uppercase;
		margin: 0;
		font-family: ${props => props.theme.fontRobotoCondensed};
	}

	p {
		font-weight: 300;
		margin: 0;
		font-size: 18px;
		color: ${props => props.theme.fontLightBlue};
	}
`;

const Line = styled.div`
	background: ${props => props.theme.widgetBorder};
    width: calc(100% + 40px);
    margin: 5px 0 5px -20px;
	height: 1px;
`;

export interface ParentProps {
	submitAgent: (role: string, agentData: object) => void;
	role: string;
	name: string;
	projectTitle: string;
}

export interface State {
	email: string;
	name: string;
}	

export class ProjectNewAgent extends React.Component<ParentProps, State> {

	state = {
		email: '', 
		name: this.props.name, 
	};

	titleMap = {
		[AgentRoles.investors]: 'Become an Investor',
		[AgentRoles.evaluators]: 'Become an Evaluator',
		[AgentRoles.serviceProviders]: 'Become an Service Agent',
	};

	renderSubtitle = (role: string) => {
		return this.titleMap[role];
	}

	handleNameChange = (event: any) => {
		this.setState({name: event.target.value});
	}

	handleEmailChange = (event: any) => {
		this.setState({email: event.target.value});
	}

	render() {
		const formJson = claimJson;
		return (
			<Container>
				<FlexContainer>
					<div><i className="icon-ixo-logo" /></div>
					<div>
						<h3>{this.props.projectTitle}</h3>
						<p>{this.renderSubtitle(this.props.role)}</p>
					</div>
				</FlexContainer>
				<Line />
				<DynamicForm formSchema={formJson} handleSubmit={(e) => this.props.submitAgent(this.props.role, this.state)} />
				<Text placeholder="Name" value={this.state.name} onChange={this.handleNameChange} />
				<Text placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
				<Button type={ButtonTypes.gradient} onClick={(e) => this.props.submitAgent(this.props.role, this.state)}>Submit new Agent</Button>
			</Container>
		);
	}
}