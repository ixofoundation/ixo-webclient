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
	handleUpdateAgentStatus: (status: object, did: string, role: string) => void;
}
export const ProjectAgents: React.SFC<ParentProps> = (props) => {

	const handleRenderStatus = (agent) => {
		if (agent === null) {
			return 'Pending';
		} else {
			switch (agent.status) {				
				case '1':
				return 'Approved';
				case '2':
				return 'Revoked';
				case '0':
				default:
				return 'Pending';
			}
		}
	};

	const handleUpdateAgentStatus = (status: string, statusObj: any, did: string, role: string) => {
		if (statusObj === null) {
			props.handleUpdateAgentStatus({status: status}, did, role);
		} else {
			props.handleUpdateAgentStatus({status, version: statusObj.version}, did, role);
		}
	};

	return (
		<div>
			{props.agents.map((agent, index) => {
				return (
					<Agent key={index}>
						<p>{agent.name}</p>
						<p>{agent.role}</p>
						<p>{handleRenderStatus(agent.currentStatus)}</p>
						<button onClick={() => handleUpdateAgentStatus('1', agent.currentStatus, agent.agentDid, agent.role)}>Approve</button>
						<button onClick={() => handleUpdateAgentStatus('2', agent.currentStatus, agent.agentDid, agent.role)}>Reject</button>
					</Agent>
				);
			})}
		</div>
	);
};