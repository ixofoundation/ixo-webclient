import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { deviceWidth } from '../../lib/commonData';

const bannerImg = require('../../assets/images/pricing/pricing-bg.jpg');

const Banner = styled.div`
	background: #002233 url(${bannerImg}) no-repeat;
	background-size: cover;
	width: 100%;
	height: 600px;
	margin: 0;
	@media (max-width: ${deviceWidth.mobile}px){
		.col-md-2.hidden {
			display: none;
		}
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
		padding-bottom: 20px;
	}
	@media (max-width: ${deviceWidth.mobile}px){
		h5 {
			margin-top: 20px;
		}
	}
	p {
		position: relative;
		box-sizing: border-box;
		font-weight: 300;
		padding-right: 55%;
		padding-top: 10px;
	}
	@media (max-width: ${deviceWidth.mobile}px){
		p {
			padding-right: 0;
		}
	}
	p::before {
		content: " ";
		display: block;
		position: absolute;
		height: 1px;
		background: #00D2FF;
		width: 100px;
		top: -20%;
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
			<div className="col-md-2 hidden" />
			<div className="col-md-10 col-xs-12">
				<BannerText>
					<div className="row">
						<h2>Plans & pricing</h2>
						<h5>Impact Data: Trust, Measure & Accountability</h5>
						<p>Don't see a plan that works for you? We can create one that perfectly fits your needs. </p>
						<Link to="/"><button>GET IN TOUCH </button></Link>
					</div>
				</BannerText>
			</div>
		</Banner>
	);
};