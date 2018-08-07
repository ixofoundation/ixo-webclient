import * as React from 'react';
import styled from 'styled-components';
const infographic = require('../../assets/images/referral/infographic.jpg');

const Container = styled.div`
	justify-content: center;
	display: flex;
	max-width: 100%;

	@media (max-width: 1060px){
		flex-direction: column;
	}
`;

const IframeHolder = styled.div`
	margin-top: 30px;
	width: 100%;
	max-width: 500px;
	
	p {
		color: white;
		font-weight: 300;
		font-size: 14px;
		margin-bottom: 40px;
	}

	img {
		box-shadow: 1px 25px 35px -12px rgba(116,114,114,0.1);
		width: 100%;
	}

	@media (max-width: 1060px) {
		margin-top: 40px;
	}
`;

const Card = styled.div`
	background: white;
	width: 465px;
	max-width: 100%;
	height: 630px;
	overflow: hidden;
	box-shadow: 1px 25px 35px -12px rgba(116,114,114,0.1);
	margin: 0 0 0 45px;
	padding: 15px;
	text-align: center;
	transition: all 0.5s ease-out;

	@media (max-width: 1060px){
		width: 500px;
		margin: 60px 0 40px;
	}

	@media (max-width: 450px) {
		height: 700px;
	}

	@media (max-width: 400px) {
		height: 760px;
	}
`;

const Count = styled.div`
	margin-top: 20px;
	background: white;
	height: 240px;
	max-width: 500px;
	box-shadow: 1px 25px 35px -12px rgba(116,114,114,0.1);

`;

export interface ParentProps {
	shared: boolean;
}

export const ReferralCols: React.SFC<ParentProps> = (props) => {

	const getIframe = () => {
		if (window.innerWidth < 400) {
			// @ts-ignore
			return <iframe src="https://player.vimeo.com/video/264055837?title=0&byline=0&portrait=0" width="320" height="180" frameBorder="0" allowFullScreen={true} />;
		}
		if (window.innerWidth < 550) {
			// @ts-ignore
			return <iframe src="https://player.vimeo.com/video/264055837?title=0&byline=0&portrait=0" width="360" height="281" frameBorder="0" allowFullScreen={true} />;
		}
		// @ts-ignore
		return <iframe src="https://player.vimeo.com/video/264055837?title=0&byline=0&portrait=0" width="500" height="281" frameBorder="0" allowFullScreen={true} />;
	};

	return (
		<Container>
			<IframeHolder>
				{props.shared ? 
				<p>Now that you’ve signed up, we want to reward you for doing good. Share your unique citizen code with your friends and enjoy the benefits of our referral program. </p>
				:
				<p>Become one of the first citizens of ixo world where global goals to end poverty, protect the planet and ensure prosperity for all are easily measured and achieved.</p>
				}
				{props.shared ? <img src={infographic} /> : getIframe()}
				{props.shared && <Count data-vl-widget="referralCountWidget"/>}
			</IframeHolder>
			<Card>
				<div data-vl-widget="embedForm" />
			</Card>
		</Container>
	);
};