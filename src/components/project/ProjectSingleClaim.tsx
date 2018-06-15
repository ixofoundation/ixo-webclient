import * as React from 'react';
import styled from 'styled-components';

const Claim = styled.div`
	background: grey;
	padding: 10px;
	display: inline-block;
	color: white;
	margin: 10px;
`;

export interface ParentProps {
	match: any;
	claims: any[];
	handleListClaims: () => any;
	handleEvaluateClaim: (status: object, claimId: string) => void;

}
export const ProjectSingleClaim: React.SFC<ParentProps> = (props) => {
	const claimId = props.match.params.claimID;

	const handleEvaluateClaim = (status: string, statusObj: any, id: string) => {
		if (statusObj.length === 0) {
			props.handleEvaluateClaim({status: status}, id);
		} else {
			props.handleEvaluateClaim({status, version: statusObj.version}, id);
		}
	};

	const handleRenderClaim = () => {

		if (props.claims === null) {
			props.handleListClaims();
			return <p>Loading claim...</p>;
		} else {
			const claim = props.claims.filter((theClaim) => theClaim._id === claimId)[0];
			if (!claim) {
				return <p>No claim found with that ID</p>;
			}
			return (
				<Claim>
					<h3>{claim.name}</h3>
					<p>{claim._id}</p>
					<button onClick={() => handleEvaluateClaim('1', claim.evaluations, claim._id)}>Approve</button>
					<button onClick={() => handleEvaluateClaim('2', claim.evaluations, claim._id)}>Reject</button>
				</Claim>
			);
		}
	};

	return handleRenderClaim();
};