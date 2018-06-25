import * as React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
	background: #F6F6F6;
	margin-top: 60px;
	padding: 40px 0;
	h2 {
		font-size: 60px;
		font-family: ${props => props.theme.fontRobotoCondensed};
		margin-bottom: 0;
		width: 100%;
		text-align: left;
	}
`;

const FaqCards = styled.div`
	padding-bottom: 60px;
`;
const Card = styled.div`
	background: linear-gradient(180deg, #FFFFFF 0%, #F4F4F4 100%);
	box-shadow: 50px 19px 38px rgba(0,0,0,0.01), 0 10px 22px rgba(0,0,0,0.06);
	padding: 20px;
	margin: 40px 0 20px;
	h3 {
		padding-bottom: 10px;
		font-size: 17px;
		line-height: 50px;
	}
	h3::after {
		content: " ";
		display: block;
		height: 1px;
		background: #E5E5E5;
		width: 100%;
	}
`;

export interface ParentProps { }

export const FaqSection: React.SFC<ParentProps> = (props) => {
	return (
		<CardContainer>
			<div className="row">
				<div className="col-md-2" />
				<div className="col-md-10">
					<h2>FAQ</h2>
				</div>
			</div>
			<FaqCards className="row">
				<div className="col-md-2" />
				<div className="col-md-8">
					<Card>
						<h3>How do I create a project?</h3>
						<p>Answer, it's so simple let us explain...</p>
					</Card>
					<Card>
						<h3>How do I create a project?</h3>
						<p>Answer, it's so simple let us explain...</p>
					</Card>
					<Card>
						<h3>How do I create a project?</h3>
						<p>Answer, it's so simple let us explain...</p>
					</Card>
				</div>
				<div className="col-md-2" />
			</FaqCards>
		</CardContainer>
	);
};