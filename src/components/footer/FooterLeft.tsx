import * as React from 'react';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import { deviceWidth } from '../../lib/commonData';
import { getIxoWorldRoute } from '../../utils/formatters';

const ixoLogo = require('../../assets/images/ixo-logo.svg');
// const tcs = require('../../assets/legal/terms-and-conditions.pdf');
// const privacypolicy = require('../../assets/legal/privacy-policy.pdf');

const ExternalFooterLink = styled.a`
	font-family: ${props => props.theme.fontRobotoRegular};
	color: white;
	margin: 0;
	font-size: 13px;
    font-weight: 400;
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
		font-size:15px;
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

	a {
		font-weight: 400;
	}
	p {
		font-size: 13px;
		color: #808080;
		display: block;
		font-weight: 400;
	}
`;

const Main = styled.div`
	display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ByLine = styled.div`
	a {
		color: #808080;
	}

	a:hover {
		color: white;
	}

	a:before {
		content: "|";
		margin: 0 15px;
		color: #808080;
	}
`;

export const FooterLeft: React.SFC<any> = ({simple}) => {

	return (
		<Main className="col-md-8">
			<div className="row">
				<MediaQuery minWidth={`${deviceWidth.tablet}px`}>
					<a href={getIxoWorldRoute('')}><IXOLogo alt="IXO Logo" src={ixoLogo}/></a>
				</MediaQuery>
				{/* <ExternalFooterLink href={getIxoWorldRoute('/about')}>About</ExternalFooterLink> */}
				<ExternalFooterLink href={getIxoWorldRoute('/membership')}>Membership</ExternalFooterLink>
				<ExternalFooterLink href={getIxoWorldRoute('/subscribe')}>Subscribe</ExternalFooterLink>
				<ExternalFooterLink href={getIxoWorldRoute('/ecosystem')}>Ecosystem</ExternalFooterLink>
				<ExternalFooterLink target="_blank" href="https://ixo.foundation">ixo.Foundation</ExternalFooterLink>
				{/* <FooterLink exact={true} to="/">Oracles</FooterLink> */}
				{/* <FooterLink exact={true} to="/">Plans / Pricing</FooterLink> */}
			</div>
			<div className="row">
			<FooterText className="col-md-10">
					<div className="row">
						<a href="mailto:info@ixo.world"><FooterTextBlue>info@ixo.world</FooterTextBlue></a>
					</div>
					<ByLine className="row">
						<p>ixo.world AG, Heiligkreuz 6, 9490 Vaduz, Liechtenstein 
							<a href="https://github.com/ixofoundation/Legal-Documents/raw/master/Terms%20%26%20Conditions.pdf#page=2" target="_blank">Terms &amp; conditions</a>
							<a href="https://github.com/ixofoundation/Legal-Documents/raw/master/Privacy%20Policy.pdf" target="_blank">Privacy policy</a>
							<a href="https://github.com/ixofoundation/Legal-Documents/raw/master/ixo.world%20-%20Security.pdf" target="_blank">Security</a>
						</p>
					</ByLine>
				</FooterText>
			</div>
		</Main>
	);
};