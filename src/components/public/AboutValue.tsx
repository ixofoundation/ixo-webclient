import * as React from 'react';
import styled from 'styled-components';

const bgImg = require('../../assets/images/about/about-value-bg.jpg');

const ValueContainer = styled.div`
	padding: 5% 60px;
	background: ${props => props.theme.bg.blue} url(${bgImg}) no-repeat;
	background-size: cover;
	background-position: center;
	color: white;
`;

const ValueLeft = styled.div`

`;
const ValueRight = styled.div`
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
	p:first-of-type {
		margin-top: 5%;
		position: relative;
		box-sizing: border-box;
		font-weight: 300;
		line-height: 26px;
		padding-right: 25%;
	}
	p:first-of-type::before {
		content: " ";
		display: block;
		position: absolute;
		height: 1px;
		background: #00D2FF;
		width: 100px;
		top: -20%;
	}
`;

export interface ParentProps { }

export const AboutValue: React.SFC<ParentProps> = (props) => {
	return (
		<ValueContainer className="row">
			<div className="col-md-4">
				<ValueLeft>
					ChartJS goes here*
				</ValueLeft>
			</div>
			<div className="col-md-8">
				<ValueRight>
					<h2>What we value</h2>
					<h5>Data + trust = optimised IMPACT</h5>
					<p>The ixo protocol ensures the provenance of impact data over time, transparency of impact funding, accountability of performance, attribution for results and a marketplace mechanism for sharing impact data. The most exciting innovation for impact financing is that the ixo protocol creates a new asset class for the impact economy.
					</p>
					<p><strong>Explore the ixo projects and how see how impact data is changing their end goal.</strong></p>
				</ValueRight>
			</div>
		</ValueContainer>
	);
};