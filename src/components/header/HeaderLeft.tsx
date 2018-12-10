import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { deviceWidth } from '../../lib/commonData';
import { getIxoWorldRoute } from '../../utils/formatters';

const ixoLogo = require('../../assets/images/ixo-logo.svg');

const HeaderLink = styled(NavLink)`
	color: white;
	font-family: ${props => props.theme.fontRobotoCondensed};
	font-size: 12px;
	font-weight: 400;
	letter-spacing: 1px;
	text-transform: uppercase;
	border: 1px solid #000000;
	border-radius:3px;
	padding:5px 10px 5px;
	margin:0;

	:nth-child(2) {
		border:1px solid #49bfe0;
		font-weight: 300;
	}

	&:nth-child(2).active {
		color: ${props => props.theme.fontBlueButtonHover};
		font-weight: 300;
	}

	@media (min-width: 430px) {
		margin:0 10px;
		font-size: 13px;
	}

	transition:border 0.3s ease;

	:hover {
 		text-decoration:none;
 		&&{color: ${props => props.theme.fontBlue};}}
 	}
`;

const HeaderAnchor = styled.a`
	color: white;
	font-family: ${props => props.theme.fontRobotoCondensed};
	font-size: 12px;
	font-weight: 400;
	letter-spacing: 1px;
	text-transform: uppercase;
	border: 1px solid #000000;
	border-radius:3px;
	padding:5px 10px 5px;
	margin:0;

	@media (min-width: 430px) {
		margin:0 10px;
		font-size: 13px;
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

	@media (min-width: 430px) {
		margin-right:60px;
	}
`;

export const HeaderLeft: React.SFC<any> = ({refreshProjects}) => {

	return (
		<Main className="col-md-6 d-flex align-items-center">
			<a href={getIxoWorldRoute('')}><IXOLogo alt="IXO Logo" src={ixoLogo}/></a>
			<HeaderLink exact={true} onClick={refreshProjects} to="/">Explore</HeaderLink>
			<HeaderAnchor href={getIxoWorldRoute('/membership')}>Membership</HeaderAnchor>
			<HeaderAnchor href={getIxoWorldRoute('/subscribe')}>Subscribe</HeaderAnchor>
			<HeaderAnchor href={getIxoWorldRoute('/ecosystem')}>Ecosystem</HeaderAnchor>
			{/* <HeaderLink exact={true} to="/register">Launch a Project</HeaderLink> */}
		</Main>
	);
};