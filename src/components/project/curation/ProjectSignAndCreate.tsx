import * as React from 'react';
import { PublicSiteStoreState } from '../../../redux/public_site_reducer';
import { connect } from 'react-redux';
import { decode as base64Decode } from 'base-64';
import styled from 'styled-components';
import { successToast, errorToast } from '../../helpers/Toast';
import { ErrorTypes } from '../../../types/models';
import queryString from 'query-string';

const Container = styled.div`
	button {
		margin: 0 10px 10px 10px;
	}
`;
export interface StateProps {
	ixo: any;
	keysafe?: any;
}

export interface DispatchProps {
}

export interface State {
	status: string;
}	

export interface ParentProps {    
	location: any;   
	match: any;
}

export interface Props extends ParentProps, StateProps, DispatchProps {}

export class ProjectSignAndCreate extends React.Component<Props, State> {

	state = {
		status: ''
	};

	fetchProjectFile = (key: string, pdsURL: string) => {
		this.props.ixo.project.fetchPublic(key, pdsURL).then((res: any) => {
			console.log('Fetched: ', res);
			let fileContents = base64Decode(res.data);
			return fileContents;
		}).then( (projectJson) => {
			this.props.keysafe.requestSigning(projectJson, (error: any, signature: any) => {
				
				this.props.ixo.project.createProject(JSON.parse(projectJson), signature, pdsURL).then((res: any) => {
					if (res.error) {
						errorToast(res.error.message, ErrorTypes.message);
					} else {
						this.setState({status: 'Project created successfully'});
						successToast('Project created successfully');
					}
				});
			});
		});
	}

	componentDidMount() {
		if (this.props.keysafe === null) {
			errorToast('Please install IXO Credential Manager first.');
			this.setState({status: 'Please install IXO Credential Manager first.'});
		} else {
			this.handleGetProjectData();
		}
	}

	handleGetProjectData = () => {
		let params = queryString.parse(this.props.location.search);
		const key = decodeURIComponent(params.key);
		const pdsURL = decodeURIComponent(params.url);
		this.fetchProjectFile(key, pdsURL);
	}

	render() {
		return (
			<div>
				<Container className="container">
					<div className="row">
						<div className="col-md-12">
							<br />
							{this.state.status}
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

export const ProjectSignAndCreateConnected = (connect(
	mapStateToProps
)(ProjectSignAndCreate));