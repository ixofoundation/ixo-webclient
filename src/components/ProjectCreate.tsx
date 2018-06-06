import * as React from 'react';
import { PublicSiteStoreState } from '../redux/public_site_reducer';
import { connect } from 'react-redux';
import { initIxo } from '../redux/ixo/ixo_action_creators';
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

export interface DispatchProps {
	onIxoInit: () => void;
}

export interface Props extends StateProps, DispatchProps {
}

export interface State {
	projectCreateJson: string;
	agentCreateJson: string;
	inpageProvider: any;
}	
export class ProjectCreate extends React.Component<Props, State> {

	state = {
		projectCreateJson: testProjectData,
		agentCreateJson: testAgentData,
		inpageProvider: null
	};

	componentDidMount() {
		this.props.onIxoInit();
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

function mapDispatchToProps(dispatch: any): DispatchProps {
	return {
		onIxoInit: () => {
			dispatch(initIxo());
		}
	};
}

export const ProjectCreateConnected = (connect(
	mapStateToProps,
	mapDispatchToProps
)(ProjectCreate) as any);