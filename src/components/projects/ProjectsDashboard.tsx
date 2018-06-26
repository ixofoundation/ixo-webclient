import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { WidgetWrapper } from '../common/WidgetWrapper';
import { LayoutWrapper } from '../common/LayoutWrapper';

const Container = styled.div`
	color: white;
`;
export interface ParentProps {
	projectDid: string;
}

export const ProjectDashboard: React.SFC<ParentProps> = ({projectDid}) => {
	return (
		<LayoutWrapper>
			<Container className="row">
				<div className="col-md-12">
					<h2>DASHBOARD</h2>
				</div>

				<div className="col-md-3">
					<WidgetWrapper title="Evaluators">
						<Link to={`/projects/${projectDid}/detail/evaluators`}>List evaluators</Link>
					</WidgetWrapper>
				</div>
				<div className="col-md-3">
					<WidgetWrapper title="Service Providers">
						<Link to={`/projects/${projectDid}/detail/service-providers`}>List service providers</Link>
					</WidgetWrapper>
				</div>
				<div className="col-md-3">
					<WidgetWrapper title="Investors">
						<Link to={`/projects/${projectDid}/detail/investors`}>List investors</Link>
					</WidgetWrapper>
				</div>
				<div className="col-md-3">
					<WidgetWrapper title="Claims">
						<Link to={`/projects/${projectDid}/detail/claims`}>List claims</Link>
					</WidgetWrapper>
				</div>
			</Container>
		</LayoutWrapper>
	);
};