import * as React from 'react';
import { Circle } from 'rc-progress';
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
		// setTimeout(this.calcTotal, 1000);
	}

	increaseApproved = () => {

		const percentApproved = this.state.percentApproved + 1;
		const tm = setTimeout(this.increaseApproved, this.easingFormula(percentApproved));
		const approvedMax = this.getMaxPercent('approved');

		if (percentApproved >= approvedMax) {
			clearTimeout(tm);
			return;
		}
		this.setState({ percentApproved });
	}

	progress = (value) => {
		var RADIUS = 54;
		var CIRCUMFERENCE = 2 * Math.PI * RADIUS;
		var progress = value / 100;

		var dashoffset = CIRCUMFERENCE * (1 - progress);
					
		return dashoffset;
	}

	static getCircumference = (radius: number) => {
		return 2 * Math.PI * radius;
	}

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
						<Circle 
							className="success" 
							percent={this.state.percentApproved} 
							trailColor="rgba(0,0,0,0)"
							strokeWidth="6"
							startColor="#033c50"
							endColor="#07d0fb"
						/>
						<div className="demo">
							<svg className="progress" viewBox="0 0 120 120">
								<circle className="progress__meter" cx="60" cy="60" r="54" stroke-width="6" />
								<circle 
									className="progress__value" 
									cx="60" 
									cy="60" 
									r="54" 
									strokeDasharray={CIRCUMFERENCE} 
									stroke-width="12" 
									stroke="url(#gradientRejected)" 
									strokeDashoffset={this.progress(75)}
								/>
								<circle 
									className="progress__value" 
									cx="60" 
									cy="60" 
									r="54" 
									stroke-width="12" 
									strokeDasharray={CIRCUMFERENCE} 
									stroke="url(#gradientPending)" 
									strokeDashoffset={this.progress(50)}
								/>
								<circle 
									className="progress__value" 
									cx="60" 
									cy="60" 
									r="54" 
									stroke-width="12" 
									strokeDasharray={CIRCUMFERENCE} 
									stroke="url(#gradientApproved)" 
									strokeDashoffset={this.progress(25)}
								/>
								<defs>
							<linearGradient id="gradientApproved" x1="0%" y1="0%" x2="0%" y2="100%">
								<stop offset="0%" stop-color="#00bc9b" />
								<stop offset="100%" stop-color="#5eaefd" />
							</linearGradient>
							<linearGradient id="gradientRejected" x1="0%" y1="0%" x2="0%" y2="100%">
								<stop offset="0%" stop-color="red" />
								<stop offset="100%" stop-color="brown" />
							</linearGradient>
							<linearGradient id="gradientPending" x1="0%" y1="0%" x2="0%" y2="100%">
								<stop offset="0%" stop-color="orange" />
								<stop offset="100%" stop-color="yellow" />
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