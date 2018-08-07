import * as React from 'react';
import styled from 'styled-components';
// import { deviceWidth } from '../../lib/commonData';
const BannerText = styled.div`
	color: white;

	h2 {
		font-size: 60px;
		font-family: ${props => props.theme.fontRobotoCondensed};
		margin-bottom: 15px;
		line-height: 1;

		span {
			color: #83D9F2;
			text-transform: uppercase;
		}
	}

	h5 {
		font-size: 25px;
		font-weight: 200;
		margin-bottom: 5px;
		max-width: 510px;

		strong {
			font-weight: 500;
		}
	}

	@media (max-width: 700px) {
		h2 {
			font-size: 40px;
		}

		h3 {
			font-size: 22px;
		}
	}
`;

const Underline = styled.h5`
	
	:after {
		content: " ";
		display: block;
		position: relative;
		height: 1px;
		background: #00D2FF;
		width: 100px;
		top: 20px;
	}
`;

export interface ParentProps {
	shared: boolean;
}

export const ReferralHeading: React.SFC<ParentProps> = (props) => {
	return (
		<BannerText>
				{!props.shared && <h2>Welcome to ixo World</h2>}
				{props.shared ? <Underline>Now that you’re a citizen of ixo World <strong>share your code</strong> with friends and be rewarded for introducing others.</Underline>
				: <React.Fragment>
					<h5>Count what matters.</h5>
					<Underline>Value what counts.</Underline>
				</React.Fragment>
				}
		</BannerText>
	);
};