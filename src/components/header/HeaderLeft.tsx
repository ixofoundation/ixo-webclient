import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { deviceWidth } from '../../lib/commonData';

const ixoLogo = require('../../assets/images/ixo-logo.svg');

// const HeaderLinkBorder = styled(NavLink)`
// 	font-family: ${props => props.theme.fontRobotoCondensed};
//     padding: 10px 10px 10px;
//     color: white;
//     text-transform: uppercase;
//     margin: 0;
// 	font-size: 13px;
// 	border: 1px solid #000000;
// 	border-radius:3px;
	
// 	:last-child {
// 		border:1px solid #49bfe0;
// 	}

// 	:hover {
// 		text-decoration:none;
// 		color: ${props => props.theme.fontBlue};
// 	}

// 	&:last-child.active {
// 		background: ${props => props.theme.bg.gradientButton};
// 		color:white;
// 	}

//     transition: border 0.3s ease;

// 	@media (min-width: 415px) {
// 		padding:10px 20px 10px;
// 		margin:0 10px;
// 		font-size:15px;
// 	}

// 	transition:border 0.3s ease;
// `;

const HeaderLink = styled(NavLink)`
	color: white;
	font-family: ${props => props.theme.fontRobotoCondensed};
	font-size: 13px;
	font-weight: 400;
	letter-spacing: 1px;
	text-transform: uppercase;
	border: 1px solid #000000;
	border-radius:3px;
	
	:last-child {
		border:1px solid #49bfe0;
		font-weight: 300;
	}

	&:last-child.active {
		background: ${props => props.theme.bg.gradientButton};
		color:white;
		font-weight: 300;
	}

	@media (min-width: 415px) {
		padding:5px 10px 5px;
		margin:0 10px;
		font-size:13px;
	}

	transition:border 0.3s ease;

	:hover {
 		text-decoration:none;
 		&&{color: ${props => props.theme.fontBlue};}}
 	}
`;

const Main = styled.div`
	padding:15px 20px;
	justify-content: flex-end;
	
	a:first-child {
		margin-right: auto;
	}

	@media (min-width:${deviceWidth.tablet}px){
		justify-content: flex-start;

		a:first-child {
			margin-right: inherit;
		}
	}

	a {
		text-decoration: none;
	}
`;

const IXOLogo = styled.img`
	margin-top: -6px;
	margin-right:60px;
`;

export const HeaderLeft: React.SFC<any> = ({refreshProjects}) => {

	return (
		<Main className="col-md-6 d-flex align-items-center">
			<Link to="/"><IXOLogo alt="IXO Logo" src={ixoLogo}/></Link>
			<HeaderLink exact={true} onClick={refreshProjects} to="/">Explore</HeaderLink>
			<HeaderLink exact={true} to="/register">Launch a Project</HeaderLink>
		</Main>
	);
};