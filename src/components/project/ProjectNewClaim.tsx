import * as React from 'react';
import { ProjectDetailWrapper } from './ProjectDetailWrapper';
import DynamicForm from '../form/DynamicForm';
import { claimJson } from '../../lib/commonData';

export interface ParentProps {
	submitClaim: (claimData: object) => void;
}
export const ProjectNewClaim: React.SFC<ParentProps> = (props) => {

	const claimParsed = JSON.parse(claimJson);
	return (
		<ProjectDetailWrapper>
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1>Submit new claim page</h1>
						<DynamicForm formSchema={claimParsed.fields} handleSubmit={(claimData) => props.submitClaim(claimData)} />
					</div>
				</div>
			</div>

		</ProjectDetailWrapper>
	);
};