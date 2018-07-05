import * as React from 'react';
import { Circle } from 'rc-progress';
import styled from 'styled-components';

const WidgetContainer = styled.div`

	margin: 30px 0;

	.col-md-12 {
		position: relative;
	}

	.success, .pending {
		position: absolute;
		top: 0;
		left: 15px;
	}

	.rejected {
		position: relative;
		top: 0;
		left: 0;
	}

	.success {
		z-index: 2;
	}

	.pending {
		z-index: 1;
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

export class CircleProgressbar extends React.Component<ParentProps, State> {

	state = {
		percentApproved: 0,
		percentRejected: 0,
		percentPending: 0
	};

	componentDidMount() {
		setTimeout(this.calcTotal, 1000);
	}

	calcTotal = () => {				
		this.increaseApproved();
		this.increaseRejected();
		this.increasePending();
	}

	calcPercent = (amount: number, total: number) => {
		return (amount / total ) * 100; 
	}

	easingFormula = (amount: number) => {
		return 15;
	}

	getMaxPercent = (type: string) => {
		const { approved, rejected, pending, totalNeeded } = this.props;
		
		if (type === 'approved') {
			return this.calcPercent(approved, totalNeeded);
		} else if (type === 'pending') {
			const approvedMax = this.calcPercent(approved, totalNeeded);
			return approvedMax + this.calcPercent(pending, totalNeeded);
		} else if (type === 'rejected') {
			const approvedMax = this.calcPercent(approved, totalNeeded);
			const pendingMax = approvedMax + this.calcPercent(pending, totalNeeded);
			return pendingMax + this.calcPercent(rejected, totalNeeded);
		} else {
			return 'type not specified';
		}
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

	increasePending = () => {

		const percentPending = this.state.percentPending + 1;
		const tm = setTimeout(this.increasePending, this.easingFormula(percentPending));
		const pendingMax = this.getMaxPercent('pending');

		if (percentPending >= pendingMax) {
			clearTimeout(tm);
			return;
		}
		this.setState({ percentPending });
	}

	increaseRejected = () => {

		const percentRejected = this.state.percentRejected + 1;
		const tm = setTimeout(this.increaseRejected, this.easingFormula(percentRejected));
		const rejectedMax = this.getMaxPercent('rejected');

		if (percentRejected > rejectedMax) {
			clearTimeout(tm);
			return;
		}
		this.setState({ percentRejected });
	}

		// BELOW TO ADD GRADIENT FILL in node_module, file called Circle.js
		// return React.createElement(
		// 	'svg',
		// 	_extends({
		// 	  className: prefixCls + '-circle ' + className,
		// 	  viewBox: '0 0 100 100',
		// 	  style: style
		// 	}, restProps),
		// 	React.createElement('defs', {},
		// 	  React.createElement('linearGradient',{
		// 		  id: className,
		// 		  x1: '0%',
		// 		  y1: "0%",
		// 		  x2: "100%",
		// 		  y2: "0%",
		// 		  gradientUnits: "userSpaceOnUse"
		// 	  },
		// 		  React.createElement('stop',{
		// 			  offset: "0%",
		// 			  stopColor: startColor
		// 		  },
		// 		  ),
		// 		  React.createElement('stop',{
		// 			  offset:"100%",
		// 			  stopColor: endColor
		// 		  },
		// 		  )
		// 	  )
		// 	),
		// 	React.createElement('path', {
		// 	  className: prefixCls + '-circle-trail',
		// 	  d: pathString,
		// 	  stroke: trailColor,
		// 	  strokeWidth: trailWidth || strokeWidth,
		// 	  fillOpacity: '0',
		// 	  style: trailPathStyle
		// 	}),
		// 	React.createElement('path', {
		// 	  className: prefixCls + '-circle-path',
		// 	  d: pathString,
		// 	  strokeLinecap: strokeLinecap,
		// 	  stroke: `url(#${className})`,
		// 	  strokeWidth: this.props.percent === 0 ? 0 : strokeWidth,
		// 	  fillOpacity: '0',
		// 	  ref: function ref(path) {
		// 		_this2.path = path;
		// 	  },
		// 	  style: strokePathStyle
		// 	})
		//   );
		// };

	render() {
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
						<Circle 
							className="pending"
							percent={this.state.percentPending}
							trailColor="rgba(0,0,0,0)"
							strokeWidth="6"
							startColor="orange"
							endColor="yellow"
						/>
						<Circle 
							className="rejected"
							trailColor="#033c50"
							trailWidth="3"
							percent={this.state.percentRejected}
							strokeWidth="6"
							startColor="red"
							endColor="brown"

						/>
					</div>
				</div>
			</WidgetContainer>
		);
	}
}