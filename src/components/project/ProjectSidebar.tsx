import * as React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
	width: 75px;
	padding-top: 15px;
	background: ${props => props.theme.bg.gradientBlue};
	position:sticky;
	top:70px;

	.active {
		border-left:5px solid ${props => props.theme.ixoBlue};
	}

	.active i {
		position: relative;
		left: -5px;
	}
`;

const NavItem = styled(NavLink)`
	color: white;
	margin: 30px 0;
	width: 100%;
	height: 50px;
	display:flex;
	justify-content: center;
	align-items: center;

	i:before {
		color: white;
		font-weight: bolder;
	}
`;

export interface Props {
	match: any;
	projectDid: string;
}

export const ProjectSidebar: React.SFC<Props> = ({projectDid}) => {
	return (
		<Container>
			<NavItem exact={true} title="Dashboard" to={`/projects/${projectDid}/detail/`}><i className="icon-info" /></NavItem>
			<NavItem exact={true} title="Service Providers" to={`/projects/${projectDid}/detail/service-providers`}><i className="icon-ixo-logo" /></NavItem>
			<NavItem exact={true} title="Evaluators" to={`/projects/${projectDid}/detail/evaluators`}><i className="icon-info" /></NavItem>
			<NavItem exact={true} title="Claims" to={`/projects/${projectDid}/detail/claims`}><i className="icon-ixo-logo" /></NavItem>
			<NavItem exact={true} title="Settings" to={`/projects/${projectDid}/overview`}><i className="icon-info" /></NavItem>
		</Container>
	);
};