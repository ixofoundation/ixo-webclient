import * as React from 'react';
import styled from 'styled-components';
import { deviceWidth } from '../../lib/commonData';

const bannerBg = require('../../assets/images/faq/faq-bg.jpg');

const Banner = styled.div`
	background: #002233 url(${bannerBg}) no-repeat;
	background-size: cover;
	width: 100%;
	height: 350px;
	margin: 0;
	@media (max-width: ${deviceWidth.tablet}px){
		height: 300px;
	}
`;

const BannerText = styled.div`
	width: 100%;
	color: white;
	margin-top: 3%;
	margin-right: 10%;
	@media (max-width: ${deviceWidth.tablet}px){
		margin-top: 30px;
	}
	h2 {
		font-size: 45px;
		font-family: ${props => props.theme.fontRobotoCondensed};
		margin-bottom: 0;
		width: 100%;
	}
	h5 {
		font-size: 23px;
		font-weight: 300;
	}
	p {
		padding-top: 30px;
		position: relative;
		box-sizing: border-box;
		font-weight: 300;
		padding-right: 55%;
		margin-bottom: 0;
	}
	@media (max-width: ${deviceWidth.tablet}px){
		p {
			padding-top: 20px;
			padding-right: 30%;
		}
	}
	p::before {
		content: " ";
		display: block;
		position: absolute;
		height: 1px;
		background: #00D2FF;
		width: 100px;
		top: 22%;
	}
	@media (max-width: ${deviceWidth.mobile}px){
		p::before {
			top: 12%;
		}
	}
	button {
		background: none;
		color: white;
		border: 1px solid #49BFE0;
		padding: 10px 60px;
		text-transform: uppercase;
		font-size: 15px;
		font-family: ${props => props.theme.fontRobotoCondensed};
		margin-top: 20px;
		cursor: pointer;
	}
`;

export interface ParentProps { }

export const FaqBanner: React.SFC<ParentProps> = (props) => {
	return (
		<Banner className="row">
			<div className="col-lg-12">
				<BannerText>
					<div className="container">
						<h2>Support</h2>
						<p>Get the most out of ixo. Contact the support team if you don’t find what you’re looking for. </p>
						<button>contact the support team</button>
					</div>
				</BannerText>
			</div>
		</Banner>
	);
};