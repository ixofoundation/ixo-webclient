import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ProjectContainerConnected } from './project/ProjectContainer';
import { Projects } from './projects/ProjectsContainer';
import { ProjectCreateConnected } from './project/ProjectCreate';
import { contentType } from '../types/models';
import { ProjectForm } from './project/ProjectForm';
import { AboutContainer } from './public/AboutContainer';
import { MemberContainer } from './public/MemberContainer';
import { FaqContainer } from './public/FaqContainer';
import { EcoContainer } from './public/EcoContainer';
import { PricingContainer } from './public/PricingContainer';
export namespace Routes {
	export interface StateProps {
		projectList: any;
	}

	export interface RouteProps extends StateProps {

	}
}

export const Routes: React.SFC<Routes.RouteProps> = (props) => {

	return (
		<Switch>
			<Route exact={true} path="/member" component={MemberContainer} />
			<Route exact={true} path="/about" component={AboutContainer} />
			<Route exact={true} path="/faqs" component={FaqContainer} />
			<Route exact={true} path="/ecosystem" component={EcoContainer} />
			<Route exact={true} path="/pricing" component={PricingContainer} />
			<Route exact={true} path="/json" component={ProjectForm} />
			<Route
				exact={true}
				path="/"
				render={(routeProps) => (
					<div>
						<Projects
							// {...routeProps}
							// {...props}
							projectList={props.projectList}
						/>
					</div>
				)}
			/>
			<Route
				exact={true}
				path="/global-statistics"
				render={(routeProps) => (
					<div>
						<Projects {...routeProps} {...props} projectList={props.projectList} />
					</div>
				)}
			/>
			<Route
				exact={true}
				path="/my-projects"
				render={(routeProps) => (
					<div>
						<Projects {...routeProps} {...props} projectList={props.projectList} />
					</div>
				)}
			/>
			<Route exact={true} path="/projects/:projectDID/overview" render={() => <ProjectContainerConnected contentType={contentType.overview} />} />
			<Route exact={true} path="/projects/:projectDID/detail/" render={() => <ProjectContainerConnected contentType={contentType.dashboard} />} />
			<Route exact={true} path="/projects/:projectDID/detail/evaluators" render={() => <ProjectContainerConnected contentType={contentType.evaluators} />} />
			<Route exact={true} path="/projects/:projectDID/detail/investors" render={() => <ProjectContainerConnected contentType={contentType.investors} />} />
			<Route exact={true} path="/projects/:projectDID/detail/service-providers" render={() => <ProjectContainerConnected contentType={contentType.serviceProviders} />} />
			<Route exact={true} path="/projects/:projectDID/detail/claims" render={() => <ProjectContainerConnected contentType={contentType.claims} />} />
			<Route exact={true} path="/projects/:projectDID/detail/new-claim" render={() => <ProjectContainerConnected contentType={contentType.newClaim} />} />
			<Route exact={true} path="/projects/:projectDID/detail/claims/:claimID" render={() => <ProjectContainerConnected contentType={contentType.singleClaim} />} />
			<Route
				exact={true}
				path="/create-project"
				render={(routeProps) => (
					<div>
						<ProjectCreateConnected {...routeProps} {...props} />
					</div>
				)}
			/>
		</Switch>
	);
};