import * as React from 'react';
import styled from 'styled-components';
import { AgentRoles } from '../../types/models';
import '../../assets/icons.css';
import { ModalData } from './RegisterContainer';

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
	transition: color 0.3s ease;

	&&{a {
		text-decoration: underline;
	}}

	&&{a:hover {
		text-decoration: underline;
		cursor: pointer;
		color: ${props => props.theme.fontBlue};
	}}
`;

export interface ParentProps {
	role: AgentRoles;
	activeModal: Function;
	hasKeySafe?: boolean;
	hasKYC?: boolean; 
}

export const RegisterStatus: React.SFC<ParentProps> = (props) => {

	const getIcon = (condition) => {
		if (condition) {
			return <GreenI className={'icon-approved'} />;
		} else {
			return <GreyI className={'icon-rejectedcross'} />;
		}
	};

	const getKeysafeText = () => {
		if (props.hasKeySafe) {
			return <React.Fragment>{getIcon(props.hasKeySafe)} You have successfully installed the <u>ixo Keysafe</u></React.Fragment>;
		} else {
			return <React.Fragment>{getIcon(props.hasKeySafe)} Install the <Link onClick={() => props.activeModal(ModalData.keysafe, true)}>ixo Key Safe</Link></React.Fragment>;
		}
	};

	const renderKYCPart = () => {
		if (props.role !== AgentRoles.serviceProviders) {
			if (props.hasKYC) {
				return <React.Fragment>{getIcon(props.hasKYC)} You have successfully completed the <u>KYC process</u></React.Fragment>;
			} else {
				return (
					<React.Fragment>
						{getIcon(props.hasKYC)} Please note that for the beta phase you need to be <Link onClick={() => props.activeModal(ModalData.invite, true)}>invited by ixo</Link> 
						<br/> and then successfully complete the <Link onClick={() => props.activeModal(ModalData.kyc, true)}>KYC process</Link>
					</React.Fragment>
				);
			}
		} else {
			return null;
		}
	};

	return (
		<StatusContainer>
			<CheckItem>{getIcon(props.hasKeySafe)} {getKeysafeText()}</CheckItem> 
			<CheckItem>{renderKYCPart()}</CheckItem>
		</StatusContainer>
	);
};
