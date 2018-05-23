import * as React from 'react';

enum StatisticType {
	decimalAmount = 'DECIMAL',
	fraction = 'FRACTION',
	ixoAmount = 'IXO',
}

export interface Statistic {
	title: string;
	type?: StatisticType;
	amount: number | [number, number];
	descriptor?: string;
}

export const Statistic: React.SFC<Statistic> = (props) => {

	console.log(props.title);
	return (
		<div>test</div>
	);
};