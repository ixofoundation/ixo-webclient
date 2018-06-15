import * as React from 'react';

export interface ParentProps {
	submitClaim: (claimData: object) => void;
}
export const ProjectNewClaim: React.SFC<ParentProps> = (props) => {

	const claimData = { name: 'doggy bag', weight: '2kg', claimId: 432 };
	return (
		<div className="container-fluid">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1>Submit new claim page</h1>
						<button onClick={() => props.submitClaim(claimData)}>Submit new Claim</button>
					</div>
				</div>
			</div>

		</div>
	);
};