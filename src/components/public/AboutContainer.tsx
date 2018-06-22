import * as React from 'react';
import { AboutBanner } from './AboutBanner';
import { AboutMatters } from './AboutMatters';
import { AboutValue } from './AboutValue';

export interface ParentProps {
	title: string;
}

export const AboutContainer: React.SFC<ParentProps> = (props) => {
	return (
		<React.Fragment>
			<AboutBanner />
			<AboutMatters />
			<AboutValue />
		</React.Fragment>
	);
};