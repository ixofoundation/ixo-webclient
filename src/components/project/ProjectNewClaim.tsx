import * as React from 'react';
import { LayoutWrapper } from '../common/LayoutWrapper';
import DynamicForm from '../form/DynamicForm';
import { decode as base64Decode } from 'base-64';
import { Data } from '../../types/models/project';

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
				<LayoutWrapper>
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<h1>Submit new claim page</h1>
								<DynamicForm formSchema={claimParsed.fields} handleSubmit={(claimData) => this.handleSubmit(claimData)} />
							</div>
						</div>
					</div>
				</LayoutWrapper>
			);
		}
		return null;
	}
}