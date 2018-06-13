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
			<Route exact={true} path="/projects/:projectDID/overview" render={() => <SingleProjectConnected contentType={contentType.overview} />}/>
			<Route exact={true} path="/projects/:projectDID/dashboard" render={() => <SingleProjectConnected contentType={contentType.dashboard} />}/>
			<Route exact={true} path="/projects/:projectDID/evaluators" render={() => <SingleProjectConnected contentType={contentType.evaluators} />}/>
			<Route exact={true} path="/projects/:projectDID/claims" render={() => <SingleProjectConnected contentType={contentType.claims} />}/>
			<Route exact={true} path="/projects/:projectDID/new-claim" render={() => <SingleProjectConnected contentType={contentType.claims} />}/>
			<Route exact={true} path="/projects/:projectDID/claims/:claimID" render={() => <SingleProjectConnected contentType={contentType.claims} />}/>
			<Route exact={true} path="/projects/:projectDID/investors" render={() => <SingleProjectConnected contentType={contentType.investors} />}/>
			<Route exact={true} path="/projects/:projectDID/service-agents" render={() => <SingleProjectConnected contentType={contentType.serviceAgents} />}/>
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