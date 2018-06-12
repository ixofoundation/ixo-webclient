import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SingleProjectConnected } from './SingleProject';
import { ProjectsConnected } from './Projects';
import { ProjectCreateConnected } from './ProjectCreate';
import { contentPage } from '../types/models';

export namespace Routes {
	export interface StateProps {
		projectList: any;
		myProjectList: any;
		serviceAgentProjectList: any;
	}

	export interface Callbacks {
		refreshProjects: () => void;
	}

	export interface RouteProps extends StateProps, Callbacks {

	}
}

export const Routes: React.SFC<Routes.RouteProps> = (props) => {

	return (
		<Switch>
			<Route 
				exact={true}
				path="/"
				render={(routeProps) => (
					<div>
						<ProjectsConnected 
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
						<ProjectsConnected {...routeProps} {...props} projectList={props.projectList} />
					</div>
				)}
			/>
			<Route 
				exact={true}
				path="/my-projects"
				render={(routeProps) => (
					<div>
						<ProjectsConnected {...routeProps} {...props} projectList={props.myProjectList} />
					</div>
				)}
			/>
			<Route 
				exact={true}
				path="/:projectID/home"
				render={(routeProps) => (
					<div>
						<SingleProjectConnected 
							// {...props} 
							contentPage={contentPage.overview}
							// refreshProjects={props.refreshProjects}
						/>
					</div>
				)}
			/>
			<Route 
				exact={true}
				path="/:projectID/stats"
				render={(routeProps) => (
					<div>
						<SingleProjectConnected 
							contentPage={contentPage.dashboard}
							// {...routeProps} 
							// {...props} 
						/>
					</div>
				)}
			/>
			<Route
				exact={true}
				path="/:projectID/claims"
				render={(routeProps) => (
					<div>
						<ProjectsConnected {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
					</div>
				)}
			/>
			<Route
				exact={true}
				path="/:projectID/evaluators"
				render={(routeProps) => (
					<div>
						<ProjectsConnected {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
					</div>
				)}
			/>
			<Route
				exact={true}
				path="/:projectID/funders"
				render={(routeProps) => (
					<div>
						<ProjectsConnected {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
					</div>
				)}
			/>
			<Route
				exact={true}
				path="/:projectID/service-agents"
				render={(routeProps) => (
					<div>
						<ProjectsConnected {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
					</div>
				)}
			/>
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