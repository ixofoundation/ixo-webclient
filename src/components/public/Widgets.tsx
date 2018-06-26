import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';

export interface ParentProps {
	title: string;
}

export const Widgets: React.SFC<ParentProps> = (props) => {

	const getClaimStatistics = () => {

		const total = 100;

		const approved = 30;
		const pending = 15;
		const rejected = 24;

		const approvedPercent = (approved / total) * 100;
		const rejectedPercent = (rejected / total) * 100;
		const pendingPercent = (pending / total) * 100;

		const data = {
			labels: [
				'Approved',
				'Pending',
				'Rejected'
			],
			datasets: [{
				data: [approvedPercent, pendingPercent, rejectedPercent],
				backgroundColor: [
					// tslint:disable-next-line:no-shadowed-variable
					`linear-gradient(to bottom, #1e5799 0%,#7db9e8 100%)`,
					'#ffa500',
					'#FF0000'
				],
				hoverBackgroundColor: [
					'#1bb51b',
					'#ec9900',
					'#e20303'
				]
			}],
		};
		const options = {
			tooltips: {
				callbacks: {
					label: function (tooltipItem: any, chart: any) {
						const label = chart.labels[tooltipItem.index];
						const title = chart.datasets[0].data[tooltipItem.index];

						return `${label} ${title}%`;
					}
				}
			}
		};

		return (
				<Doughnut data={data} options={options} />
		);
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-4">{getClaimStatistics()}</div>
			</div>
		</div>
	);
};