import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	background: ${props => props.theme.bg.blue};

`;

const Section = styled.section`
	h2 {
		color: white;
	}
`;

const Agent = styled.div`
	background: ${props => props.theme.bg.gradientBlue};
	border: 1px solid ${props => props.theme.widgetBorder};
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

	const handleRenderSection = (agents: any[], title: string) => {

		return (
			<Section className="row">
				<div className="col-md-12">
					<h2>{title}</h2>
					{agents.map((agent, index) => {
						return (
							<Agent key={index}>
								<p>{agent.name}</p>
								<p>{agent.role}</p>
								<button onClick={() => handleUpdateAgentStatus('1', agent.currentStatus, agent.agentDid, agent.role)}>Approve</button>
								<button onClick={() => handleUpdateAgentStatus('2', agent.currentStatus, agent.agentDid, agent.role)}>Reject</button>
							</Agent>
						);
					})}
				</div>
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

		sections.push(handleRenderSection(pending, 'Pending Approval'));
		sections.push(handleRenderSection(approved, 'Service Providers'));
		sections.push(handleRenderSection(revoked, 'Revoked'));

		return sections;
	};

	return (
		<Container className="container-fluid">
			{handleMapAgents()}
		</Container>
	);
};