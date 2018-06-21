import * as React from 'react';
import styled from 'styled-components';
import { MemberBanner } from './MemberBanner';
import { MemberBenefits } from './MemberBenefits';

const bannerBg = require('../../assets/images/member/member-bg.jpg');

const Banner = styled.div`
	background: #002233 url(${bannerBg}) no-repeat;
	background-size: cover;
	background-position: left 5px bottom -70px;
	width: 100%;
	height: 600px;
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