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
			debugger;
			this.setState({ fetchedFile: fileContents });
		});
	}

	componentDidMount() {
		this.fetchFormFile(this.props.projectData.templates.claim.form, this.props.projectData.serviceEndpoint);
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
								<DynamicForm formSchema={claimParsed.fields} handleSubmit={(claimData) => this.props.submitClaim(claimData)} />
							</div>
						</div>
					</div>
				</LayoutWrapper>
			);
		}
		return null;
	}
}