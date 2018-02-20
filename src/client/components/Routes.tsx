import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SingleProject } from './sidebarItems/projects/SingleProject';
import { Projects } from './sidebarItems/projects/Projects';

export namespace Routes {
    export interface RouteProps {
        projectList: any,
        myProjectList: any,
        serviceAgentProjectList: any
    }

}

export const Routes: React.SFC<Routes.RouteProps> = (props) => {

    return (
        <Switch>
            <Route exact path='/project/:projectID' component={SingleProject} />
            <Route exact path="/"
                render={(routeProps) => (
                    <Projects {...routeProps} {...props} projectList={props.projectList} />
                )}
            />
            <Route exact path="/my-projects"
                render={(routeProps) => (
                    <Projects {...routeProps} {...props} projectList={props.myProjectList} />
                )}
            />
            <Route exact path="/capture-claim"
                render={(routeProps) => (
                    <Projects {...routeProps} {...props} projectList={props.serviceAgentProjectList} />
                )}
            />
        </Switch>
    );
};

