import * as React from 'react';
import { ImageLoader, imageQuality } from '../../common/ImageLoader';
import { PublicSiteStoreState } from '../../../redux/public_site_reducer';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { decode as base64Decode, encode as base64Encode } from 'base-64';
import { blankProjectData } from '../../../lib/commonData';
import { Button, ButtonTypes } from '../../common/Buttons';
import { FileLoader } from '../../common/FileLoader';
import { successToast, errorToast } from '../../helpers/Toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Text = styled.input`
	margin: 20px 0;
	display: block;
	width: 100%;
`;

const TextArea = styled.textarea`
	margin: 20px 0;
	display: block;
	width: 100%;
	height: 150px;
`;

const BigTextArea = TextArea.extend`
	height: 150px;
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
	croppedImg: any;
	imageKey: string;
	claimSchema: string;
	claimSchemaKey: string;
	claimForm: string;
	claimFormKey: string;
	projectJson: string;
	project: Object;
	projectEmailLink: string;
	imageLogoLink: string;
	founderLogoLink: string;

	fetchedImage: string;
	fetchedFile: string;
}	

export class ProjectCreateUploadPublicDocs extends React.Component<StateProps, State> {

	state = {
			croppedImg: null,
			imageKey: null,
			claimSchema: '',
			claimSchemaKey: null,
			claimForm: '',
			claimFormKey: null,
			projectJson: blankProjectData,
			project: JSON.parse(blankProjectData),
			projectEmailLink: null,
			imageLogoLink: null,
			founderLogoLink: null,
			fetchedImage: null,
			fetchedFile: '',
	};

	handleCreateProject = () => {
		if (this.props.keysafe === null) {
		errorToast('Please install IXO Credential Manager first.');
		} else {
			if (this.state.croppedImg && this.state.claimSchema.length > 0 && this.state.claimForm.length > 0) {
				let promises = [];
				promises.push(
					this.props.ixo.project.createPublic(this.state.croppedImg, this.state.project.serviceEndpoint).then((res: any) => {
						successToast('Uploaded image successfully');
						let newProject = this.state.project;
						newProject.imageLink = res.result;
						this.setState({project: newProject, projectJson: JSON.stringify(newProject)});
						return res.result;
					})
				);
				promises.push(
					this.props.ixo.project.createPublic(this.state.claimSchema, this.state.project.serviceEndpoint).then((res: any) => {
						successToast('Uploaded Schema successfully');
						let newProject = this.state.project;
						newProject.templates.claim.schema = res.result;
						this.setState({project: newProject, projectJson: JSON.stringify(newProject)});
						return res.result;
					})
				);
				promises.push(
					this.props.ixo.project.createPublic(this.state.claimForm, this.state.project.serviceEndpoint).then((res: any) => {
						successToast('Uploaded Form JSON successfully');
						let newProject = this.state.project;
						newProject.templates.claim.form = res.result;
						this.setState({project: newProject, projectJson: JSON.stringify(newProject)});
						return res.result;
					})
				);
				Promise.all(promises).then((results) => {
					let projectObj: string = this.state.projectJson;
					let projectDataURL = 'data:application/json;base64,' + base64Encode(projectObj);
					this.props.ixo.project.createPublic(projectDataURL, this.state.project.serviceEndpoint).then((res: any) => {
						successToast('Uploaded projectJson successfully');
						this.setState({projectEmailLink: this.compileEmailLink(res.result)});
						return res.result;
					});
				});
			}
		}
	}

	compileEmailLink(projectHash: string) {
		return window.location.origin + '/upload-project-create?key=' + projectHash + '&url=' + encodeURIComponent(this.state.project.serviceEndpoint);
	}

	handlePdsUrlChange = (event: any) => {
		let newProject = this.state.project;
		newProject.serviceEndpoint = event.target.value;
		this.setState({project: newProject, projectJson: JSON.stringify(newProject)});
	}

	handleImage = (base64Image) => {
		this.setState({croppedImg: base64Image });
	}
	
	uploadImage = (event) => {
		console.log(this.state.croppedImg);
		this.props.ixo.project.createPublic(this.state.croppedImg, this.state.project.serviceEndpoint).then((res: any) => {
			console.log('Uploaded: ', res);
			let newProject = this.state.project;
			newProject.imageLink = res.result;
			this.setState({project: newProject, projectJson: JSON.stringify(newProject)});
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

		this.props.ixo.project.createPublic(fileToUpload, this.state.project.serviceEndpoint).then((res: any) => {
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
		this.props.ixo.project.fetchPublic(this.state.claimSchemaKey, this.state.project.serviceEndpoint).then((res: any) => {
			console.log('Fetched: ', res);
			let fileContents = base64Decode(res.data);
			this.setState({fetchedFile: fileContents});
		});
	}

	fetchFormFile = (event) => {
		this.props.ixo.project.fetchPublic(this.state.claimFormKey, this.state.project.serviceEndpoint).then((res: any) => {
			console.log('Fetched: ', res);
			let fileContents = base64Decode(res.data);
			this.setState({fetchedFile: fileContents});
		});
	}

	updateProjectJSON = (event) => {
		let project = JSON.parse(event.target.value);
		let imageLogoLink = project.imageLink;
		project.imageLink = '';
		let founderLogoLink = project.founder.logoLink;
		project.founder.logoLink = '';
		this.setState({projectJson: JSON.stringify(project), project: project, imageLogoLink: imageLogoLink, founderLogoLink: founderLogoLink});
	}

	render() {
		return (
			<div>
				<Container className="container">
					<div className="row">
						<div className="col-md-12">
							<br />
							<Text placeholder="Project datastore url" value={this.state.project.serviceEndpoint}/>
							<div>Image Link: <a href={this.state.imageLogoLink}>{this.state.imageLogoLink}</a></div>
							<div>Founder Logo Link: <a href={this.state.founderLogoLink}>{this.state.founderLogoLink}</a></div>
							<BigTextArea value={this.state.projectJson} onChange={this.updateProjectJSON}/>
							<ImageLoader quality={imageQuality.medium} placeholder="Choose project image file" imageWidth={960} aspect={16 / 9} imageCallback={this.handleImage}/>
							<br />
							<FileLoader placeholder="Choose claim schema file" acceptType="application/json" selectedCallback={(dataUrl) => this.handleFileSelected('schema', dataUrl)}/>
							<br />
							<FileLoader placeholder="Choose claim form file" acceptType="application/json" selectedCallback={(dataUrl) => this.handleFileSelected('form', dataUrl)}/>
							<br />
							<Button type={ButtonTypes.gradient} onClick={this.handleCreateProject}>UPLOAD PROJECT</Button>
							<br />
							<Text value={this.state.projectEmailLink} />
							<CopyToClipboard text={this.state.projectEmailLink}>
								<span>Copy</span>
							</CopyToClipboard>

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

export const ProjectCreateUploadPublicDocsConnected = (connect(
	mapStateToProps
)(ProjectCreateUploadPublicDocs));
