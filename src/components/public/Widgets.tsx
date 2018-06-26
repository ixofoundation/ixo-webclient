import * as React from 'react';
import { Circle } from 'rc-progress';

export interface ParentProps {
	title: string;
}

export class Widgets extends React.Component<ParentProps> {

	state = {
		percent: 0
	};

	componentDidMount() {
		this.increase();
	}

	increase = () => {
		const tm = setTimeout(this.increase, 10);

		const percent = this.state.percent + 1;

		if (percent > 100) {
			clearTimeout(tm);
			return;
		}
		this.setState({ percent });
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
			<div className="icon-container-fluid">
				<div className="icon-row">
					<div className="icon-col-md-4"><Circle percent={this.state.percent} strokeWidth="4" strokeColor="blue" /></div>
				</div>
			</div>
		);
	}
}