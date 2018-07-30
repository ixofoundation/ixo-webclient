import * as React from 'react';

export interface ParentProps {
	title: string;
}

export const Stateless: React.SFC<ParentProps> = (props) => {
	return (
		<div className="container-fluid">
			test
		</div>
	);
};