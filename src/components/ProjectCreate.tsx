import * as React from 'react';
import { PublicSiteStoreState } from '../redux/public_site_reducer';
import { connect } from 'react-redux';
import { initIxo } from '../redux/ixo/ixo_action_creators';
import styled from 'styled-components';
import { testProjectData } from '../lib/commonData';

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
	json: string;
}	
export class ProjectCreate extends React.Component<Props, State> {

	state = {json: testProjectData};

	componentDidMount() {
		this.props.onIxoInit();
	}

	signMessage = () => {
		if (!window['ixoCm']) {
			window.alert('Please install IXO Credential Manager first.');
		} else {
			const IxoInpageProvider = window['ixoCm'];
			const inpageProvider = new IxoInpageProvider();
			// inpageProvider.requestInfoFromIxoCM((error, response) => {
			// 	// alert(`Dashboard handling received response for INFO response: ${JSON.stringify(response)}, error: ${JSON.stringify(error)}`);
			// });
			let message = this.state.json;
			inpageProvider.requestMessageSigningFromIxoCM(message, (error, signature) => {
				signature['signature'] = signature.signatureValue;
				delete signature.signatureValue;
				signature.creator = 'did:sov:' + signature.creator;
				console.log('SIGNATURE IS: ', signature);
				this.props.ixo.project.createProject(JSON.parse(message), signature, 'http://35.225.6.178:5000/').then((res) => {
					console.log('PROJECT CREATE STATUS: ', res);
				});
			});
		}
	}

	handleChange = (event: any) => {
		this.setState({json: event.target.value});
	}

	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
						<Text value={this.state.json} onChange={this.handleChange} />
						<button onClick={this.signMessage}>SIGN MESSAGE AND CREATE PROJECT</button>
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