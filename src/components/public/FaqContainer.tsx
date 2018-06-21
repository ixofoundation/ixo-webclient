import * as React from 'react';
import styled from 'styled-components';
import { FaqBanner } from './FaqBanner';
import { FaqSection } from './FaqSection';

const bannerImg = require('../../assets/images/faq/faq-bg.jpg');

const Banner = styled.div`
	background: #002233 url(${bannerImg}) no-repeat;
	background-size: cover;
	width: 100%;
	height: 350px;
`;

export interface ParentProps { }

export const FaqContainer: React.SFC<ParentProps> = (props) => {
	return (
		<Banner className="container-fluid">
			<FaqBanner />
			<FaqSection />
		</Banner>
	);
};