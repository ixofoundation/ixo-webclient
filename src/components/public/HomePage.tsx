import * as React from 'react';
import { HomeBanner } from './HomeBanner';

export interface ParentProps {
	title: string;
}

export const HomePage: React.SFC<ParentProps> = (props) => {
	return (
		<div className="container-fluid">
			<HomeBanner />
		</div>
	);
};