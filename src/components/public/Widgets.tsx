import * as React from 'react';
import { Circle } from 'rc-progress';
import styled from 'styled-components';

const WidgetContainer = styled.div`

	.col-md-4 {
		position: relative;
	}

	.success, .rejected, .pending {
		position: absolute;
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
		const tm = setTimeout(this.increaseApproved, 30);

		const percentApproved = this.state.percentApproved + 1;

		if (percentApproved > 80) {
			clearTimeout(tm);
			return;
		}
		this.setState({ percentApproved });
	}

	increaseRejected = () => {
		const tm = setTimeout(this.increaseRejected, 30);

		const percentRejected = this.state.percentRejected + 1;

		if (percentRejected > 95) {
			clearTimeout(tm);
			return;
		}
		this.setState({ percentRejected });
	}

	increasePending = () => {
		const tm = setTimeout(this.increasePending, 30);

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

	render() {
		return (
			<WidgetContainer className="container-fluid">
				<div className="row">
					<div className="col-md-4">
						<Circle className="success" percent={this.state.percentApproved} trailColor="rgba(0,0,0,0)" strokeWidth="4" strokeColor="blue" />
						<Circle className="pending" percent={this.state.percentagePending} trailColor="rgba(0,0,0,0)" strokeWidth="4" strokeColor="orange" />
						<Circle className="rejected" percent={this.state.percentRejected} strokeWidth="4" strokeColor="red" />
					</div>
				</div>
			</WidgetContainer>
		);
	}
}