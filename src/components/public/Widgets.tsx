import * as React from 'react';
import { Doughnut } from 'react-chartjs-2';

export interface ParentProps {
	title: string;
}

export const Widgets: React.SFC<ParentProps> = (props) => {

	const getOptions = () => {
		return {
			tooltips: {
				callbacks: {
					label: function (tooltipItem, chart) {
						const label = chart.labels[tooltipItem.index];
						const title = chart.datasets[0].data[tooltipItem.index];

						return `${label} ${title}%`;
					}
				}
			}
		};
	};

	const getData = () => {

		const total = this.state.projectMeta.numberOfSuccessfulClaims;

		const approved = this.getCountClaimsOfType('Approved');
		const pending = this.getCountClaimsOfType('Pending');
		const rejected = this.getCountClaimsOfType('NotApproved');

		const approvedPercent = (approved / total) * 100;
		const rejectedPercent = (rejected / total) * 100;
		const pendingPercent = (pending / total) * 100;
		return {
			labels: [
				'Approved',
				'Pending',
				'Rejected'
			],
			datasets: [{
				data: [approvedPercent, pendingPercent, rejectedPercent],
				backgroundColor: [
					'#22d022',
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
	};

	return (
		<div className="container-fluid">
									<div className="col-md-4"><Doughnut data={data} options={options} /></div>
		</div>
	);
};