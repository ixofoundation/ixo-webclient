import * as React from 'react';
import { HomeBanner } from './HomeBanner';
import styled from 'styled-components';

const bannerBg = require('../../assets/images/home/ixo-banner-bg.jpg');

const Banner = styled.div`
	background: #00273A url(${bannerBg});
	background-size: cover;
	background-position: left 5px bottom -70px;
	width: 100%;
	height: 500px;

`;
export interface ParentProps {
	title: string;
}

export const HomePage: React.SFC<ParentProps> = (props) => {
	return (
		<Banner className="container-fluid">
			<HomeBanner />
		</Banner>
	);
};