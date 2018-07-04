import * as React from 'react';
import { CircleProgressbar } from './CircleProgressbar';

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
							approved={10}
							rejected={5}
							pending={2}
							totalNeeded={100}
						/>
					</div>
				</div>
			</div>
		);
	}
}