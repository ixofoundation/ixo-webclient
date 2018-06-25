import * as React from 'react';

export interface ParentProps {
	title: string;
}

export const Home: React.SFC<ParentProps> = (props) => {
	return (
		<div className="container-fluid">
			test
		</div>
	);
};