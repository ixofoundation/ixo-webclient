import * as React from 'react';
import styled from 'styled-components';
import { WidgetWrapper, gridSizes } from '../common/WidgetWrapper';
import { LayoutWrapper } from '../common/LayoutWrapper';
// import { SingleStatistic } from '../common/SingleStatistic';
// import { StatType, AgentRoles } from '../../types/models';
import { CircleProgressbar } from '../widgets/CircleProgressbar';
// import { WorldMap, LatLng } from '../widgets/WorldMap';
// import { isoCountriesLatLng } from '../../lib/commonData';

// import { deviceWidth } from '../../lib/commonData';

const Container = styled.div`
	color: white;
`;

const ClaimsWidget = styled.div`
	display: flex;
	justify-content: space-between;
	padding:0 20px 0 0;
	flex-wrap: wrap;
`;

const ClaimsLabels = styled.div`

	margin-top: 40px;

	strong {
		font-weight: 700;
	}

	p:before {
		content:'';
		width:10px;
		height:10px;
		display: inline-block;
		margin-right: 25px;
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
	claims: any[];
	claimsTotalRequired: number;
}

export const ProjectsDashboard: React.SFC<ParentProps> = ({claims, claimsTotalRequired}) => {

	const countClaimsOfType = (claimType: string) => {
		return [...claims].filter((claim) => claim.status === claimType).length;
	};

	// const getClaimsOfType = (claimType: string) => {
	// 	return [...claims].filter((claim) => claim.status === claimType);
	// };

	// const getProjectsLatLng = () => {
	// 	let latLng = isoCountriesLatLng[project.projectLocation];
	// 	if (latLng) {
	// 		return new LatLng(latLng.lat, latLng.lng);
	// 	}
	// 	return new LatLng(0, 0);
	// };

	return (
		<LayoutWrapper>
			<Container className="row">
				{
				// <div className="col-sm-6 col-lg-3">
				// 	<WidgetWrapper title="Service Providers" gridHeight={gridSizes.standard} path={`/projects/${projectDid}/detail/service-providers`} linkIcon={'icon-expand'}>
				// 		<SingleStatistic 
				// 			title="Total" 
				// 			type={StatType.decimal}
				// 			amount={agentStats.serviceProviders} 
				// 			descriptor={[{class: 'text-block', value: 'Pending Approval:'}, {class: 'number-orange', value: agentStats.serviceProvidersPending}]}
				// 		/>
				// 	</WidgetWrapper>
				// </div>
				}
				{
				// <div className="col-sm-6 col-lg-3">
				// 	<WidgetWrapper title="Evaluators" gridHeight={gridSizes.standard} path={`/projects/${projectDid}/detail/evaluators`} linkIcon={'icon-expand'}>
				// 		<SingleStatistic 
				// 			title="Total" 
				// 			type={StatType.decimal}
				// 			amount={agentStats.evaluators} 
				// 			descriptor={[{class: 'text-block', value: 'Pending Approval:'}, {class: 'number-orange', value: agentStats.evaluatorsPending}]}
				// 		/>
				// 	</WidgetWrapper>
				// </div>
				}
				{
				<div className="col-lg-6">
					<WidgetWrapper title="Impact claims" gridHeight={gridSizes.standard} linkIcon={'icon-expand'}>
						<ClaimsWidget>
							<ClaimsLabels>
								<p><strong>{countClaimsOfType('1')}</strong> Approved</p>
								<p><strong>{countClaimsOfType('0')}</strong> Pending Approval</p>
								<p><strong>{countClaimsOfType('2')}</strong> Rejected</p>
								<p><strong>{claimsTotalRequired}</strong> Total Project claims</p>
							</ClaimsLabels>
							<CircleProgressbar
								approved={countClaimsOfType('1')}
								rejected={countClaimsOfType('2')}
								pending={countClaimsOfType('0')}
								totalNeeded={claimsTotalRequired}
								descriptor={'verified claims'}
							/>
						</ClaimsWidget>
					</WidgetWrapper>
				</div>
				}
				{
				// <div className="col-md-6">
				// 	<WidgetWrapper title="Claim location activity" path={`/projects/${projectDid}/detail/claims`} gridHeight={gridSizes.standard}>
				// 		<WorldMap markers={[getProjectLatLng()]}/>
				// 	</WidgetWrapper>
				// </div>
				}
			</Container>
		</LayoutWrapper>
	);
};