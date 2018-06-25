import * as React from 'react';
import styled from 'styled-components';
// import { deviceWidth } from '../../lib/commonData';
import { MemberBanner } from './MemberBanner';
import { MemberBenefits } from './MemberBenefits';
import { deviceWidth } from '../../lib/commonData';

const bannerBg = require('../../assets/images/member/member-bg.jpg');

const Banner = styled.div`
	background: #002233 url(${bannerBg}) no-repeat;
	background-size: cover;
	width: 100%;
	height: 600px;

	@media (max-width: 1600px){
		height: 500px;
	}
	@media (max-width: 1336px){
		height: 400px;
	}
	@media (max-width: 1024px){
		height: 350px;
	}
	@media (max-width: ${deviceWidth.mobile}px){
		height: 390px;
	}
`;
export interface ParentProps {
	title: string;
}

export const MemberContainer: React.SFC<ParentProps> = (props) => {
	return (
		<Banner className="container-fluid">
			<MemberBanner />
			<MemberBenefits />
		</Banner>
	);
};