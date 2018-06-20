import * as React from 'react';

export interface ParentProps {
	title: string;
}

export const HomePage: React.SFC<ParentProps> = (props) => {
	return (
		<div className="container-fluid">
			HOMEPAGE HEERE
		</div>
	);
};