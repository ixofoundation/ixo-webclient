import * as React from 'react';
import styled from 'styled-components';
import { deviceWidth } from '../../lib/commonData';

const penguinImg = require('../../assets/images/about/ixo-banner-penguin.png');
const bannerBg = require('../../assets/images/about/ixo-banner-bg.jpg');

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
const BannerLeft = styled.div`
	width: 100%;

	img {
		margin-top: 10%;
		margin-left: -3%;
		width: 90%;
	}
	@media (max-width: 1240px) {
		img {
			margin-left: -5%;
		}
	}
	@media (max-width: ${deviceWidth.tablet}px){
		img {
			display: none;
		}
	}
`;
const BannerRight = styled.div`
	width: 100%;
	color: white;
	margin-top: 12%;
	margin-right: 10%;
	h2 {
		font-size: 60px;
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
	@media (max-width: ${deviceWidth.mobile}px){
		p {
			padding-top: 12px;
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
	button {
		background: none;
		color: white;
		border: 1px solid #49BFE0;
		padding: 10px 25px;
		text-transform: uppercase;
		font-size: 15px;
		font-family: ${props => props.theme.fontRobotoCondensed};
		margin-top: 20px;
		cursor: pointer;
	}
`;
export interface ParentProps { }

export const AboutBanner: React.SFC<ParentProps> = (props) => {
	return (
		<Banner className="container-fluid">
			<div className="row">
				<div className="col-md-4">
					<BannerLeft>
						<img src={penguinImg} alt="" />
					</BannerLeft>
				</div>
				<div className="col-md-8">
					<BannerRight>
						<div className="row">
							<h2>What counts</h2>
							<h5>Impact Data: Trust, Measure & Accountability</h5>
							<p>ixo provides a trusted global information network that is owned by everyone. Enabling anyone to become the creators of their own impact projects and a stake-holder in the projects they believe in. </p>
							<button>Start your own impact project</button>
						</div>
					</BannerRight>
				</div>
			</div>
		</Banner>
	);
};