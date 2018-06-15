import * as React from 'react';
import styled from 'styled-components';
import { AgentRoles } from '../../types/models';

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

export interface ParentProps {
	submitAgent: (role: string, agentData: object) => void;
	role: string;
	name: string;
}

export interface State {
	email: string;
	name: string;
}	

export class ProjectNewAgent extends React.Component<ParentProps, State> {

	state = {
		email: '', 
		name: '', 
	};

	titleMap = {
		[AgentRoles.investors]: 'Become an Investor',
		[AgentRoles.evaluators]: 'Become an Evaluator',
		[AgentRoles.serviceProviders]: 'Become an Service Agent',
	};

	renderTitle = (role: string) => {
		return this.titleMap[role];
	}

	handleNameChange = (event: any) => {
		this.setState({name: event.target.value});
	}

	handleEmailChange = (event: any) => {
		this.setState({email: event.target.value});
	}

	render() {
		return (
			<div className="container-fluid">
				<Container className="container">
					<div className="row">
						<div className="col-md-12">
							<h1>{this.renderTitle(this.props.role)}</h1>
							<Text placeholder="Name" value={this.state.name} onChange={this.handleNameChange} />
							<Text placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
							<button onClick={() => this.props.submitAgent(this.props.role, this.state)}>Submit new Agent</button>
						</div>
					</div>
				</Container>

			</div>
		);
	}
}

/*
function mapStateToProps(state: PublicSiteStoreState): ParentProps {
	return {
		submitAgent: state.ixoStore.ixo
		role: state
	};
}

export const ProjectNewAgentConnected = (connect(
	mapStateToProps
)(ProjectNewAgent));
*/