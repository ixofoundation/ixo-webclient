import * as React from 'react';
import styled from 'styled-components';

const penguinImg = require('../../assets/images/about/ixo-banner-penguin.png');

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
	}
`;
export interface ParentProps { }

export const AboutBanner: React.SFC<ParentProps> = (props) => {
	return (
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
						<button>start your own impact project</button>
					</div>
				</BannerRight>
			</div>
		</div>
	);
};