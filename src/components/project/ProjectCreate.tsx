import * as React from 'react';
import { ImageLoader } from '../common/ImageLoader';
import { PublicSiteStoreState } from '../../redux/public_site_reducer';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { decode as base64Decode } from 'base-64';
import { testProjectData } from '../../lib/commonData';
import { DarkButton, buttonTypes } from '../common/Buttons';
import { FileLoader } from '../common/FileLoader';

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
	imageKey: string;
	claimSchema: string;
	claimSchemaKey: string;
	claimForm: string;
	claimFormKey: string;
	projectJson: string;
	project: Object;

	fetchedImage: string;
	fetchedFile: string;
}	

export class ProjectCreate extends React.Component<StateProps, State> {

	state = {
			pdsURL: 'http://104.155.142.57:5000/', // 'http://192.168.1.125:5000/', // 'http://35.225.6.178:5000/',
			croppedImg: null,
			imageKey: null,
			claimSchema: '',
			claimSchemaKey: null,
			claimForm: '',
			claimFormKey: null,
			projectJson: testProjectData,
			project: JSON.parse(testProjectData),

			fetchedImage: null,
			fetchedFile: '',
			};

	handleCreateProject = () => {
		if (this.props.keysafe === null) {
			window.alert('Please install IXO Credential Manager first.');
		} else {
			// inpageProvider.requestInfoFromIxoCM((error, response) => {
			// 	// alert(`Dashboard handling received response for INFO response: ${JSON.stringify(response)}, error: ${JSON.stringify(error)}`);
			// });
			let message: string = this.state.projectJson;
			this.props.keysafe.requestSigning(message, (error: any, signature: any) => {
				
				console.log('MESSAGE IS: ', JSON.parse(message));
				console.log('SIGNATURE IS: ', signature);
				// 'http://35.225.6.178:5000/' 'http://localhost:5000/'
				this.props.ixo.project.createProject(JSON.parse(message), signature, this.state.pdsURL).then((res: any) => {
					console.log('PROJECT CREATE STATUS: ', res);
				});
			});
		}
	}

	handlePdsUrlChange = (event: any) => {
		this.setState({pdsURL: event.target.value});
	}

	handleProjectChange = (event: any) => {
		this.setState({project: JSON.parse(event.target.value), projectJson: event.target.value});
	}

	handleImage = (base64Image) => {
		this.setState({croppedImg: base64Image });
	}
	
	uploadImage = (event) => {
		this.props.ixo.project.createPublic(this.state.croppedImg, this.state.pdsURL).then((res: any) => {
			console.log('Uploaded: ', res);
			let newProject = this.state.project;
			newProject.imageLink = res.result;
			this.setState({project: newProject, projectJson: JSON.stringify(newProject)});
		});
	}

	fetchImage = (event) => {
		this.props.ixo.project.fetchPublic(this.state.imageKey, this.state.pdsURL).then((res: any) => {
			console.log('Fetched: ', res);
			let imageSrc = 'data:' + res.contentType + ';base64,' + res.data;
			this.setState({fetchedImage: imageSrc});
		});
	}

	handleFileSelected = (type, base64File) => {
		if (type === 'schema') {
			this.setState({claimSchema: base64File });
		}
		if (type === 'form') {
			this.setState({claimForm: base64File });
		}
	}
	
	uploadFile = (type) => {
		let fileToUpload: string;
		if (type === 'schema') {
			fileToUpload = this.state.claimSchema;
		}
		if (type === 'form') {
			fileToUpload = this.state.claimForm;
		}

		this.props.ixo.project.createPublic(fileToUpload, this.state.pdsURL).then((res: any) => {
			console.log('Uploaded: ', res);
			let newProject = this.state.project;
			if (type === 'schema') {
				newProject.templates.claim.schema = res.result;
			}
			if (type === 'form') {
				newProject.templates.claim.form = res.result;
			}
			this.setState({project: newProject, projectJson: JSON.stringify(newProject)});
		});
	}

	fetchFile = (event) => {
		this.props.ixo.project.fetchPublic(this.state.claimSchemaKey, this.state.pdsURL).then((res: any) => {
			console.log('Fetched: ', res);
			let fileContents = base64Decode(res.data);
			this.setState({fetchedFile: fileContents});
		});
	}

	render() {
		return (
			<div>
				<Container className="container">
					<div className="row">
						<div className="col-md-12">
							<Text placeholder="Project datastore url example: http://104.155.142.57:5000/" value={this.state.pdsURL} onChange={this.handlePdsUrlChange} />
							<ImageLoader placeholder="Choose project image file" imageWidth={960} aspect={16 / 9} imageCallback={this.handleImage}/>
							<img src={this.state.croppedImg} />
							<DarkButton type={buttonTypes.PRIMARY} value="Upload image" onClick={this.uploadImage} />
							<FileLoader placeholder="Choose claim schema file" acceptType="application/json" selectedCallback={(dataUrl) => this.handleFileSelected('schema', dataUrl)}/>
							<DarkButton type={buttonTypes.PRIMARY} value="Upload file" onClick={() => this.uploadFile('schema')} />
							<Text value={this.state.project.templates.claim.schema} />
							<FileLoader placeholder="Choose claim form file" acceptType="application/json" selectedCallback={(dataUrl) => this.handleFileSelected('form', dataUrl)}/>
							<DarkButton type={buttonTypes.PRIMARY} value="Upload file" onClick={() => this.uploadFile('form')} />
							<Text value={this.state.project.templates.claim.form} />

							<TextArea value={this.state.projectJson} onChange={this.handleProjectChange} />
							<button onClick={this.handleCreateProject}>CREATE PROJECT</button>
							<br /><br />
							<DarkButton type={buttonTypes.PRIMARY} value="Fetch image" onClick={this.fetchImage} />
							<img src={this.state.fetchedImage} />
							<DarkButton type={buttonTypes.PRIMARY} value="Fetch file" onClick={this.fetchFile} />
							<TextArea value={this.state.fetchedFile} />
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