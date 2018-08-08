import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import { deviceWidth } from '../../lib/commonData';

const ixoLogo = require('../../assets/images/ixo-logo.svg');

const FooterLink = styled(NavLink)`
	font-family: ${props => props.theme.fontRobotoRegular};
    color: white;
    margin: 0;
	font-size: 12px;
	border: 1px solid #000000;
	border-radius:3px;
	margin:0 10px;

	:hover {
		text-decoration:none;
		color: ${props => props.theme.fontBlue};
	}

    transition: border 0.3s ease;

	@media (min-width: ${deviceWidth.tablet}px) {
		padding:10px 20px 10px;
		margin:0 10px;
		font-size:13px;
	}

	transition:border 0.3s ease;
`;

const ExternalFooterLink = styled.a`
	font-family: ${props => props.theme.fontRobotoRegular};
	color: white;
	margin: 0;
	font-size: 12px;
	border: 1px solid #000000;
	border-radius:3px;
	margin:0 10px;

	:hover {
		text-decoration:none;
		color: ${props => props.theme.fontBlue};
	}

	transition: border 0.3s ease;

	@media (min-width: ${deviceWidth.tablet}px) {
		padding:10px 20px 10px;
		margin:0 10px;
		font-size:13px;
	}

	transition:border 0.3s ease;
`;

const IXOLogo = styled.img`
	margin-right: 20px;
	width: 50px;
	margin-top: 2px;
`;

const FooterTextBlue = styled.span`
	color: #5CD0FA;

	:hover {
		text-decoration: underline;
	}
`;

const FooterText = styled.div`
	padding: 19px 0px 20px 15px;
	color: #808080;
	font-family: Roboto;
	font-size: 14px;
	line-height: 19px;
`;

const Main = styled.div`
	display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const FooterLeft: React.SFC<any> = ({simple}) => {

	return (
		<Main className="col-md-8">
			<div className="row">
				<MediaQuery minWidth={`${deviceWidth.tablet}px`}>
					<Link to="/"><IXOLogo alt="IXO Logo" src={ixoLogo}/></Link>
				</MediaQuery>
				<FooterLink exact={true} to="/about">About</FooterLink>
				<FooterLink exact={true} to="/membership">Membership</FooterLink>
				<FooterLink exact={true} to="/ecosystem">Ecosystem</FooterLink>
				<ExternalFooterLink target="_blank" href="https://ixo.foundation">ixo.Foundation</ExternalFooterLink>
				{/* <FooterLink exact={true} to="/">Oracles</FooterLink> */}
				{/* <FooterLink exact={true} to="/">Plans / Pricing</FooterLink> */}
			</div>
			<div className="row">
				<FooterText className="col-md-10">
					<div className="row">
						Email:<a href="mailto:info@ixo.world"><FooterTextBlue>&nbsp;info@ixo.world</FooterTextBlue></a>
					</div>
				</FooterText>
			</div>
		</Main>
	);
};