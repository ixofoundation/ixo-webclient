import * as React from 'react';
import styled from 'styled-components';
import { AgentRoles } from '../../types/models';
import '../../assets/icons.css';
import { ModalData } from './RegisterContainer';
import { Link } from 'react-router-dom';

const StatusContainer = styled.section`
	font-family: Roboto;
	font-size: 16px;
	font-weight: 300;
	line-height: 1.1;
	padding: 15px;
	box-shadow: 0 0 14px 0 rgba(0,0,0,0.08);
	border-radius: 2px;
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
		color: #C6C4C4;
	}}
`;

const CheckItem = styled.p`
	line-height: 1.5;
	margin: 5px 0;
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
	width: 200px;
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
			return <GreenI className={'icon-registration-yes'} />;
		} else {
			return <GreyI className={'icon-register-no'} />;
		}
	};

	const getKeysafeText = () => {
		if (props.hasKeySafe) {
			return (
				<CheckItem>{getIcon(props.hasKeySafe)}
					{getIcon(props.hasKeySafe)} You have successfully installed the <ModalLink onClick={() => props.activeModal(ModalData.keysafe, true)}>ixo Keysafe</ModalLink>
				</CheckItem>
			);
		} else {
			return <CheckItem>{getIcon(props.hasKeySafe)} This role requires <ModalLink onClick={() => props.activeModal(ModalData.keysafe, true)}>installing ixo Keysafe.</ModalLink></CheckItem>;
		}
	};

	const renderKYCPart = () => { 
		if (props.role === AgentRoles.owners) {
			return (
				<CheckItem>
					{getIcon(props.hasKYC)} The closed Beta is <ModalLink onClick={() => props.activeModal(ModalData.invite, true)}>by invitation </ModalLink> 
					and requires <ModalLink onClick={() => props.activeModal(ModalData.kyc, true)}>registering as an ixo member.</ModalLink>
				</CheckItem>
			);
		} else {
			return null;
		}
	};

	if (!props.hasKYC) {
		return (
		<StatusContainer>
			<CheckItem>{getIcon(true)} You have successfully registered. 
				<Start href="https://docs.google.com/forms/d/e/1FAIpQLSfv6TY-8Eurg6dcS-2YPeFIuT7nlPE5YGKj2SaRrPJ0vIf4ZA/viewform" target="_blank">LAUNCH A PROJECT</Start>
			</CheckItem>
		</StatusContainer>
		);
	}

	if (!!props.hasKYC && !!props.hasKeySafe && props.role === AgentRoles.evaluators) {
		return (
		<StatusContainer>
			<CheckItem>{getIcon(props.hasKeySafe)}
				{getIcon(props.hasKeySafe)} You can now become an evaluator on the <DarkLink to="/">ixo test projects.</DarkLink>
			</CheckItem>
		</StatusContainer>
		);
	}

	if (!!props.hasKeySafe && props.role === AgentRoles.serviceProviders) {
		return (
		<StatusContainer>
			<CheckItem>{getIcon(props.hasKeySafe)}
				{getIcon(props.hasKeySafe)} You can now become a service provider on the <WhiteLink to="/">ixo test projects.</WhiteLink>
			</CheckItem>
		</StatusContainer>	
		);
	}
	
	return (
		<StatusContainer>
			{getKeysafeText()}
			{renderKYCPart()}
		</StatusContainer>
	);
};
