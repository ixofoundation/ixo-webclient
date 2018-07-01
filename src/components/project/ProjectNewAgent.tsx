import * as React from 'react';
import styled from 'styled-components';
import { AgentRoles, FormStyles } from '../../types/models';
import DynamicForm from '../form/DynamicForm';
import { agentJson } from '../../lib/commonData';

const Container = styled.div`
	font-family: ${props => props.theme.fontRoboto};
	min-width: 320px;
	max-width: 60vw;
	padding: 10px;
	button {
		margin: 0 10px 10px 10px;
	}

`;

const ByLine = styled.p`
	font-size: 16px;
	font-weight: 100;
	max-width: 400px;
	width: 100%;
`;

const FlexContainer = styled.div`
	display: flex;
	padding:0 30px 0 0;
	
	i {
		margin-right: 10px;
		font-size: 50px;
	}
	
	h3 {
		font-weight: 300;
		font-size: 24px;
		line-height: 1;
		text-transform: uppercase;
		margin: 0;
		font-family: ${props => props.theme.fontRobotoCondensed};
	}

	p {
		font-weight: 300;
		margin: 0;
		font-size: 16px;
		color: ${props => props.theme.fontLightBlue};
		font-family: ${props => props.theme.fontRoboto};
	}
`;

const Line = styled.div`
	background: ${props => props.theme.widgetBorder};
    width: calc(100% + 40px);
    margin: 5px 0 25px -20px;
	height: 1px;
`;

export interface ParentProps {
	submitAgent: (role: string, agentData: object) => void;
	role: string;
	name: string;
	projectTitle: string;
}

export interface State {
	name: string;
}	

export class ProjectNewAgent extends React.Component<ParentProps, State> {

	state = {
		name: this.props.name
	};

	titleMap = {
		[AgentRoles.investors]: 'Become an Investor',
		[AgentRoles.evaluators]: 'Become an Evaluator',
		[AgentRoles.serviceProviders]: 'Become a Service Agent',
	};

	renderSubtitle = (role: string) => {
		return this.titleMap[role];
	}

	renderByLine = (role: string) => {
		switch (role) {
			case 'SA':
				return <ByLine>Service Providers delivers the impact to a project. They are the people on the ground submitting claims, and making a difference.</ByLine>;
			case 'EA':
			return <ByLine>Evaluators check that submitted claims are valid and complete, ensuring that the project quality is maintained and validated</ByLine>;
			case 'IA':
				return <ByLine>Investors fund the project's processing costs</ByLine>;
			default:
				return 'role not found';
		}
	}

	handleNameChange = (event: any) => {
		this.setState({name: event.target.value});
	}

	render() {
		let formJson = JSON.parse(agentJson);
		return (
			<Container>
				<FlexContainer>
					<div><i className="icon-modal" /></div>
					<div>
						<h3>{this.props.projectTitle}</h3>
						<p>{this.renderSubtitle(this.props.role)}</p>
					</div>
				</FlexContainer>
				<Line />
				{this.renderByLine(this.props.role)}
				<DynamicForm 
					formStyle={FormStyles.modal}
					formSchema={formJson.fields} 
					submitText="Apply" 
					handleSubmit={(e) => this.props.submitAgent(this.props.role, e)} 
				/>
			</Container>
		);
	}
}