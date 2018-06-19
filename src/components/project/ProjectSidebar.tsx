import * as React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
	width: 75px;
`;

const NavItem = styled(NavLink)`

`;

export interface Props {
	match: any;
	projectDid: string;
}

export const ProjectSidebar: React.SFC<Props> = ({projectDid}) => {
	return (
		<Container>
			<NavItem to={`/projects/${projectDid}/detail/`}>h</NavItem>
			<NavItem to={`/projects/${projectDid}/detail/service-providers`}>s</NavItem>
			<NavItem to={`/projects/${projectDid}/detail/evaluators`}>e</NavItem>
			<NavItem to={`/projects/${projectDid}/detail/evaluators`}>c</NavItem>
			<NavItem to={`/projects/${projectDid}/detail/evaluators`}>se</NavItem>
		</Container>
	);
};