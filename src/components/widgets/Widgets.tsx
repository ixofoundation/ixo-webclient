import * as React from 'react';
import { CircleProgressbar } from './CircleProgressbar';
import { CircleProgressbar2 } from './CircleProgressbar2';

export interface ParentProps {
	title: string;
	approved: number;
	rejected: number;
	pending: number;
	totalNeeded: number;
}

export class Widgets extends React.Component<ParentProps> {

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<CircleProgressbar
							title="test"
							approved={50}
							rejected={20}
							pending={10}
							totalNeeded={100}
						/>
					</div>
					<div className="col-md-3">
						<CircleProgressbar2
							title="test"
							approved={50}
							rejected={20}
							pending={10}
							totalNeeded={100}
						/>
					</div>
				</div>
			</div>
		);
	}
}