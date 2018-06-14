import * as React from 'react';
import styled from 'styled-components';

export interface ParentProps {
	claims?: any;  
}

const Claim = styled.div`
	background: grey;
	padding: 10px;
	display: inline-block;
	color: white;
	margin: 10px;
`;

export const ProjectClaims: React.SFC<ParentProps> = ({claims}) => {
	return (
		<div>
			{claims.map((claim, index) => {
				return (
					<Claim key={index}>
						<p>{claim.name}</p>
					</Claim>
				);
			})}
		</div>
	);
};