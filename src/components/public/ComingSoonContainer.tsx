import * as React from 'react';
import styled from 'styled-components';
import { ModalWrapper } from '../common/ModalWrapper';
import * as moment from 'moment';
import CountdownTimer from 'react-awesome-countdowntimer';
import { deviceWidth, onboardJson } from '../../lib/commonData';
import DynamicForm from '../form/DynamicForm';
import { FormStyles } from '../../types/models';

const globe = require('../../assets/images/home/globe.png');

const Container = styled.div`
	height: calc(100vh - 147px);
	background: radial-gradient(ellipse at top left, #035d7a 0%,#022b3f 50%);
	h1 {
		font-size: 55px;
		font-family: ${props => props.theme.fontRobotoCondensed};
		font-weight: 300;
		line-height: 50px;
		margin: 80px 0 0;
		width: 100%;
		span {
			color: #83D9F2;
			text-transform: uppercase;
		}
	}
	p {
		padding-top: 40px;
		position: relative;
		box-sizing: border-box;
		font-size: 23px;
		font-weight: 300;
		margin-bottom: 0;
	}
	p::before {
		content: " ";
		display: block;
		position: absolute;
		height: 1px;
		background: #00D2FF;
		width: 200px;
		top: 26%;
	}
	button {
		background: none;
		color: white;
		border: 1px solid #49BFE0;
		padding: 10px 40px;
		margin-top: 20px;
		text-transform: uppercase;
		font-size: 18px;
		font-family: ${props => props.theme.fontRobotoCondensed};
		cursor: pointer;
		outline: none;
	}
	.countdown-timer {
		justify-content: left !important;
		padding-right: 5px;
		max-width: 300px;
		.section {
			min-width: 50px !important;
			min-height: 0 !important;
			background: none !important;
			border-radius: 0 !important;
			display: absolute !important;
		}
		.section::after {
			content: ":";
			position: relative;
			height: 1px;
			color: white;
			right: -38px;
			top: -60px;
			font-size: 30px;
			&::last-child{
				content: " ";
				color: black;
			}
		}
		.section:last-child:after {
			content:"";
		}
		.label {
			display: none !important;
		}
		.time {
			font-size: 45px !important;
		}
	}
`;

const OnboardFormStyle = styled.div`
	padding: 20px 5px;
	width: 400px;
	height: 350px;
	overflow: hidden;
	@media (max-width: ${deviceWidth.mobile}px){
		padding: 20px 0;
		width: 320px;
		height: 320px;
	}
	h5 {
		font-family: "Roboto Condensed";
		font-size: 23px;
		text-transform: uppercase;
	}
	.success-msg {
		font-size: 15px;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 260px;
		@media (max-width: ${deviceWidth.mobile}px){
			height: 210px;
		}
		p {
			margin-bottom: 0;
		}
	}
`;

const GlobeWrapper = styled.div`
	background: url(${globe}) no-repeat center center;
	background-size: auto calc(100vh - 200px);
	height: 100%;
	
	br {
		display: none;
	}

	> .row {
		height: 100%;
		align-items: center;
		background: rgba(0,0,0,0.5);

		h1 {
			margin-top: 0;
		}

		@media(min-width: ${deviceWidth.tablet}px) {
			background: none;
		}
	}

	.countdown-timer > div {
		justify-content: space-between!important;
	}

	@media (min-width: ${deviceWidth.desktop}px) {
		br {
			display: block;
		}
	}
`;

export interface ParentProps {
	projectDid: string;
}

export interface Props extends ParentProps { }

export class ComingSoonContainer extends React.Component<Props> {
	state = {
		isModalOpen: false,
		success: false,
	};

	// handleSubmit(e: any) {
	// 	console.log(e);
	// }
	// renderSuccess() {
	// 	return (
	// 		<div>
	// 			<p><strong>Your info has been submitted successfully.</strong></p>
	// 			<p>The ixo support team will be in contact with you shortly.</p>
	// 		</div>
	// 	);
	// }
	handleToggleModal = (modalStatus: boolean) => {
		this.setState({ isModalOpen: modalStatus });
	}

	handleSubmitForm = (event: any) => {
		console.log(event);
		this.setState({
			success: true
		});
	}

	handleRenderModal = () => {
		if (this.state.success) {
			return (
				<div className="success-msg">
					<p style={{ fontWeight: 600 }}>Your info has been submitted successfully.</p>
					<p>The ixo support team will be in contact wiht you shortly.</p>
				</div>
			);
		} else {
			let formJson = JSON.parse(onboardJson);
			if (formJson.fields.length > 0) {
				return (
					<DynamicForm
						formStyle={FormStyles.modal}
						formSchema={formJson.fields}
						handleSubmit={this.handleSubmitForm}
						submitText={'Join Now'}
					/>
				);
			} else {
				return <p>No Template found</p>;
			}
		}
	}

	render() {
		return (
			<Container className="container-fluid text-white">
				<GlobeWrapper>
					<div className="container">
						<div className="col-md-12">
							<ModalWrapper
								isModalOpen={this.state.isModalOpen}
								handleToggleModal={(e: any) => this.handleToggleModal(e)}
							>
								<OnboardFormStyle>
									<h5>Be the first to onboard</h5>
									{this.handleRenderModal()}
								</OnboardFormStyle>
							</ModalWrapper>
						</div>
					</div>
					<div className="row">
						<div className="offset-1 col-lg-6 col-sm-11">
							<h1>A <span>New</span><br /> world is<br /> coming</h1>
							<p>Count what matters.<br />Value what counts.</p>
							<div className="countdown-timer">
								<CountdownTimer endDate={moment('07/12/2018')} />
							</div> 
							<button onClick={() => this.handleToggleModal(true)}>Be the first to onboard</button>
						</div>
					</div>
				</GlobeWrapper>
			</Container>
		);
	}
}