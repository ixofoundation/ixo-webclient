import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SingleProject } from './SingleProject';
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
                path="/project/:projectID"
                render={(routeProps) => (
                    <SingleProject 
                        {...routeProps} 
                        {...props} 
                        // refreshProjects={props.refreshProjects}
                    />
                )}
            />
            <Route 
                exact={true}
                path="/"
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
                path="/capture-claim"
                render={(routeProps) => (
                    <Projects {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
                )}
            />
        </Switch>
    );
};