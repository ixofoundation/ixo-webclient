import * as React from 'react';

export interface ParentProps {
	title: string;
}

export const Stateful: React.SFC<ParentProps> = (props) => {
	return (
		<div className="container-fluid">
			CONTENT HERE
		</div>
	);
};