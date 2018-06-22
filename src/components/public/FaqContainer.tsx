import * as React from 'react';
import { FaqBanner } from './FaqBanner';
import { FaqSection } from './FaqSection';

export interface ParentProps { }

export const FaqContainer: React.SFC<ParentProps> = (props) => {
	return (
		<React.Fragment>
			<FaqBanner />
			<FaqSection />
		</React.Fragment>
	);
};