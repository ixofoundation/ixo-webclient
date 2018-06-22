import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ProjectWidget } from './ProjectWidget';
import { ProjectDetailWrapper } from './ProjectDetailWrapper';

const Container = styled.div`
	color: white;
`;
export interface ParentProps {
	projectDid: string;
}

export const ProjectDashboard: React.SFC<ParentProps> = ({projectDid}) => {
	return (
		<ProjectDetailWrapper>
			<Container className="row">
				<div className="col-md-12">
					<h2>DASHBOARD</h2>
				</div>

				<div className="col-md-3">
					<ProjectWidget title="Evaluators">
						<Link to={`/projects/${projectDid}/detail/evaluators`}>List evaluators</Link>
					</ProjectWidget>
				</div>
				<div className="col-md-3">
					<ProjectWidget title="Service Providers">
						<Link to={`/projects/${projectDid}/detail/service-providers`}>List service providers</Link>
					</ProjectWidget>
				</div>
				<div className="col-md-3">
					<ProjectWidget title="Investors">
						<Link to={`/projects/${projectDid}/detail/investors`}>List investors</Link>
					</ProjectWidget>
				</div>
				<div className="col-md-3">
					<ProjectWidget title="Claims">
						<Link to={`/projects/${projectDid}/detail/claims`}>List claims</Link>
					</ProjectWidget>
				</div>
			</Container>
		</ProjectDetailWrapper>
	);
};