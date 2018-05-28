import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SingleProjectConnected } from './SingleProject';
import { Projects } from './Projects';
import { HeroSingle } from './HeroSingle';
import { HeroOverview } from './HeroOverview';
import { StatType } from '../types/models';

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

	const handleIsSinglePage = (isSingle: boolean, routeProps?: any) => {
		if (isSingle === true) {
			return (
				<HeroSingle 
					projectTitle={'test'}
					SDGs={[15, 12, 9]}
					description={'test'}
					dateCreated={'2017/11/12'}
					country={'South Africa'}
					owner={'Water for Africa'}
					{...routeProps} 
				/>
			);
		} else {
			return (
				<HeroOverview 
					statistics={[
						{title: 'CLAIM AMOUNT',
						type: StatType.fraction,
						descriptor: [{class: 'text', value: 'test'}, {class: 'number', value: 2}, {class: 'text', value: 'test2'}],
						amount: [20, 1110]},
						{title: 'SERVICE PROVIDER',
						type: StatType.decimal,
						descriptor: [{class: 'text', value: 'test'}, {class: 'number', value: 24}, {class: 'text', value: 'test2'}],
						amount: 12},
						{title: 'IXO REMAINING',
						type: StatType.ixoAmount,
						descriptor: [{class: 'text', value: 'This is a test for a long description text for a single statistic type'}],
						amount: 40.67},
						{title: 'SERVICE PROVIDER',
						type: StatType.decimal,
						descriptor: [{class: 'text', value: 'claims available: '}, {class: 'number', value: 2}],
						amount: 142}
					]} 
				/>
			);
		}
	};

	return (
		<Switch>
			<Route 
				exact={true}
				path="/"
				render={(routeProps) => (
					<div>
						{handleIsSinglePage(false, routeProps)}
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
						{handleIsSinglePage(false)}
						<Projects {...routeProps} {...props} projectList={props.projectList} />
					</div>
				)}
			/>
			<Route 
				exact={true}
				path="/my-projects"
				render={(routeProps) => (
					<div>
						{handleIsSinglePage(true)}
						<Projects {...routeProps} {...props} projectList={props.myProjectList} />
					</div>
				)}
			/>
			<Route 
				exact={true}
				path="/:projectID/home"
				render={(routeProps) => (
					<div>
						{handleIsSinglePage(true, routeProps)}
						<SingleProjectConnected 
							// {...routeProps} 
							// {...props} 
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
						{handleIsSinglePage(true, routeProps)}
						<SingleProjectConnected 
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
						{handleIsSinglePage(true)}
						<Projects {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
					</div>
				)}
			/>
			<Route
				exact={true}
				path="/:projectID/evaluators"
				render={(routeProps) => (
					<div>
						{handleIsSinglePage(true)}
						<Projects {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
					</div>
				)}
			/>
			<Route
				exact={true}
				path="/:projectID/funders"
				render={(routeProps) => (
					<div>
						{handleIsSinglePage(true)}
						<Projects {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
					</div>
				)}
			/>
			<Route
				exact={true}
				path="/:projectID/service-agents"
				render={(routeProps) => (
					<div>
						{handleIsSinglePage(true)}
						<Projects {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
					</div>
				)}
			/>
			<Route
				exact={true}
				path="/create-project"
				render={(routeProps) => (
					<div>
						{handleIsSinglePage(true)}
						<Projects {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
					</div>
				)}
			/>
		</Switch>
	);
};