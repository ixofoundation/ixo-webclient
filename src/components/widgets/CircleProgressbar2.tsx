import * as React from 'react';
import styled from 'styled-components';

const WidgetContainer = styled.div`
	.demo {
		.u-absoluteCenter();
		.u-flexCenter();
		flex-direction: column;
		
		:first-child {
			margin-bottom: 20px;
		}
	}

	.progress {
		width: 100%;
		height: 100%;
		transform: rotate(-90deg);
	}

	.progress__meter,
	.progress__value {
		fill: none;
	}

	.progress__meter {
		stroke: #e6e6e6;
	}

	.progress__value {
		stroke-linecap: round;
	}
`;

const Text = styled.div`
	position: absolute;
	top: 50%; 
	left: 50%;
  	transform: translate(-50%,-50%);
`;

export interface ParentProps {
	title: string;
	approved: number;
	rejected: number;
	pending: number;
	totalNeeded: number;
}

export interface State {
	percentApproved: number;
	percentRejected: number;
	percentPending: number;
}

export class CircleProgressbar2 extends React.Component<ParentProps, State> {

	state = {
		percentApproved: 0,
		percentRejected: 0,
		percentPending: 0
	};

	componentDidMount() {
		this.increaseApproved('percentApproved');
	}

	// increasePercent = (type: string) => {

	// 	const percent = Object.assign({}, this.state[type]) + 1;
	// 	const tm = setTimeout(this.increasePercent(type), this.easingFormula(15));
	// 	const approvedMax = this.getMaxPercent(type);

	// 	if (percent >= approvedMax) {
	// 		clearTimeout(tm);
	// 		return;
	// 	}
	// 	// @ts-ignore
	// 	this.setState({ [type]: percent });
	// 	console.log(this.state[type]);
	// }

	increaseApproved = (type: string) => {
		const percent = this.state[type] + 1;
		const approvedMax = this.getMaxPercent(type);
		let tm = null;
		if (percent <= approvedMax) {
			// @ts-ignore
			this.setState({ [type]: percent });
			tm = setTimeout(() => this.increaseApproved(type), this.easingFormula(percent));
		} else {
			clearTimeout(tm);
			return;
		}
	}

	calcPercent = (amount: number, total: number) => {
		return (amount / total ) * 100; 
	}

	easingFormula = (amount: number) => {
		return 50;
	}

	getMaxPercent = (type: string) => {
		const { approved, rejected, pending, totalNeeded } = this.props;
		
		if (type === 'percentApproved') {
			return this.calcPercent(approved, totalNeeded);
		} else if (type === 'percentPending') {
			const approvedMax = this.calcPercent(approved, totalNeeded);
			return approvedMax + this.calcPercent(pending, totalNeeded);
		} else if (type === 'percentRejected') {
			const approvedMax = this.calcPercent(approved, totalNeeded);
			const pendingMax = approvedMax + this.calcPercent(pending, totalNeeded);
			return pendingMax + this.calcPercent(rejected, totalNeeded);
		} else {
			return 'type not specified';
		}
	}

	progress = (value) => {
		var RADIUS = 54;
		var CIRCUMFERENCE = 2 * Math.PI * RADIUS;
		var progress = value / 100;

		var dashoffset = CIRCUMFERENCE * (1 - progress);
					
		return dashoffset;
	}

	// static getCircumference = (radius: number) => {
	// 	return 2 * Math.PI * radius;
	// }

	render() {
		var RADIUS = 54;
		var CIRCUMFERENCE = 2 * Math.PI * RADIUS;

		return (
			<WidgetContainer className="container">
				<div className="row">
					<div className="col-md-12">
						<Text>
							<p>{this.props.approved}</p>
							<p>{this.props.totalNeeded}</p>
						</Text>
						<div className="demo">
							<svg className="progress" viewBox="0 0 120 120">
								<circle className="progress__meter" cx="60" cy="60" r="54" strokeWidth="6" />
								{/* <circle 
									className="progress__value" 
									cx="60" 
									cy="60" 
									r="54" 
									strokeDasharray={CIRCUMFERENCE} 
									strokeWidth="12" 
									stroke="url(#gradientRejected)" 
									strokeDashoffset={this.progress(this.state.percentApproved)}
								/>
								<circle 
									className="progress__value" 
									cx="60" 
									cy="60" 
									r="54" 
									strokeWidth="12" 
									strokeDasharray={CIRCUMFERENCE} 
									stroke="url(#gradientPending)" 
									strokeDashoffset={this.progress(50)}
								/> */}
								<circle 
									className="progress__value" 
									cx="60" 
									cy="60" 
									r="54" 
									strokeWidth="12" 
									strokeDasharray={CIRCUMFERENCE} 
									stroke="url(#gradientApproved)" 
									strokeDashoffset={this.progress(this.state.percentApproved)}
								/>
								<defs>
							<linearGradient id="gradientApproved" x1="0%" y1="0%" x2="0%" y2="100%">
								<stop offset="0%" stopColor="#00bc9b" />
								<stop offset="100%" stopColor="#5eaefd" />
							</linearGradient>
							<linearGradient id="gradientRejected" x1="0%" y1="0%" x2="0%" y2="100%">
								<stop offset="0%" stopColor="red" />
								<stop offset="100%" stopColor="brown" />
							</linearGradient>
							<linearGradient id="gradientPending" x1="0%" y1="0%" x2="0%" y2="100%">
								<stop offset="0%" stopColor="orange" />
								<stop offset="100%" stopColor="yellow" />
							</linearGradient>
						</defs>
							</svg>
						</div>
					</div>
				</div>
			</WidgetContainer>
		);
	}
}