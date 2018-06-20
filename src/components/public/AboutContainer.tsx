import * as React from 'react';
import { AboutBanner } from './AboutBanner';
import styled from 'styled-components';
import { AboutMatters } from './AboutMatters';

const bannerBg = require('../../assets/images/about/ixo-banner-bg.jpg');

const Banner = styled.div`
	background: #00273A url(${bannerBg}) no-repeat;
	background-size: cover;
	background-position: left 5px bottom -70px;
	width: 100%;
	height: 600px;

`;
export interface ParentProps {
	title: string;
}

export const AboutContainer: React.SFC<ParentProps> = (props) => {
	return (
		<Banner className="container-fluid">
			<AboutBanner />
			<AboutMatters />
		</Banner>
	);
};