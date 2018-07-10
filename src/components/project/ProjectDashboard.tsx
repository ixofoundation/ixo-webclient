import * as React from 'react';
import styled from 'styled-components';
import { WidgetWrapper } from '../common/WidgetWrapper';
import { LayoutWrapper } from '../common/LayoutWrapper';
import { SingleStatistic } from '../common/SingleStatistic';
import { StatType, AgentRoles } from '../../types/models';
import { ProjectClaims } from './ProjectClaims';
import { CircleProgressbar } from '../widgets/CircleProgressbar';
import BarChart from '../widgets/BarChart';

const Container = styled.div`
	color: white;
`;

const ClaimsWidget = styled.div`
	display: flex;
	justify-content: space-between;
	padding:0 20px 20px 0;
	flex-wrap: wrap;
`;

const ClaimsLabels = styled.div`

	margin-top: 40px;
	p:before {
		content:'';
		width:10px;
		height:10px;
		display: inline-block;
		margin-right: 20px;
	}
	p:nth-child(1):before {
		background: ${props => props.theme.ixoBlue};
	}
	p:nth-child(2):before {
		background: ${props => props.theme.ixoOrange};
	}
	p:nth-child(3):before {
		background: ${props => props.theme.red};
	}
	p:nth-child(4):before {
		background: #033C50;
	}
`;
export interface ParentProps {
	projectDid: string;
	agentStats: any;
	claimStats: any;
	claims: any[];
	hasCapability: (Role: AgentRoles[]) => boolean;
}

export const ProjectDashboard: React.SFC<ParentProps> = ({projectDid, agentStats, claimStats, claims, hasCapability}) => {

	const countPendingClaims = () => {
		return [...claims].filter((claim) => claim.status === '0').length;
	};

	return (
		<LayoutWrapper>
			<Container className="row">
				{
				<div className="col-sm-6 col-lg-3">
					<WidgetWrapper title="Evaluators" link={hasCapability([AgentRoles.owners])} path={`/projects/${projectDid}/detail/evaluators`} linkIcon={'icon-expand'}>
						<SingleStatistic 
							title="Total" 
							type={StatType.decimal}
							amount={agentStats.evaluators} 
							descriptor={[{class: 'text-block', value: 'Pending Approval:'}, {class: 'number-orange', value: agentStats.evaluatorsPending}]}
						/>
					</WidgetWrapper>
				</div>
				}
				{
				<div className="col-sm-6 col-lg-3">
					<WidgetWrapper title="Service Providers" link={hasCapability([AgentRoles.owners])} path={`/projects/${projectDid}/detail/service-providers`} linkIcon={'icon-expand'}>
						<SingleStatistic 
							title="Total" 
							type={StatType.decimal}
							amount={agentStats.serviceProviders} 
							descriptor={[{class: 'text-block', value: 'Pending Approval:'}, {class: 'number-orange', value: agentStats.serviceProvidersPending}]}
						/>
					</WidgetWrapper>
				</div>
				}
				{
				<div className="col-sm-6 col-lg-3">
					<WidgetWrapper title="Investors" link={hasCapability([AgentRoles.owners])} path={`/projects/${projectDid}/detail/investors`} linkIcon={'icon-expand'}>
						<SingleStatistic 
							title="Total" 
							type={StatType.decimal}
							amount={agentStats.investors} 
							descriptor={[{class: 'text-block', value: 'Pending Approval:'}, {class: 'number-orange', value: agentStats.investorsPending}]}
						/>
					</WidgetWrapper>
				</div>
				}
				{
				<div className="col-sm-6 col-lg-3">
					<WidgetWrapper title="Claims" link={hasCapability([AgentRoles.owners, AgentRoles.evaluators, AgentRoles.serviceProviders, AgentRoles.investors])} path={`/projects/${projectDid}/detail/claims`} linkIcon={'icon-expand'}>
						<SingleStatistic 
							title="Total Successful" 
							type={StatType.decimal}
							amount={claimStats.currentSuccessful} 
							descriptor={[{class: 'text-block', value: 'Pending Approval:'}, {class: 'number-orange', value: countPendingClaims()}]}
						/>
					</WidgetWrapper>
				</div>
				}
				{
				<div className="col-md-6">
					<WidgetWrapper title="My latest claims" path={`/projects/${projectDid}/detail/claims`} linkIcon={'icon-expand'} link={hasCapability([AgentRoles.owners, AgentRoles.evaluators, AgentRoles.serviceProviders, AgentRoles.investors])}>
						<ProjectClaims claims={claims} projectDid={projectDid} fullPage={false} hasLink={hasCapability([AgentRoles.owners, AgentRoles.evaluators, AgentRoles.serviceProviders, AgentRoles.investors])} />
					</WidgetWrapper>
				</div>
				}
				{
				<div className="col-lg-6">
					<WidgetWrapper title="Impact claims" path={`/projects/${projectDid}/detail/claims`} linkIcon={'icon-expand'} link={hasCapability([AgentRoles.owners, AgentRoles.evaluators, AgentRoles.serviceProviders, AgentRoles.investors])}>
						<ClaimsWidget>
							<ClaimsLabels>
								<p>Approved</p>
								<p>Pending Approval</p>
								<p>Rejected</p>
								<p>Claims Submitted</p>
							</ClaimsLabels>
							<CircleProgressbar
								approved={claimStats.currentSuccessful}
								rejected={claimStats.currentRejected}
								pending={countPendingClaims()}
								totalNeeded={claimStats.required}
							/>
						</ClaimsWidget>
					</WidgetWrapper>
				</div>
				}
				{
				<div className="col-md-6">
					<BarChart />
				</div>
				}
			</Container>
		</LayoutWrapper>
	);
};