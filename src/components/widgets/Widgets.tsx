import * as React from 'react';
import { Circle } from 'rc-progress';
import styled from 'styled-components';

const WidgetContainer = styled.div`

	margin: 30px 0;

	.col-md-4 {
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
}

export class Widgets extends React.Component<ParentProps> {

	state = {
		percentApproved: 0,
		percentRejected: 0,
		percentagePending: 0
	};

	componentDidMount() {
		this.increaseApproved();
		this.increaseRejected();
		this.increasePending();
	}

	increaseApproved = () => {
		const tm = setTimeout(this.increaseApproved, 15);

		const percentApproved = this.state.percentApproved + 1;

		if (percentApproved > 80) {
			clearTimeout(tm);
			return;
		}
		this.setState({ percentApproved });
	}

	increaseRejected = () => {
		const tm = setTimeout(this.increaseRejected, 15);

		const percentRejected = this.state.percentRejected + 1;

		if (percentRejected > 95) {
			clearTimeout(tm);
			return;
		}
		this.setState({ percentRejected });
	}

	increasePending = () => {
		const tm = setTimeout(this.increasePending, 15);

		const percentagePending = this.state.percentagePending + 1;

		if (percentagePending > 85) {
			clearTimeout(tm);
			return;
		}
		this.setState({ percentagePending });
	}

		// const total = 100;

		// const approved = 30;
		// const pending = 15;
		// const rejected = 24;

		// const approvedPercent = (approved / total) * 100;
		// const rejectedPercent = (rejected / total) * 100;
		// const pendingPercent = (pending / total) * 100;

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
					<div className="col-md-3">
						<Text>
							<p>Test text</p>
							<p>Test text</p>
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
							percent={this.state.percentagePending}
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