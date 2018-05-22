import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SingleProjectConnected } from './SingleProject';
import { Projects } from './Projects';

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
					<Projects 
						// {...routeProps}
						// {...props}
						projectList={props.projectList}
					/>
				)}
			/>
			<Route 
				exact={true}
				path="/global-statistics"
				render={(routeProps) => (
					<Projects {...routeProps} {...props} projectList={props.projectList} />
				)}
			/>
			<Route 
				exact={true}
				path="/my-projects"
				render={(routeProps) => (
					<Projects {...routeProps} {...props} projectList={props.myProjectList} />
				)}
			/>
			<Route 
				exact={true}
				path="/:projectID/home"
				render={(routeProps) => (
					<SingleProjectConnected 
						// {...routeProps} 
						// {...props} 
						// refreshProjects={props.refreshProjects}
					/>
				)}
			/>
			<Route 
				exact={true}
				path="/:projectID/stats"
				render={(routeProps) => (
					<SingleProjectConnected 
						// {...routeProps} 
						// {...props} 
					/>
				)}
			/>
			<Route
				exact={true}
				path="/:projectID/claims"
				render={(routeProps) => (
					<Projects {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
				)}
			/>
			<Route
				exact={true}
				path="/:projectID/evaluators"
				render={(routeProps) => (
					<Projects {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
				)}
			/>
			<Route
				exact={true}
				path="/:projectID/funders"
				render={(routeProps) => (
					<Projects {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
				)}
			/>
			<Route
				exact={true}
				path="/:projectID/service-agents"
				render={(routeProps) => (
					<Projects {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
				)}
			/>
			<Route
				exact={true}
				path="/create-project"
				render={(routeProps) => (
					<Projects {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
				)}
			/>
		</Switch>
	);
};