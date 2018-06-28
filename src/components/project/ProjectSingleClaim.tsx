import * as React from 'react';
import { LayoutWrapperClaims } from '../common/LayoutWrapperClaims';
import { WidgetWrapperClaims } from '../common/WidgetWrapperClaims';
import { ClaimStatus } from '../common/ClaimStatus';
import { AgentRoles } from '../../types/models';
import styled from 'styled-components';

const Container = styled.div`
	justify-content: center;
	display: flex;
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

const ButtonContainer = styled.div`
	padding: 22px 34px 22px 34px;
	background: ${props => props.theme.grey};
	padding: 10px 20px;
	box-shadow: 0 2px 2px 0 rgba(0,0,0,0.18);
`;

const RejectButton = styled.div`
	text-transform: uppercase;
	border-radius:3px;
	text-align: center;
	background: ${props => props.theme.bg.gradientButtonRed};
	font-family: ${props => props.theme.fontRobotoCondensed};
	font-size: 15px;
	padding:10px 20px 10px;
`;

const ApproveButton = styled.div`
	text-transform: uppercase;
	border-radius:3px;
	text-align: center;
	background: ${props => props.theme.bg.gradientButtonGreen};
	font-family: ${props => props.theme.fontRobotoCondensed};
	font-size: 15px;
	padding:10px 20px 10px;
`;

const ButtonIcon = styled.i`
	font-size: 13px;
	padding-left: 10px;
`;

export interface ParentProps {
	match: any;
	claims: any[];
	handleListClaims: () => any;
	handleEvaluateClaim: (status: object, claimId: string) => void;
	hasCapability: (role: AgentRoles) => boolean;
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
			return <ClaimStatus message={'Claim is pending'} icon={'icon-pending'} />;
		} else {
			switch (claimStatus.status) {				
				case '1':
				return <ClaimStatus message={'Claim is approved'} icon={'icon-approved'} />;
				case '2':
				return <ClaimStatus message={'Claim is rejected'} icon={'icon-rejected'} />;
				case '0':
				default:
				return <ClaimStatus message={'Claim is pending'} icon={'icon-pending'} />;
			}
		}
	};

	const handleRenderButtons = (claim: any) => {
		return (
			<ButtonContainer>
				<div className="row">
					<div className="col-md-6">
						<RejectButton onClick={() => handleEvaluateClaim('2', claim.evaluations, claim.txHash)}>Reject Claim<ButtonIcon className="icon-close" /></RejectButton>
					</div>
					<div className="col-md-6">
						<ApproveButton onClick={() => handleEvaluateClaim('1', claim.evaluations, claim.txHash)}>Approve Claim<ButtonIcon className="icon-approvetick" /></ApproveButton>
					</div>
				</div>
			</ButtonContainer>
		);
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
				<LayoutWrapperClaims>
					<Container className="row">
						<div className="col-md-4">
							<WidgetWrapperClaims>
								<h3>{claim.name}</h3>
								<DividerShadow>
									<Divider />
								</DividerShadow>
								<div style={{ padding: '20px' }}>
									<p>{claim._id}</p>
									<p>{handleRenderStatus(claim.evaluations)}</p>
								</div>
							</WidgetWrapperClaims>
							{handleRenderButtons(claim)}
						</div>
					</Container>
				</LayoutWrapperClaims>
			);
		}
	};

	return handleRenderClaim();
};