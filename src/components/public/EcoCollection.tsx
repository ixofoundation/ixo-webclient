import * as React from 'react';
import styled from 'styled-components';

const innoLogo = require('../../assets/images/eco/logo-innovationedge.png');

const CollectionContainer = styled.div`
	background: #F6F6F6;
	padding: 40px 0;
	margin-top: 60px;
`;

const EcoCards = styled.div`
	padding-bottom: 60px;
`;
const Card = styled.div`
	background: linear-gradient(180deg, #FFFFFF 0%, #F4F4F4 100%);
	border: 1px solid #E2E2E2;
	box-shadow: 0 8px 16px -2px rgba(0,0,0,0.03);
	padding: 20px;
	margin: 40px 0 20px;
	text-align: center;
	img {
		padding-bottom: 20px;
	}
	p {
		font-size: 14px;
		color: #4C4C4C;
		font-weight: 300;
	}
`;

export interface ParentProps { }

export const EcoCollection: React.SFC<ParentProps> = (props) => {
	return (
		<CollectionContainer>
			<EcoCards className="row">
				<div className="col-md-2" />
				<div className="col-md-2">
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
					</Card>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
					</Card>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
					</Card>
				</div>
				<div className="col-md-2">
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
					</Card>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
					</Card>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
					</Card>
				</div>
				<div className="col-md-2">
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
					</Card>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
					</Card>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
					</Card>
				</div>
				<div className="col-md-2">
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
					</Card>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
					</Card>
					<Card>
						<img src={innoLogo} alt="" />
						<p>Innovation Edge</p>
					</Card>
				</div>
				<div className="col-md-2" />
			</EcoCards>
		</CollectionContainer>
	);
};