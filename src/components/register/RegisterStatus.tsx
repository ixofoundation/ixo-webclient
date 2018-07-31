import * as React from 'react';
import styled from 'styled-components';
import { AgentRoles } from '../../types/models';
import '../../assets/icons.css';

const StatusContainer = styled.div`
	font-family: Roboto;
	font-size: 16px;
	font-weight: 300;
	line-height: 1.1;
`;

const Link = styled.a`
	&&{:not([href]) {
		text-decoration: underline;
	}}
	text-decoration: underline;
`;

const Icon = styled.i`
	font-size: 20px;
	top: 6px;
	left: 0;
	position: absolute;
    margin-right: 15px;
`;

const GreenI = Icon.extend`
	&&{:before {
		color: #4A9F46;
	}}
`;

const GreyI = Icon.extend`
	&&{:before {
		color: #B6B6B6;
	}}
`;

const CheckItem = styled.p`
	line-height: 2;
	margin-bottom: 0;
	padding-left: 35px;
	position: relative;
`;

export interface ParentProps {
	role: AgentRoles;
	hasKeySafe?: boolean;
	hasKYC?: boolean; 
}

export const RegisterStatus: React.SFC<ParentProps> = (props) => {

	const isQualified = (condition) => {
		if (condition) {
			return <GreenI className={'icon-approved'} />;
		} else {
			return <GreyI className={'icon-rejectedcross'} />;
		}
	};

	const renderKYCPart = () => {
		if (props.role !== AgentRoles.serviceProviders) {
			return (
				<React.Fragment>
					<CheckItem>{isQualified(props.hasKYC)} Please note that for the beta phase you need to be <Link>invited by ixo</Link></CheckItem> 
					<CheckItem>{isQualified(props.hasKYC)} Successfully complete the <Link>KYC process</Link></CheckItem> 
				</React.Fragment>
			);
		} else {
			return null;
		}
	};

	return (
		<StatusContainer>
			<CheckItem>{isQualified(props.hasKeySafe)} Install the <Link onClick={() => console.log('InstallKeySafe')}>ixo Key Safe</Link></CheckItem> 
			{renderKYCPart()}
		</StatusContainer>
	);
};
