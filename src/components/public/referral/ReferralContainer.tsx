import * as React from 'react';
import { ReferralHeading } from './ReferralHeading';
import { ReferralCols } from './ReferralCols';
import styled from 'styled-components';
const bannerImg = require('../../../assets/images/referral/referral-bg.jpg');
require('../../../lib/viralLoops.js');

const ReferralWrapper = styled.div`
	background: #f6f6f6 url(${bannerImg}) no-repeat left top;
	background-size: contain;
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	padding-bottom: 40px;

	@media (max-width: 1060px) {
		background-size: auto 400px;
		background-attachment: fixed;
	}
`;

const Container = styled.div`
	padding: 60px 15px 0;
	margin:0 auto 40px;

	max-width: 100%;
`;

export interface ParentProps {
	shared: boolean;
}

export const ReferralContainer: React.SFC<ParentProps> = (props) => {
	return (
		<ReferralWrapper>
			<Container>
				<ReferralHeading shared={props.shared} />
				<ReferralCols shared={props.shared}/>
			</Container>
		</ReferralWrapper>
	);
};