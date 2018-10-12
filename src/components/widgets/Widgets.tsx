import * as React from 'react';
import { CircleProgressbar } from './CircleProgressbar';
import { WorldMap } from './WorldMap';
// import Sunburst from './SunBurst';
import BarChart, { BarColors } from './BarChart';
import { successToast, warningToast, errorToast } from '../helpers/Toast';

export interface ParentProps {
	title: string;
	approved: number;
	rejected: number;
	pending: number;
	totalNeeded: number;
}

export class Widgets extends React.Component<ParentProps> {

	// BELOW IS DUMMY DATA GENERATION FOR THE BARCHART COMPONENT

	randomDate(start: Date, end: Date) {
		return new Date(start.getTime() + (Math.random() * (end.getTime() - start.getTime())));
	}

	generateClaims = (status: number, length: number) => {
		const claimsArray = new Array();

		for (let i = 0; i < length; i++) {
			const claimObject = {
				date: this.randomDate(new Date(2018, 6, 11), new Date()),
				status: status
			};

			claimsArray.push(claimObject);
		}

		for (let i = 0; i < claimsArray.length; i ++) {
			claimsArray.sort(function (a: any, b: any) {
				return Date.parse(a.date) - Date.parse(b.date);
			});
		}
		return claimsArray;
	}

	dummyApprovedClaims = this.generateClaims(1, 30);
	dummyPendingClaims = this.generateClaims(0, 20);
	dummyRejectedClaims = this.generateClaims(2, 15);

	// END OF DUMMY DATA GENERATION FOR BAR CHART

	success = () => successToast('Successful');
	warning = () => warningToast('Warning');
	error = () => errorToast('Error');
	
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<button onClick={this.success}>Success Toast</button>
						<button onClick={this.warning}>Warning Toast</button>
						<button onClick={this.error}>Error Toast</button>
					</div>
					<div className="col-md-12">
						<WorldMap markers={[]}/>
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
							descriptor="claims verified"
						/>
					</div>
					<div className="col-md-12">
						<BarChart 							
							barData={[
								{data: this.dummyRejectedClaims, color: BarColors.red, label: 'Claims Rejected'},
								{data: this.dummyApprovedClaims, color: BarColors.blue, label: 'Claims Approved'},
								{data: this.dummyPendingClaims, color: BarColors.darkBlue, label: 'Claims Submitted'}
							]}
						/>
					</div>
				</div>
			</div>
		);
	}
}