import * as React from 'react';

export interface ParentProps {
	claims?: any;  
}

export const ProjectClaims: React.SFC<ParentProps> = (props) => {

	const handleRenderClaims = () => {
		if (props.claims.length > 0) {
		return props.claims.map((claim, index) => <p key={index}>{claim.name}</p> );
		} else {
			return <p>No claims were found</p>;
		}
	};

	return (
		<div>
			{handleRenderClaims()}
		</div>
	);
};