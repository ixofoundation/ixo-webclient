import * as React from 'react';
import styled from 'styled-components';
import { deviceWidth } from '../../lib/commonData';

const bannerImg = require('../../assets/images/pricing/pricing-bg.jpg');

const Banner = styled.div`
	background: #002233 url(${bannerImg}) no-repeat;
	background-size: cover;
	width: 100%;
	height: 450px;
	margin: 0;
	@media (max-width: ${deviceWidth.mobile}px){
		padding: 6%;
	}
`;

const BannerText = styled.div`
	width: 100%;
	color: white;
	margin-top: 8%;
	margin-right: 10%;
	@media (max-width: ${deviceWidth.mobile}px){
		padding: 6%;
	}
	h2 {
		font-size: 60px;
		font-family: ${props => props.theme.fontRobotoCondensed};
		margin-bottom: 15px;
		width: 100%;
		line-height: 52px;
	}
	h5 {
		font-size: 23px;
		font-weight: 300;
		margin-bottom: 0;
		padding-bottom: 15px;
		margin-right: 35%;
	}
	@media (max-width: ${deviceWidth.mobile}px){
		h5 {
			margin-top: 20px;
			margin-right: 10px;
		}
	}
	h5::after {
		content: " ";
		display: block;
		position: relative;
		height: 1px;
		background: #00D2FF;
		width: 100px;
		bottom: -50%;
	}
	@media (max-width: ${deviceWidth.mobile}px){
		p::before {
			top: 0;
		}
	}
	button {
		background: none;
		color: white;
		border: 1px solid #49BFE0;
		padding: 10px 90px;
		text-transform: uppercase;
		font-size: 15px;
		font-family: ${props => props.theme.fontRobotoCondensed};
		margin-top: 20px;
		cursor: pointer;
	}
`;

export interface ParentProps { }

export const PricingBanner: React.SFC<ParentProps> = (props) => {
	return (
		<Banner className="row">
			<div className="offset-md-2 col-md-10 col-sm-11 col-xs-11 offset-sm-1 offset-xs-1">
				<BannerText>
					<div className="row">
						<h2>Plans & pricing</h2>
						<h5>Launch your impact projects. Stake on projects you believe in.</h5>
					</div>
				</BannerText>
			</div>
		</Banner>
	);
};