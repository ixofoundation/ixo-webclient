import * as React from 'react';
import styled from 'styled-components';
import '../../../assets/icons.css';
import { deviceWidth } from '../../../lib/commonData';
import AboutCards from './AboutCards';

const MattersContainer = styled.div`
	padding-left: 5%;
	padding-right: 5%;
`;
const MattersLeft = styled.div`
	width: 100%;
	margin-top: 80px;
	@media (max-width: ${deviceWidth.tablet}px){
		margin-top: 30px;
	}
	h2 {
		font-size: 60px;
		font-family: ${props => props.theme.fontRobotoCondensed};
		margin-bottom: 0;
		width: 100%;
		line-height: 45px;
	}
	h5 {
		font-size: 23px;
		font-weight: 300;
		padding-top: 10px;
		padding-bottom: 10px;
	}
	@media (max-width: 1024px){
		h5 {
			padding-top: 10px;
		}
	}
	@media (max-width: ${deviceWidth.tablet}px){
		h5 {
			padding-top: 10px;
		}
	}
	p {
		margin-top: 5%;
		position: relative;
		box-sizing: border-box;
		font-weight: 300;
		padding-right: 25%;
	}
	@media (max-width: ${deviceWidth.tablet}px){
		p {
			padding-right: 0;
			margin-top: 20px;
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
			top: -8%;
		}
	}
	@media (max-width: ${deviceWidth.mobile}px){
		p::before {
			top: -14%;
		}
	}
`;
export interface ParentProps { }

export const AboutMatters: React.SFC<ParentProps> = (props) => {
	return (
		<MattersContainer className="row">
			<div className="col-md-4">
				<MattersLeft>
					<h2>What matters</h2>
					<h5>The 2030 Sustainable<br /> Development Goals</h5>
					<p>The Sustainable Development Goals, otherwise known as the Global Goals, are a universal call to action to end poverty, protect the planet and ensure that all people enjoy peace and prosperity.
					</p>
				</MattersLeft>
			</div>
			<div className="col-md-8">
				<AboutCards />
			</div>
		</MattersContainer>
	);
};