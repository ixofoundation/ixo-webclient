import * as React from 'react';

export interface ParentProps {
	title: string;
}

export interface State {

}

export class FundingContainer extends React.Component<ParentProps, State> {

	state = {

	};

	render() {
		return (
			<div className="container-fluid">
			CONTENT HERE
		</div>
		);
	}
}