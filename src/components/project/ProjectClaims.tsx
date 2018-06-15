import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export interface ParentProps {
	claims?: any[];  
	projectDid: string;
}

const Claim = styled(Link)`
	background: grey;
	padding: 10px;
	display: inline-block;
	color: white;
	margin: 10px;
`;

export const ProjectClaims: React.SFC<ParentProps> = ({claims, projectDid}) => {
	return (
		<div>
			{claims.map((claim, index) => {
				console.log(claim);
				return (
					<Claim key={index} to={{pathname: `/projects/${projectDid}/claims/${claim._id}`}}>
						<p>{claim.name}</p>
					</Claim>
				);
			})}
		</div>
	);
};