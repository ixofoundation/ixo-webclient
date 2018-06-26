import * as React from 'react';
import { Link } from 'react-router-dom';
import { LayoutWrapper } from '../common/LayoutWrapper';
import { WidgetWrapper } from '../common/WidgetWrapper';

export interface ParentProps {
	claims?: any[];  
	projectDid: string;
}

export const ProjectClaims: React.SFC<ParentProps> = ({claims, projectDid}) => {
	return (
		<LayoutWrapper>
			<div className="row">
				{claims.map((claim, index) => {
					return (
						<div key={index} className="col-md-3">
							<WidgetWrapper>
								<Link to={{pathname: `/projects/${projectDid}/detail/claims/${claim.txHash}`}}>
									<p>{claim.name}</p>
								</Link>
							</WidgetWrapper>
						</div>
					);
				})}
			</div>
		</LayoutWrapper>
	);
};