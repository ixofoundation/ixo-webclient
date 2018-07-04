import * as React from 'react';
import styled from 'styled-components';
import { deviceWidth } from '../../lib/commonData';

const bannerImg = require('../../assets/images/faq/faq-bg.jpg');

const Banner = styled.div`
	background: #002233 url(${bannerImg}) no-repeat;
	background-size: cover;
	width: 100%;
	height: 350px;
	margin: 0;
	@media (max-width: ${deviceWidth.mobile}px){
		padding: 6%;
	}
`;

const BannerText = styled.div`
	width: 100%;
	color: white;
	margin-top: 3%;
	margin-right: 10%;
	h2 {
		font-size: 60px;
		font-family: ${props => props.theme.fontRobotoCondensed};
		margin-bottom: 0;
		width: 100%;
	}
	@media (max-width: ${deviceWidth.mobile}px){
		h2 {
			margin-bottom: 20px;
		}
	}
	h5 {
		font-size: 23px;
		font-weight: 300;
	}
	@media (max-width: ${deviceWidth.mobile}px){
		h5 {
			margin-top: 20px;
		}
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
	@media (max-width: ${deviceWidth.mobile}px){
		p::before {
			top: -8%;
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
	@media (max-width: ${deviceWidth.mobile}px){
		button {
			padding: 10px 20px;
		}
	}
`;

export interface ParentProps { }

export const EcoBanner: React.SFC<ParentProps> = (props) => {
	return (
		<Banner className="row">
			<div className="container">
				<div className="col-md-12">
					<BannerText>
						<h2>Ecosystem</h2>
						<p>Behind great change is a collective of thought leaders,  innovators and visionaries. </p>
						<button>JOIN THE IXO ECOSYSTEM</button>
					</BannerText>
				</div>
			</div>
		</Banner>
	);
};