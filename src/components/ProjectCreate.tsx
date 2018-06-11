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

const Container = styled.div`
	button {
		margin: 0 10px 10px 10px;
	}
`;
export interface StateProps {
	ixo: any;
	keysafe?: any;
}

export interface State {
	projectCreateJson: string;
	agentCreateJson: string;
}	
export class ProjectCreate extends React.Component<StateProps, State> {

	state = {
		projectCreateJson: testProjectData,
		agentCreateJson: testAgentData,
	};

	handleCreateProject = () => {
		if (!window['ixoCm']) {
			window.alert('Please install IXO Credential Manager first.');
		} else {
			// inpageProvider.requestInfoFromIxoCM((error, response) => {
			// 	// alert(`Dashboard handling received response for INFO response: ${JSON.stringify(response)}, error: ${JSON.stringify(error)}`);
			// });
			let message: string = this.state.projectCreateJson;
			this.props.keysafe.requestSigning(message, (error: any, signature: any) => {
				
				console.log('MESSAGE IS: ', JSON.parse(message));
				console.log('SIGNATURE IS: ', signature);
				// 'http://35.225.6.178:5000/' 'http://localhost:5000/'
				this.props.ixo.project.createProject(JSON.parse(message), signature, 'http://35.225.6.178:5000/').then((res: any) => {
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
			let message: string = this.state.agentCreateJson;
			this.props.keysafe.requestSigning(message, (error: any, signature: any) => {
				
				console.log('MESSAGE IS: ', JSON.parse(message));
				console.log('SIGNATURE IS: ', signature);
				// 'http://35.225.6.178:5000/' 'http://localhost:5000/'
				this.props.ixo.agent.createAgent(JSON.parse(message), signature, 'http://35.225.6.178:5000/').then((res) => {
					console.log('AGENT CREATE STATUS: ', res);
				});
			});
		}
	}

	listAgents = (agentDid?: string): Promise<any> => {
		return new Promise((resolve, reject) => {
			if (!window['ixoCm']) {
				window.alert('Please install IXO Credential Manager first.');
				reject('Please install IXO Credential Manager first.');
			} else {
				let listData: string = '';
				agentDid ? listData = `{"projectDid":"did:ixo:4tUnX7Sx65h1JUNH6swwBe","agentDid":"${agentDid}"}`
						: listData = '{"projectDid":"did:ixo:4tUnX7Sx65h1JUNH6swwBe"}';

				this.props.keysafe.requestSigning(listData, (error, signature) => {
					console.log(signature);
					console.log(JSON.parse(listData));
					this.props.ixo.agent.listAgentsForProject(JSON.parse(listData), signature, 'http://35.225.6.178:5000/').then((res) => {
						console.log(res.result);
						resolve(res.result);
					});
				});
			}
		});
	}

	handleUpdateAgentStatus = () => {
		if (!window['ixoCm']) {
			window.alert('Please install IXO Credential Manager first.');
		} else {
			this.listAgents('did:sov:VtvWwbjASFqyfZKyWZ643z').then((result: any) => {

				let agentData = {
					agentDid: result[0].agentDid,
					status: '1',
					projectDid: result[0].projectDid,
					role: result[0].role
				};

				if (result[0].currentStatus !== null) {
					console.log('STATUSES ARRAY: ', result[0].currentStatus);
					agentData['version'] = result[0].currentStatus.version;
				}

				console.log(agentData);
				this.props.keysafe.requestMessageSigningFromIxoCM(JSON.stringify(agentData), (error, signature) => {
					this.props.ixo.agent.updateAgentStatus(agentData, signature, 'http://35.225.6.178:5000/').then((res) => {
						console.log(res);
					});
				});
			}).catch((reject) => {
				console.log('reject:', reject);
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
				<Container className="container">
					<div className="row">
						<div className="col-md-6">
							<Text value={this.state.projectCreateJson} onChange={this.handleProjectChange} />
							<button onClick={this.handleCreateProject}>CREATE PROJECT</button>
						</div>
						<div className="col-md-6">
							<Text value={this.state.agentCreateJson} onChange={this.handleAgentChange} />
							<button onClick={this.handleCreateAgent}> CREATE AGENT</button>
						</div>
						<br /> <button onClick={() => this.listAgents()}>LIST AGENTS</button>
						<br /> <button onClick={this.handleUpdateAgentStatus}>UPDATE AGENT STATUS</button>
					</div>
				</Container>
			</div>
		); 
	}
}

function mapStateToProps(state: PublicSiteStoreState): StateProps {
	return {
		ixo: state.ixoStore.ixo,
		keysafe: state.keysafeStore.keysafe
	};
}

export const ProjectCreateConnected = (connect(
	mapStateToProps
)(ProjectCreate));