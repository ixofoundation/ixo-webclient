import * as React from 'react';
import styled from 'styled-components';
import { deviceWidth } from '../../../lib/commonData';

const innoLogo = require('../../../assets/images/eco/logo-innovationedge.png');

const CollectionContainer = styled.div`
	background: #F6F6F6;
	padding: 40px 0;
	margin-top: 60px;
	@media (max-width: ${deviceWidth.mobile}px){
		margin-top: 30px;
		padding: 0;
	}
`;

const EcoCards = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;
const Card = styled.div`
	background: linear-gradient(180deg, #FFFFFF 0%, #F4F4F4 100%);
	border: 1px solid #E2E2E2;
	box-shadow: 0 8px 16px -2px rgba(0,0,0,0.03);
	text-align: center;
	flex: 1 0 20%;
	margin: 10px;
	padding: 15px;
	-webkit-transition: all 0.5s ease-out;
	-moz-transition: all 0.5s ease-out;
	-o-transition: all 0.5s ease-out;
	transition: all 0.5s ease-out;
	img {
		padding-bottom: 20px;
	}
	p {
		font-size: 14px;
		color: #4C4C4C;
		font-weight: 300;
	}
	.website {
		display: none;
	}
	&:hover {
		background: rgba(1,25,38,0.94);
		box-shadow: 0 2px 10px 0 rgba(0,0,0,0.18);
		text-align: center;
		img {
			display: none;
		}
		p {
			display: none;
		}
		.website {
			display: inline-block;
			position: relative;
			top: calc(50% - 17.5px);
			height: 35px;
			color: white;
			background: none;
			border: 1px solid #00D2FF;
			border-radius: 2px;
			cursor: pointer;
			padding: 0 20px;
			font-size: 14px;
			font-weight: 300;
		}
	}
`;

export interface ParentProps { }

export const EcoCollection: React.SFC<ParentProps> = (props) => {
	return (
		<CollectionContainer className="container-fluid">
			<div className="container">
				<EcoCards>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
						<button className="website">Website</button>
					</Card>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
						<button className="website">Website</button>
					</Card>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
						<button className="website">Website</button>
					</Card>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
						<button className="website">Website</button>
					</Card>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
						<button className="website">Website</button>
					</Card>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
						<button className="website">Website</button>
					</Card>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
						<button className="website">Website</button>
					</Card>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
						<button className="website">Website</button>
					</Card>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
						<button className="website">Website</button>
					</Card>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
						<button className="website">Website</button>
					</Card>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
						<button className="website">Website</button>
					</Card>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
						<button className="website">Website</button>
					</Card>
				</EcoCards>
			</div>
		</CollectionContainer>
	);
};