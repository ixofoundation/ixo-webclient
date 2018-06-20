import * as React from 'react';
import styled from 'styled-components';

const iconCard = require('../../assets/images/about/sdg-nopoverty.png');

const MattersContainer = styled.div`
	padding-left: 5%;
	padding-right: 5%;
`;
const MattersLeft = styled.div`
	width: 100%;
	margin-top: 40px;
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
		padding-right: 25%;
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
`;
const MattersRight = styled.div`
	width: 85%;
	display: inline-flex;
	position: relative;
	top: -80px;
	img {
		margin-bottom: 15px;
	}

`;
export interface ParentProps { }

export const AboutMatters: React.SFC<ParentProps> = (props) => {
	return (
		<MattersContainer className="row">
			<div className="col-md-4">
				<MattersLeft>
					<h2>What matters</h2>
					<h5>The 2030 Sustainable Development Goals</h5>
					<p>The Sustainable Development Goals, otherwise known as the Global Goals, are a universal call to action to end poverty, protect the planet and ensure that all people enjoy peace and prosperity.
					</p>
				</MattersLeft>
			</div>
			<div className="col-md-8">
				<MattersRight>
					<div className="col-md-2">
						<img src={iconCard} alt="" />
						<img src={iconCard} alt="" />
						<img src={iconCard} alt="" />
					</div>
					<div className="col-md-2">
						<img src={iconCard} alt="" />
						<img src={iconCard} alt="" />
						<img src={iconCard} alt="" />
					</div>
					<div className="col-md-2">
						<img src={iconCard} alt="" />
						<img src={iconCard} alt="" />
						<img src={iconCard} alt="" />
					</div>
					<div className="col-md-2">
						<img src={iconCard} alt="" />
						<img src={iconCard} alt="" />
						<img src={iconCard} alt="" />
					</div>
					<div className="col-md-2">
						<img src={iconCard} alt="" />
						<img src={iconCard} alt="" />
						<img src={iconCard} alt="" />
					</div>
					<div className="col-md-2">
						<img src={iconCard} alt="" />
						<img src={iconCard} alt="" />
						<img src={iconCard} alt="" />
					</div>
				</MattersRight>
			</div>
		</MattersContainer>
	);
};