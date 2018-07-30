import * as React from 'react';
import styled from 'styled-components';
import { FormStyles } from '../../types/models';
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

export interface ParentProps {
	submitAgent: (role: string, agentData: object) => void;
	role: string;
	name: string;
}

export interface State {
	name: string;
}	

export class ProjectNewAgent extends React.Component<ParentProps, State> {

	state = {
		name: this.props.name
	};

	renderByLine = (role: string) => {
		switch (role) {
			case 'SA':
				return <ByLine>Service Providers delivers the impact to a project. They are the people on the ground submitting claims, and making a difference.</ByLine>;
			case 'EA':
			return <ByLine> Evaluators check that submitted claims are valid and complete, ensuring that the project quality is maintained and validated</ByLine>;
			case 'IA':
				return <ByLine>Investors fund the project's processing costs.</ByLine>;
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