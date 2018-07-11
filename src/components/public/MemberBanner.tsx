import * as React from 'react';
import styled from 'styled-components';
import { deviceWidth } from '../../lib/commonData';

const polarBearImg = require('../../assets/images/member/polar-bear-image.png');
const bannerBg = require('../../assets/images/member/member-bg.jpg');

const Banner = styled.div`
	background: #002233 url(${bannerBg}) no-repeat;
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
		margin-left: -4%;
		width: 90%;
	}
	@media (max-width: 1336px){
		img {
			width: 85%;
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
	@media (max-width: ${deviceWidth.tablet}px){
		margin-top: -20px;
	}
	h2 {
		font-size: 60px;
		font-family: ${props => props.theme.fontRobotoCondensed};
		margin-bottom: 0;
		width: 100%;
	}
	@media (max-width: ${deviceWidth.mobile}px){
		h2 {
			line-height: 55px;
		}
	}
	h5 {
		font-size: 23px;
		font-weight: 300;
	}
	@media (max-width: ${deviceWidth.mobile}px){
		h5 {
			margin-top: 10px;
		}
	}
	p {
		margin-top: 30px;
		position: relative;
		box-sizing: border-box;
		font-weight: 300;
		padding-right: 55%;
		margin-bottom: 0;
	}
	@media (max-width: 1024px){
		p {
			margin-top: 20px;
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
		top: -20%;
	}
	@media (max-width: 1024px){
		p::before {
			top: 2%;
		}
	}
	@media (max-width: ${deviceWidth.tablet}px){
		p::before {
			top: 14%;
		}
	}
	@media (max-width: ${deviceWidth.mobile}px){
		p::before {
			top: 2%;
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

export const MemberBanner: React.SFC<ParentProps> = (props) => {
	return (
		<Banner className="row">
			<div className="col-lg-4 hidden-md-down">
				<BannerLeft>
					<img src={polarBearImg} alt="" />
				</BannerLeft>
			</div>
			<div className="col-lg-8 col-md-12">
				<BannerRight>
					<div className="container">
						<h2>Become a member</h2>
						<h5>A global collaboration to build the Blockchain for Impact.</h5>
						<p>Passionate about impact and the potential for ixo to change the world and usher in the Impact Economy? </p>
						<button>Become a member</button>
					</div>
				</BannerRight>
			</div>
		</Banner>
	);
};