import * as React from 'react';
import styled from 'styled-components';
import { deviceWidth } from '../../lib/commonData';

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
	margin-top: 20px;
	margin-bottom: 10px;

	@media (min-width:${deviceWidth.tablet}px) {
		margin: 0;
		padding-right: 60px;
	}
`;

export const FooterRight: React.SFC<any> = () => {
	return (
		<Main className="col-md-4">
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