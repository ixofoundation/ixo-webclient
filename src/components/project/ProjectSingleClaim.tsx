import * as React from 'react';
import { ProjectDetailWrapper } from './ProjectDetailWrapper';
import { ProjectWidget } from './ProjectWidget';

export interface ParentProps {
	match: any;
	claims: any[];
	handleListClaims: () => any;
	handleEvaluateClaim: (status: object, claimId: string) => void;

}
export const ProjectSingleClaim: React.SFC<ParentProps> = (props) => {
	const claimId = props.match.params.claimID;

	const handleEvaluateClaim = (status: string, statusObj: any, id: string) => {
		if (statusObj === null) {
			props.handleEvaluateClaim({status: status}, id);
		} else {
			props.handleEvaluateClaim({status, version: statusObj.version}, id);
		}
	};

	const handleRenderStatus = (claimStatus) => {
		if (claimStatus === null) {
			return 'Pending';
		} else {
			switch (claimStatus.status) {				
				case '1':
				return 'Approved';
				case '2':
				return 'Rejected';
				case '0':
				default:
				return 'Pending';
			}
		}
	};

	const handleRenderClaim = () => {

		if (props.claims === null) {
			props.handleListClaims();
			return <p>Loading claim...</p>;
		} else {
			const claim = props.claims.filter((theClaim) => theClaim.txHash === claimId)[0];
			console.log(claim);
			if (!claim) {
				return <p>No claim found with that ID</p>;
			}
			return (
				<ProjectDetailWrapper>
					<div className="row">
						<div className="col-md-12">
							<ProjectWidget>
								<h3>{claim.name}</h3>
								<p>{claim._id}</p>
								<p>{handleRenderStatus(claim.evaluations)}</p>
								<button onClick={() => handleEvaluateClaim('1', claim.evaluations, claim.txHash)}>Approve</button>
								<button onClick={() => handleEvaluateClaim('2', claim.evaluations, claim.txHash)}>Reject</button>
							</ProjectWidget>
						</div>
					</div>
				</ProjectDetailWrapper>
			);
		}
	};

	return handleRenderClaim();
};