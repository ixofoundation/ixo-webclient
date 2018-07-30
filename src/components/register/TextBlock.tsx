import * as React from 'react';
import { AgentRoles } from '../../types/models';
import { RegisterStatus } from './RegisterStatus';
import styled from 'styled-components';

const Container = styled.div`
	padding: 50px 0;
	color: #333C4E;

	i:before {
		color: #333C4E;
	}
`;

const ContainerWhite = styled.div`
	padding: 50px 0;
	color: white;

	i:before {
		color: white;
	}
`;

export interface ParentProps {
	title: string;
	icon: string;
	role: AgentRoles;
	KYC?: boolean;
	invite?: boolean;
	keysafe?: boolean;
	blueBG?: boolean;
}

export const TextBlock: React.SFC<ParentProps> = (props) => {

	if (props.blueBG === true) {
		return (
			<ContainerWhite>
				<h2><i className={props.icon}/> {props.title}</h2>
				{props.children}
				<RegisterStatus role={props.role} hasKeySafe={props.keysafe} hasKYC={props.KYC}/>
			</ContainerWhite>
		);
	} else {
		return (
			<Container>
				<h2><i className={props.icon}/> {props.title}</h2>
				{props.children}
				<RegisterStatus role={props.role} hasKeySafe={props.keysafe} hasKYC={props.KYC}/>
			</Container>
		);
	}
};