import * as React from 'react';
import styled from 'styled-components';
import { deviceWidth } from '../../lib/commonData';

const tickImg = require('../../assets/images/member/icon-tick.svg');

const MemberContainer = styled.div`
	margin: 100px auto;
	text-align: center;
	@media (max-width: ${deviceWidth.tablet}px){
		margin: 40px auto 80px;
	}
	h2 {
		font-size: 48px;
		font-family: ${props => props.theme.fontRobotoCondensed};
		margin-bottom: 0;
		width: 100%;
		text-align: left;
	}
	button {
		background: none;
		color: ##282828;
		border: 1px solid #49BFE0;
		padding: 10px 150px;
		text-transform: uppercase;
		font-size: 15px;
		font-family: ${props => props.theme.fontRobotoCondensed};
		margin-top: 20px;
	}
	@media (max-width: ${deviceWidth.tablet}px){
		button {
			padding: 10px 60px;
		}
	}
`;

const MemberCards = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;
const CardsLeft = styled.div`
	width: 45%;
	margin: 10px 20px;
	@media (max-width: 1024px){
		width: 100%;
	}
`;
const CardsRight = styled.div`
	width: 45%;
	margin: 10px 20px;
	@media (max-width: 1024px){
		width: 100%;
	}
`;
const Card = styled.div`
	display: flex;
	align-items: center;
	background: linear-gradient(180deg, #FFFFFF 0%, #F4F4F4 100%);
	box-shadow: 50px 19px 38px rgba(0,0,0,0.01), 0 10px 22px rgba(0,0,0,0.06);
	padding: 20px;
	margin-bottom: 20px;
	min-height: 88px;
	p {
		margin-left: 10px;
		margin-bottom: 0;
		text-align: left;
	}
`;

export interface ParentProps { }

export const MemberBenefits: React.SFC<ParentProps> = (props) => {
	return (
		<MemberContainer className="container">
			<h2>Member benefits</h2>
			<MemberCards>
				<CardsLeft>
					<Card>
						<div><img src={tickImg} alt="" /></div>
						<p>Connect with people worldwide, all walks of life, and all backgrounds who share a common goal</p>
					</Card>
					<Card>
						<div><img src={tickImg} alt="" /></div>
						<p>Get notified of ixo events in your area</p>
					</Card>
					<Card>
						<div><img src={tickImg} alt="" /></div>
						<p>10% discount on ixo apparel and merchandise</p>
					</Card>
				</CardsLeft>
				<CardsRight>
					<Card>
						<div><img src={tickImg} alt="" /></div>
						<p>Exclusive news and updates</p>
					</Card>
					<Card>
						<div><img src={tickImg} alt="" /></div>
						<p>Get automatically added to our Token Sale Whitelist</p>
					</Card>
					<Card>
						<div><img src={tickImg} alt="" /></div>
						<p>First access to our ixo.world alpha launches</p>
					</Card>
				</CardsRight>
			</MemberCards>
			<button>become a member</button>
		</MemberContainer>
	);
};