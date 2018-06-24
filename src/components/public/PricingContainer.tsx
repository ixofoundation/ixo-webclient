import * as React from 'react';
import { PricingBanner } from './PricingBanner';
import { PricingTables } from './PricingTables';

export interface ParentProps {
	title: string;
}

export const PricingContainer: React.SFC<ParentProps> = (props) => {
	return (
		<React.Fragment>
			<PricingBanner />
			<PricingTables />
		</React.Fragment>
	);
};