import * as React from 'react';
// import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { deviceWidth } from '../../lib/commonData';

// const FooterLink = styled(NavLink)`
// 	font-family: ${props => props.theme.fontRobotoCondensed};
//     color: white;
//     margin: 0;
// 	font-size: 13px;
// 	border: 1px solid #000000;
// 	border-radius:3px;
// 	border:1px solid #49bfe0;
// 	text-transform: uppercase;
// 	background: ${props => props.theme.bg.gradientButton};
// 	color:white;

// 	:hover {
// 		text-decoration:none;
// 		color: ${props => props.theme.fontBlue};
// 	}

//     transition: border 0.3s ease;

// 	@media (min-width: 415px) {
// 		padding:10px 20px 10px;
// 		margin:0 10px;
// 		font-size:15px;
// 	}

// 	transition:border 0.3s ease;
// `;

const Main = styled.div`
	display: flex;
    flex-direction: column;
    justify-content: space-between;
	text-align: right;
	i:before {
		color: #FFF;
	}

	@media (max-width:${deviceWidth.tablet}px) {
		text-align: center;
	}
`;

const SocialIcon = styled.a`
	padding: 10px;
	color: '#FFF';

	&:hover:before {
		text-decoration: none;
		color: ${props => props.theme.ixoBlue};
	}
	
	&&:hover {
		text-decoration: none;
	}
`;

const SocialIconContainer = styled.div`
	@media (max-width:${deviceWidth.tablet}px) {
		margin-top: 20px;
		margin-bottom: 10px;
	}
`;

// const ButtonContainer = styled.div`
// 	@media (max-width:${deviceWidth.tablet}px) {
// 		margin-top: 30px;
// 		margin-bottom: 10px;
// 	}
// 	margin-top: 10px;
// `;

export const FooterRight: React.SFC<any> = () => {
	return (
		<Main className="col-md-4">
			{/* <div className="row">
				<ButtonContainer className="col-md-12">
					<FooterLink  exact={true} to="/register">Become a member</FooterLink>
				</ButtonContainer>
			</div> */}
			<div className="row">
				<SocialIconContainer className="col-md-12">
					<SocialIcon href="https://twitter.com/ixo_impact?lang=en" target="_blank" className="icon-twitter" />
					<SocialIcon href="https://www.facebook.com/pg/ixofoundation/about/?ref=page_internal" target="_blank" className="icon-facebook" />
					<SocialIcon href="https://github.com/ixofoundation" target="_blank" className="icon-github" />
					<SocialIcon href="https://medium.com/ixo-blog" target="_blank" className="icon-medium" />
					<SocialIcon href="https://t.me/joinchat/Ejz5exAfFUzcBMRlaYLecQ" target="_blank" className="icon-telegram" />
				</SocialIconContainer>
			</div>
		</Main>
	);
};