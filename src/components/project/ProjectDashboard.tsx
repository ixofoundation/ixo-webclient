import * as React from 'react';
import { Link } from 'react-router-dom';

export interface ParentProps {
	projectDid: string;
}

export const ProjectDashboard: React.SFC<ParentProps> = ({projectDid}) => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-12">
					<h1>DASHBOARD</h1>
				</div>
				<div className="col-md-3">
					<Link to={`/projects/${projectDid}/detail/evaluators`}>List evaluators</Link>
				</div>
				<div className="col-md-3">
					<Link to={`/projects/${projectDid}/detail/service-providers`}>List service providers</Link>
				</div>
				<div className="col-md-3">
					<Link to={`/projects/${projectDid}/detail/investors`}>List investors</Link>
				</div>
				<div className="col-md-3">
					<Link to={`/projects/${projectDid}/detail/claims`}>List claims</Link>
				</div>
			</div>
		</div>
	);
};