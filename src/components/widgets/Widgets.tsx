import * as React from 'react';
import { CircleProgressbar } from './CircleProgressbar';
import { WorldMap } from './WorldMap';
// import Sunburst from './SunBurst';
// import BarChart from './BarChart';

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
					<div className="col-md-12">
						<WorldMap />
					</div>
					<div className="col-md-6">
						{/* <Sunburst /> */}
					</div>
					<div className="col-md-3">
						<CircleProgressbar
							approved={50}
							rejected={60}
							pending={10}
							totalNeeded={200}
						/>
					</div>
					<div className="col-md-12">
						{/* <BarChart totalBars={100} /> */}
					</div>
				</div>
			</div>
		);
	}
}