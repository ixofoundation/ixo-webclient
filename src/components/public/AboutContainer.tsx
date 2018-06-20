import * as React from 'react';
import styled from 'styled-components';
import { AboutBanner } from './AboutBanner';
import { AboutMatters } from './AboutMatters';
import { AboutValue } from './AboutValue';

const bannerBg = require('../../assets/images/about/ixo-banner-bg.jpg');

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

export const AboutContainer: React.SFC<ParentProps> = (props) => {
	return (
		<Banner className="container-fluid">
			<AboutBanner />
			<AboutMatters />
			<AboutValue />
		</Banner>
	);
};