import * as React from 'react';
import styled from 'styled-components';

const penguinImg = require('../../assets/images/about/ixo-banner-penguin.png');
const bannerBg = require('../../assets/images/about/ixo-banner-bg.jpg');

const Banner = styled.div`
	background: #002233 url(${bannerBg}) no-repeat;
	background-size: cover;
	width: 100%;
	height: 600px;

`;
const BannerLeft = styled.div`
	width: 100%;

	img {
		margin-top: 10%;
		margin-left: -3%;
		width: 90%;
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
		margin-top: 5%;
		position: relative;
		box-sizing: border-box;
		font-weight: 300;
		padding-right: 55%;
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
		padding: 10px 25px;
		text-transform: uppercase;
		font-size: 15px;
		font-family: ${props => props.theme.fontRobotoCondensed};
		margin-top: 20px;
		cursor: pointer;
	}
`;
const Button = styled.div`
	.btn {
		line-height: 50px;
		height: 50px;
		text-align: center;
		width: 250px;
		cursor: pointer;
	}
	.btn-hover {
		color: #FFF;
		transition: all 0.5s;
		position: relative;
	}
	.btn-hover span {
		z-index: 2;
		display: block;
		position: absolute;
		line-height: 35px;
		width: 100%;
		height: 100%;
	}
	.btn-hover::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		transition: all 0.5s;
		border: 1px solid #49BFE0;
	}
	.btn-hover::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		transition: all 0.5s;
		border: 1px solid #49BFE0;
	}
	.btn-hover:hover::before {
		transform: rotate(-45deg);

	}
	.btn-hover:hover::after {
		transform: rotate(45deg);

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
							<Button className="btn-box">
								<div className="btn btn-hover">
									<span>start your own impact project</span>
								</div>
							</Button>
						</div>
					</BannerRight>
				</div>
			</div>
		</Banner>
	);
};