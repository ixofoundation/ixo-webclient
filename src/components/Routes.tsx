import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SingleProjectConnected } from './project/SingleProject';
import { Projects } from './projects/Projects';
import { ProjectCreateConnected } from './project/ProjectCreate';
import { contentType } from '../types/models';

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
						<Projects {...routeProps} {...props} projectList={props.myProjectList} />
					</div>
				)}
			/>
			<Route 
				exact={true}
				path="/projects/:projectDID/home"
				render={(routeProps) => (
					<div>
						<SingleProjectConnected 
							// {...props} 
							contentType={contentType.home}
							// refreshProjects={props.refreshProjects}
						/>
					</div>
				)}
			/>
			<Route 
				exact={true}
				path="/projects/:projectDID/dashboard"
				render={(routeProps) => (
					<div>
						<SingleProjectConnected 
							contentType={contentType.dashboard}
							// {...routeProps} 
							// {...props} 
						/>
					</div>
				)}
			/>
			<Route
				exact={true}
				path="/projects/:projectDID/claims"
				render={(routeProps) => (
					<div>
						<Projects {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
					</div>
				)}
			/>
			<Route
				exact={true}
				path="/projects/:projectDID/evaluators"
				render={(routeProps) => (
					<div>
						<Projects {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
					</div>
				)}
			/>
			<Route
				exact={true}
				path="/projects/:projectDID/funders"
				render={(routeProps) => (
					<div>
						<Projects {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
					</div>
				)}
			/>
			<Route
				exact={true}
				path="/projects/:projectDID/service-agents"
				render={(routeProps) => (
					<div>
						<Projects {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
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