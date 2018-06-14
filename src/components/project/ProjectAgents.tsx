import * as React from 'react';
import styled from 'styled-components';

const Agent = styled.div`
	background: grey;
	padding: 10px;
	display: inline-block;
	color: white;
	margin: 10px;
`;
export interface ParentProps {
	agents: any;
}
export const ProjectAgents: React.SFC<ParentProps> = ({agents}) => {
	return (
		<div>
			{agents.map((agent, index) => {
				return (
					<Agent key={index}>
						<p>{agent.name}</p>
						<p>{agent.role}</p>
					</Agent>
				);
			})}
		</div>
	);
};