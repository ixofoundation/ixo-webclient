import * as React from 'react';
import { ImageLoader } from '../common/ImageLoader';
import { PublicSiteStoreState } from '../../redux/public_site_reducer';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { testProjectData, testClaimSchema, testClaimForm } from '../../lib/commonData';

const Text = styled.input`
	margin: 20px 0;
	display: block;
	width: 100%;
`;

const TextArea = styled.textarea`
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
	pdsURL: string;
	croppedImg: any;
	projectClaimSchemaJson: string;
	projectClaimFormJson: string;
	projectCreateJson: string;
}	

export class ProjectCreate extends React.Component<StateProps, State> {

	state = {
			pdsURL: 'http://35.225.6.178:5000',
			croppedImg: null,
			projectClaimSchemaJson: testClaimSchema,
			projectClaimFormJson: testClaimForm,
			projectCreateJson: testProjectData,
	};

	handleCreateProject = () => {
		if (this.props.keysafe === null) {
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
				this.props.ixo.project.createProject(JSON.parse(message), signature, 'http://104.155.142.57:5000/').then((res: any) => {
					console.log('PROJECT CREATE STATUS: ', res);
				});
			});
		}
	}

	handlePdsUrlChange = (event: any) => {
		this.setState({pdsURL: event.target.value});
	}

	handleProjectClaimSchemaChange = (event: any) => {
		this.setState({projectClaimSchemaJson: event.target.value});
	}

	handleProjectClaimFormChange = (event: any) => {
		this.setState({projectClaimFormJson: event.target.value});
	}

	handleProjectChange = (event: any) => {
		this.setState({projectCreateJson: event.target.value});
	}

	handleImage = (base64Image) => {
		this.setState({croppedImg: base64Image });
	}
	
	render() {
		return (
			<div>
				<Container className="container">
					<div className="row">
						<div className="col-md-12">
							<Text placeholder="PDS Url: http://" value={this.state.pdsURL} onChange={this.handlePdsUrlChange} />
							<ImageLoader placeholder="Choose file" imageWidth={960} aspect={16 / 9} imageCallback={this.handleImage}/>
							<img src={this.state.croppedImg} />
							<TextArea value={this.state.projectClaimSchemaJson} onChange={this.handleProjectClaimSchemaChange} />
							<TextArea value={this.state.projectClaimFormJson} onChange={this.handleProjectClaimFormChange} />
							<TextArea value={this.state.projectCreateJson} onChange={this.handleProjectChange} />
							<button onClick={this.handleCreateProject}>CREATE PROJECT</button>
						</div>
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