import * as React from 'react';
import styled from 'styled-components';
import { ProjectWidget } from './ProjectWidget';
import { ProjectDetailWrapper } from './ProjectDetailWrapper';

const Section = styled.section`
	h2 {
		color: white;
		font-size: 30px;
		font-family: ${props => props.theme.fontRobotoCondensed};
	}
`;

export interface ParentProps {
	agents: any;
	handleUpdateAgentStatus: (status: object, did: string, role: string) => void;
}
export const ProjectAgents: React.SFC<ParentProps> = (props) => {

	// const handleDetermineStatus = (agent) => {
	// 	if (agent === null) {
	// 		return 'Pending';
	// 	} else {
	// 		switch (agent.status) {				
	// 			case '1':
	// 				return 'Approved';
	// 			case '2':
	// 				return 'Revoked';
	// 			case '0':
	// 			default:
	// 				return 'Pending';
	// 		}
	// 	}
	// };

	const handleUpdateAgentStatus = (status: string, statusObj: any, did: string, role: string) => {
		if (statusObj === null) {
			props.handleUpdateAgentStatus({status: status}, did, role);
		} else {
			props.handleUpdateAgentStatus({status, version: statusObj.version}, did, role);
		}
	};

	const handleRenderSection = (agents: any[], title: string, key: number) => {
		return (
			<Section className="row" key={key}>
					<div className="col-md-12">
						<h2>{title}</h2>
					</div>
					{agents.map((agent, index) => {
						return (
							<div className="col-md-3" key={index}>
								<ProjectWidget title={agent.name}>
									<p>{agent.role}</p>
									<button onClick={() => handleUpdateAgentStatus('1', agent.currentStatus, agent.agentDid, agent.role)}>Approve</button>
									<button onClick={() => handleUpdateAgentStatus('2', agent.currentStatus, agent.agentDid, agent.role)}>Reject</button>
								</ProjectWidget>
							</div>
						);
					})}
			</Section>
		);
	};

	const handleMapAgents = () => {

		const approved = [];
		const pending = [];
		const revoked = [];
		const sections = [];
		props.agents.map((agent) => {
			if (agent.currentStatus === null) {
				pending.push(agent);
			} else {
				switch (agent.currentStatus.status) {				
					case '1':
						approved.push(agent);
						break;
					case '2':
						revoked.push(agent);
						break;
					case '0':
					default:
						pending.push(agent);
						break;
				}
			}
		});

		sections.push(handleRenderSection(pending, 'Pending Approval', 1));
		sections.push(handleRenderSection(approved, 'Service Providers', 2));
		sections.push(handleRenderSection(revoked, 'Revoked', 3));

		return sections;
	};

	return (
		<ProjectDetailWrapper>
			{handleMapAgents()}
		</ProjectDetailWrapper>
	);
};