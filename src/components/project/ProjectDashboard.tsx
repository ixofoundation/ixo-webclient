import * as React from 'react';
import styled from 'styled-components';
import { WidgetWrapper } from '../common/WidgetWrapper';
import { LayoutWrapper } from '../common/LayoutWrapper';
import { SingleStatistic } from '../common/SingleStatistic';
import { StatType, AgentRoles } from '../../types/models';

const Container = styled.div`
	color: white;
`;
export interface ParentProps {
	projectDid: string;
	claimStats: any;
	agentStats: any;
	hasCapability: (Role: AgentRoles) => boolean;
}

export const ProjectDashboard: React.SFC<ParentProps> = ({projectDid, claimStats, agentStats}) => {
	return (
		<LayoutWrapper>
			<Container className="row">
				<div className="col-sm-6 col-lg-3">
					<WidgetWrapper title="Evaluators" link={true} path={`/projects/${projectDid}/detail/evaluators`} linkIcon={'icon-expand'}>
						<SingleStatistic 
							title="Total" 
							type={StatType.decimal}
							amount={agentStats.evaluators} 
							descriptor={[{class: 'text-block', value: 'Pending Approval:'}, {class: 'number-orange', value: agentStats.evaluatorsPending}]}
						/>
					</WidgetWrapper>
				</div>
				<div className="col-sm-6 col-lg-3">
					<WidgetWrapper title="Service Providers" link={true} path={`/projects/${projectDid}/detail/service-providers`} linkIcon={'icon-expand'}>
						<SingleStatistic 
							title="Total" 
							type={StatType.decimal}
							amount={agentStats.serviceProviders} 
							descriptor={[{class: 'text-block', value: 'Pending Approval:'}, {class: 'number-orange', value: agentStats.serviceProvidersPending}]}
						/>
					</WidgetWrapper>
				</div>
				<div className="col-sm-6 col-lg-3">
					<WidgetWrapper title="Investors" link={true} path={`/projects/${projectDid}/detail/investors`} linkIcon={'icon-expand'}>
						<SingleStatistic 
							title="Total" 
							type={StatType.decimal}
							amount={agentStats.investors} 
							descriptor={[{class: 'text-block', value: 'Pending Approval:'}, {class: 'number-orange', value: agentStats.investorsPending}]}
						/>
					</WidgetWrapper>
				</div>
				<div className="col-sm-6 col-lg-3">
					<WidgetWrapper title="Claims" link={true} path={`/projects/${projectDid}/detail/claims`} linkIcon={'icon-expand'}>
						<SingleStatistic 
							title="Successful" 
							type={StatType.decimal}
							amount={claimStats.currentSuccessful} 
							descriptor={[{class: 'text-block', value: 'Rejected:'}, {class: 'number-orange', value: claimStats.currentRejected}]}
						/>
					</WidgetWrapper>
				</div>
			</Container>
		</LayoutWrapper>
	);
};