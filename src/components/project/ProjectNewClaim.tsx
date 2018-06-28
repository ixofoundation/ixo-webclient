import * as React from 'react';
import { LayoutWrapperClaims } from '../common/LayoutWrapperClaims';
import { WidgetWrapperClaims } from '../common/WidgetWrapperClaims';
import DynamicForm from '../form/DynamicForm';
import { decode as base64Decode } from 'base-64';
import { Data } from '../../types/models/project';
import styled from 'styled-components';
import { FormStyles } from '../../types/models';
import { Spinner } from '../common/Spinner';

const FormContainer = styled.div`
	max-width: 640px;
	width: 100%;
	margin: 0 auto;
`;

const Divider = styled.div`
	height: 2px;
	background: ${props => props.theme.bg.lightBlue};
	width: 36%;
	position: absolute;
	left: 15px;
`;

const DividerShadow = styled.div`
	height: 1px;
	background: ${props => props.theme.bg.lightGrey};
	width: 100%;
`;

const FormProgressBar = styled.div`
	background: ${props => props.theme.bg.green};
	height: 6px;
	width: 100%;
	border-radius: 4px 4px 0px 0px;
`;

export interface ParentProps {
	submitClaim: (claimData: object) => void;
	ixo?: any;
	projectData: Data;
}
export class ProjectNewClaim extends React.Component<ParentProps> {
	state = {
		fetchedFile: null
	};

	fetchFormFile = (claimFormKey: string, pdsURL: string) => {
		this.props.ixo.project.fetchPublic(claimFormKey, pdsURL).then((res: any) => {
			console.log('Fetched: ', res);
			let fileContents = base64Decode(res.data);
			this.setState({ fetchedFile: fileContents });
		});
	}

	componentDidMount() {
		this.fetchFormFile(this.props.projectData.templates.claim.form, this.props.projectData.serviceEndpoint);
	}

	handleSubmit = (claimData: any) => {
		// upload all the images and change the value to the returned hash of the image
		let formDef = JSON.parse(this.state.fetchedFile);
		let pdsUrl = this.props.projectData.serviceEndpoint;
		let promises = [];
		formDef.fields.forEach(field => {
			if (field.type === 'image') {
				if (claimData[field.name] && claimData[field.name].length > 0) {
					promises.push(
						this.props.ixo.project.createPublic(claimData[field.name], pdsUrl).then((res: any) => {
							claimData[field.name] = res.result;
							console.log(field.name + ': ' + claimData[field.name]);
							return res.result;
						})
					);
				}
			}
		});
		Promise.all(promises).then((results) => {
			this.props.submitClaim(claimData);
		});
	}

	render() {
		const claimParsed = JSON.parse(this.state.fetchedFile);
		if (claimParsed) {
			return (
				<LayoutWrapperClaims>
					<FormContainer className="container">
						<FormProgressBar />
						<div className="row">
							<div className="col-md-12">
								<WidgetWrapperClaims>
									<h3>Submit a Claim</h3>
									<DividerShadow>
									<Divider />
									</DividerShadow>
									<DynamicForm 
										formStyle={FormStyles.standard}
										projectDID={this.props.projectData.projectDid} 
										formSchema={claimParsed.fields} 
										handleSubmit={(claimData) => this.props.submitClaim(claimData)}
										submitText={'Submit Claim'}
									/>
								</WidgetWrapperClaims>
							</div>
						</div>
					</FormContainer>
				</LayoutWrapperClaims>
			);
		} else {
			return <Spinner info="App: Loading Claim " />;
		}
	}
}