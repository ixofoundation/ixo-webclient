import * as React from 'react';
import styled from 'styled-components';
import { deviceWidth } from '../../lib/commonData';
// import { Parallax } from 'react-parallax';

const penguinImg = require('../../assets/images/about/ixo-banner-penguin.png');
const bannerBg = require('../../assets/images/about/ixo-banner-bg.jpg');

const Banner = styled.div`
	background: url(${bannerBg}) #002233;
	background-size: cover;
	width: 100%;
	height: 600px;
	margin: 0;
	@media (max-width: 1600px){
		height: 500px;
	}
	@media (max-width: 1336px){
		height: 400px;
	}
	@media (max-width: 1024px){
		height: 450px;
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
			width: 100%;
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
	@media (max-width: ${deviceWidth.tablet}px){
		margin-top: -20px;
	}
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
	@media (max-width: 1024px){
		p {
			padding-top: 20px;
			padding-right: 35%;
		}
	}
	@media (max-width: ${deviceWidth.tablet}px){
		p {
			padding-right: 25%;
		}
	}
	@media (max-width: ${deviceWidth.mobile}px){
		p {
			padding-top: 20px;
			padding-right: 18%;
		}
	}
	p::before {
		content: " ";
		display: block;
		position: absolute;
		height: 1px;
		background: #00D2FF;
		width: 100px;
		top: 15%;
	}
	@media (max-width: 1024px){
		p::before {
			top: -2%;
		}
	}
	@media (max-width: ${deviceWidth.tablet}px){
		p::before {
			top: 14%;
		}
	}
	@media (max-width: ${deviceWidth.mobile}px){
		p::before {
			top: 5%;
		}
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
		// <Parallax
		// 	bgImage={bannerBg}
		// 	strength={500}
		// >
			<Banner className="row">
				<div className="col-lg-4 hidden-md-down">
					<BannerLeft>
						<img src={penguinImg} alt="" />
					</BannerLeft>
				</div>
				<div className="col-lg-8 col-md-12">
					<BannerRight>
						<div className="container">
							<h2>What counts</h2>
							<h5>Impact Data: Trust, Measure & Accountability</h5>
							<p>ixo provides a trusted global information network that is owned by everyone. Enabling anyone to become the creators of their own impact projects and a stake-holder in the projects they believe in. </p>
							<button>Start your own impact project</button>
						</div>
					</BannerRight>
				</div>
			</Banner>
		// </Parallax>
	);
};