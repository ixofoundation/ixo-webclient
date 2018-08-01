import * as React from 'react';
import styled from 'styled-components';
import { AgentRoles } from '../../types/models';
import '../../assets/icons.css';
import { ModalData } from './RegisterContainer';
import { Link } from 'react-router-dom';

const StatusContainer = styled.div`
	font-family: Roboto;
	font-size: 16px;
	font-weight: 300;
	line-height: 1.1;
`;

const ModalLink = styled.a`
	&&{:not([href]) {
		text-decoration: underline;
	}}
	text-decoration: underline;
`;

const WhiteLink = styled(Link)`
	&&{:not([href]) {
		text-decoration: underline;
	}}
	color: white;
	text-decoration: underline;
`;

const DarkLink = WhiteLink.extend`
	color: #282828;
`;

const Icon = styled.i`
	font-size: 20px;
	top: 2px;
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
	line-height: 1.5;
	margin-bottom: 10px;
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

const Start = styled.a`
	font-family: ${props => props.theme.fontRobotoCondensed};
	display: block;
	border: 1px solid ${props => props.theme.ixoBlue};
	padding: 6px 30px;
	color: #282828;
	&&&&{text-decoration: none;}
	text-transform: uppercase;
	font-weight: normal;
	margin-top: 20px;
	text-align: center;
	width: 315px;
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
			return (
				<CheckItem>{getIcon(props.hasKeySafe)}
					{getIcon(props.hasKeySafe)} You have successfully installed the <ModalLink onClick={() => props.activeModal(ModalData.keysafe, true)}>ixo Key Safe</ModalLink>
				</CheckItem>
			);
		} else {
			return <CheckItem>{getIcon(props.hasKeySafe)} Install the <ModalLink onClick={() => props.activeModal(ModalData.keysafe, true)}>ixo Key Safe</ModalLink></CheckItem>;
		}
	};

	const renderKYCPart = () => { 
		if (props.role !== AgentRoles.serviceProviders) {
			return (
				<CheckItem>
					{getIcon(props.hasKYC)} Please note that for the beta phase you need to be <ModalLink onClick={() => props.activeModal(ModalData.invite, true)}>invited by ixo</ModalLink> 
					<br/> and then successfully complete the <ModalLink onClick={() => props.activeModal(ModalData.kyc, true)}>KYC process</ModalLink>
				</CheckItem>
			);
		} else {
			return null;
		}
	};

	if (!!props.hasKYC && !!props.hasKeySafe && props.role === AgentRoles.owners) {
		return (
			<CheckItem>{getIcon(true)} You have successfully registered. 
				We are currently in the ixo world beta phase. We invite you to contact the ixo support team to create your own impact project. 
				<Start href="mailto:info@ixo.world?subject=Request to launch a project&body=Full Name:%0D%0A%0D%0ATell us about you and your project:%0D%0A">START THE PROCESS</Start>
			</CheckItem>
		);
	}

	if (!!props.hasKYC && !!props.hasKeySafe && props.role === AgentRoles.evaluators) {
		return (
			<CheckItem>{getIcon(props.hasKeySafe)}
				{getIcon(props.hasKeySafe)} You can now become an evaluator on our list of <DarkLink to="/">projects.</DarkLink>
			</CheckItem>
		);
	}

	if (!!props.hasKeySafe && props.role === AgentRoles.serviceProviders) {
		return (
			<CheckItem>{getIcon(props.hasKeySafe)}
				{getIcon(props.hasKeySafe)} You can now become a service provider on our list of <WhiteLink to="/">projects.</WhiteLink>
			</CheckItem>
		);
	}
	
	return (
		<StatusContainer>
			{getKeysafeText()}
			{renderKYCPart()}
		</StatusContainer>
	);
};
