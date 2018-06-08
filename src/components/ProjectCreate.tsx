import * as React from 'react';
import { PublicSiteStoreState } from '../redux/public_site_reducer';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { testProjectData, testAgentData } from '../lib/commonData';

const Text = styled.textarea`
	margin: 20px 0;
	display: block;
	width: 100%;
	height: 300px;
`;
export interface StateProps {
	ixo?: any;
}

export interface State {
	projectCreateJson: string;
	agentCreateJson: string;
	inpageProvider: any;
}	
export class ProjectCreate extends React.Component<StateProps, State> {

	state = {
		projectCreateJson: testProjectData,
		agentCreateJson: testAgentData,
		inpageProvider: null
	};

	componentDidMount() {
		// this.props.onIxoInit();
		
		const IxoInpageProvider = window['ixoCm'];
		this.setState({inpageProvider: new IxoInpageProvider()});
	}

	handleCreateProject = () => {
		if (!window['ixoCm']) {
			window.alert('Please install IXO Credential Manager first.');
		} else {
			// inpageProvider.requestInfoFromIxoCM((error, response) => {
			// 	// alert(`Dashboard handling received response for INFO response: ${JSON.stringify(response)}, error: ${JSON.stringify(error)}`);
			// });
			let message = this.state.projectCreateJson;
			this.state.inpageProvider.requestMessageSigningFromIxoCM(message, (error, signature) => {
				
				console.log('MESSAGE IS: ', JSON.parse(message));
				console.log('SIGNATURE IS: ', signature);
				// 'http://35.225.6.178:5000/' 'http://localhost:5000/'
				this.props.ixo.project.createProject(JSON.parse(message), signature, 'http://35.225.6.178:5000/').then((res) => {
					console.log('PROJECT CREATE STATUS: ', res);
				});
			});
		}
	}

	handleCreateAgent = () => {
		if (!window['ixoCm']) {
			window.alert('Please install IXO Credential Manager first.');
		} else {
			// inpageProvider.requestInfoFromIxoCM((error, response) => {
			// 	// alert(`Dashboard handling received response for INFO response: ${JSON.stringify(response)}, error: ${JSON.stringify(error)}`);
			// });
			let message = this.state.agentCreateJson;
			this.state.inpageProvider.requestMessageSigningFromIxoCM(message, (error, signature) => {
				
				console.log('MESSAGE IS: ', JSON.parse(message));
				console.log('SIGNATURE IS: ', signature);
				// 'http://35.225.6.178:5000/' 'http://localhost:5000/'
				this.props.ixo.agent.createAgent(JSON.parse(message), signature, 'http://35.225.6.178:5000/').then((res) => {
					console.log('AGENT CREATE STATUS: ', res);
				});
			});
		}
	}

	listAgents() {
		return new Promise((resolve) => {
			const listData = '{"projectDid":"did:ixo:7ptsZma2sxjSLb3JZ7R4uW"}';
			this.state.inpageProvider.requestMessageSigningFromIxoCM(listData, (error, signature) => {
				console.log(signature);
				console.log(JSON.parse(listData));
				this.props.ixo.agent.listAgentsForProject(JSON.parse(listData), signature, 'http://35.225.6.178:5000/').then((res) => {
					resolve(res);
				});
			});
		});
	}

	updateAgentStatus = () => {
		
		// this.listAgents.then((result) => {
		// 	console.log(result);
		// });
		// console.log('PROMISE RETURNED: ', theAgent);
	}

	handleProjectChange = (event: any) => {
		this.setState({projectCreateJson: event.target.value});
	}

	handleAgentChange = (event: any) => {
		this.setState({agentCreateJson: event.target.value});
	}

	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<Text value={this.state.projectCreateJson} onChange={this.handleProjectChange} />
							<button onClick={this.handleCreateProject}>SIGN MESSAGE AND CREATE PROJECT</button>
						</div>
						<div className="col-md-6">
							<Text value={this.state.agentCreateJson} onChange={this.handleAgentChange} />
							<button onClick={this.handleCreateAgent}>SIGN MESSAGE AND CREATE AGENT</button>
						</div>
						<button onClick={this.listAgents}>List agents</button>
					</div>
				</div>
			</div>
		); 
	}
}

function mapStateToProps(state: PublicSiteStoreState): StateProps {
	return {
		ixo: state.ixoStore.ixo,
	};
}

export const ProjectCreateConnected = (connect(
	mapStateToProps
)(ProjectCreate));