import * as React from 'react';
import styled from 'styled-components';
import { AgentRoles } from '../../types/models';
import '../../assets/icons.css';

const StatusContainer = styled.div`
	height: 67px;
	width: 583px;
	color: #333C4E;
	font-family: Roboto;
	font-size: 16px;
	font-weight: 300;
	line-height: 26px;
`;

const Link = styled.a`
	&&{:not([href]) {
		text-decoration: underline;
	}}
	text-decoration: underline;
`;

const IconGreen = styled.span`
	&&{:before {
		color: #4A9F46;
	}}
`;

const IconGrey = styled.span`
	&&{:before {
		color: #B6B6B6;
	}}
`;

export interface ParentProps {
	role: AgentRoles;
	hasKeySafe: boolean;
	hasKYC: boolean;
}

export const RegisterStatus: React.SFC<ParentProps> = (props) => {

	const renderHasKeySafe = () => {
		if (props.hasKeySafe) {
			return (<IconGreen className={'icon-approved'} />);
		} else {
			return (<IconGrey className={'icon-rejectedcross'} />);
		}
	};

	const renderHasKYC = () => {
		if (props.hasKYC) {
			return (<IconGreen className={'icon-approved'} />);
		} else {
			return (<IconGrey className={'icon-rejectedcross'} />);
		}
	};

	const renderKYCPart = () => {
		if (props.role !== AgentRoles.serviceProviders) {
			return (
				<React.Fragment>
					<div>{renderHasKYC()} Successfully complete the <Link>KYC process</Link></div> 
					<div>{renderHasKYC()} Please note that for the beta phase you need to be <Link>invited by ixo</Link></div> 
				</React.Fragment>
			);
		} else {
			return null;
		}
	};

	switch (props.role) {
		case AgentRoles.owners: 
			return (
				<StatusContainer>
					<div>Create your own impact projects on the ixo blockchain.</div> 
					<div>{renderHasKeySafe()} Install the <Link onClick={() => console.log('InstallKeySafe')}>ixo Key Safe</Link></div> 
					{renderKYCPart()}
				</StatusContainer>
			);
		case AgentRoles.serviceProviders: 
			return (
				<StatusContainer>
					<div>Service providers deliver the impact to a project. They are the people on the ground submitting claims, and making the difference e.g. planting trees or delivering books.</div> 
					<div>{renderHasKeySafe()} Install the <Link onClick={() => console.log('InstallKeySafe')}>ixo Key Safe</Link></div> 
				</StatusContainer>
			);
		case AgentRoles.evaluators: 
			return (
				<StatusContainer>
					<div>Evaluators are individuals or entities with knowledge and experience in any given field. Using this experience you determine the validity of the claims submitted on projects.  It is your role to approve the claims submitted on all projects.</div> 
					<div>{renderHasKeySafe()} Install the <Link onClick={() => console.log('InstallKeySafe')}>ixo Key Safe</Link></div> 
					{renderKYCPart()}
				</StatusContainer>
			);
		default:
			return null;
	}
};
