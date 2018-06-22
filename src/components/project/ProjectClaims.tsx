import * as React from 'react';
import { Link } from 'react-router-dom';
import { ProjectDetailWrapper } from './ProjectDetailWrapper';
import { ProjectWidget } from './ProjectWidget';

export interface ParentProps {
	claims?: any[];  
	projectDid: string;
}

export const ProjectClaims: React.SFC<ParentProps> = ({claims, projectDid}) => {
	return (
		<ProjectDetailWrapper>
			<div className="row">
				{claims.map((claim, index) => {
					return (
						<div key={index} className="col-md-3">
							<ProjectWidget>
								<Link to={{pathname: `/projects/${projectDid}/detail/claims/${claim.txHash}`}}>
									<p>{claim.name}</p>
								</Link>
							</ProjectWidget>
						</div>
					);
				})}
			</div>
		</ProjectDetailWrapper>
	);
};