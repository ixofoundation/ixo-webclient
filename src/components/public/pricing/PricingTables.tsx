import * as React from 'react';
import styled from 'styled-components';
import { deviceWidth } from '../../../lib/commonData';

const tickImg = require('../../../assets/images/member/icon-tick.svg');

const PricingCards = styled.div`
	margin-top: -180px;
	padding: 0 15% 60px 15%;

	@media (min-width: ${deviceWidth.tablet}px){
		padding: 0 10% 60px 10%;
	}
`;
const PricingTable = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;
const Card = styled.div`
	background: #FFFFFF 0%;
	-webkit-box-shadow: 1px 25px 35px -12px rgba(116,114,114,0.1);
	-moz-box-shadow: 1px 25px 35px -12px rgba(116,114,114,0.1);
	box-shadow: 1px 25px 35px -12px rgba(116,114,114,0.1);
	flex: 1 0 40%;
	margin: 35px;
	padding: 15px;
	text-align: center;
	-webkit-transition: all 0.5s ease-out;
	-moz-transition: all 0.5s ease-out;
	-o-transition: all 0.5s ease-out;
	transition: all 0.5s ease-out;
	.personal&::before {
		content: " ";
		display: block;
		position: relative;
		height: 8px;
		background: #F89D28;
		width: 100px;
		top: -23px;
	}
	.corporate&::before {
		content: " ";
		display: block;
		position: relative;
		height: 8px;
		background: #5AB946;
		width: 100px;
		top: -23px;
	}
	@media (max-width: ${deviceWidth.tablet}px){
		flex: 1 0 50%;
	}
	@media (max-width: ${deviceWidth.mobile}px){
		margin: 100px 0 40px 0;
	}
	h3 {
		font-family: ${props => props.theme.fontRobotoCondensed};
		text-align: center;
		font-size: 32px;
	}
	ul {
		text-align: left;
		list-style-image: url(${tickImg});
		margin-left: 20px;
		color: #656969;
	}
	ul li {
		padding: 20px;
		border-bottom: 1px solid rgba(171, 171, 171, 0.2);
	}
	ul li:last-child {
		border-bottom: none;
	}
	button {
		background: none;
		color: #282828;
		border: 1px solid #49BFE0;
		padding: 10px;
		width: 70%;
		margin: 0 auto;
		text-transform: uppercase;
		font-size: 15px;
		font-family: ${props => props.theme.fontRobotoCondensed};
		margin-top: 20px;
		margin-bottom: 20px;
		cursor: pointer;
	}
`;

export interface ParentProps { }

export const PricingTables: React.SFC<ParentProps> = (props) => {
	return (
		<PricingCards className="row">
			<PricingTable className="col-md-10 offset-md-1">
				<Card className="personal">
					<h3>Personal</h3>
					<ul>
						<li>Plan structure 1</li>
						<li>Plan structure 1</li>
						<li>Plan structure 1</li>
						<li>Plan structure 1</li>
					</ul>
					<button>Buy Now</button>
				</Card>
				<Card className="corporate">
					<h3>Corporate</h3>
					<ul>
						<li>Plan structure 1</li>
						<li>Plan structure 1</li>
						<li>Plan structure 1</li>
						<li>Plan structure 1</li>
					</ul>
					<button>Buy Now</button>
				</Card>
			</PricingTable>
		</PricingCards>
	);
};