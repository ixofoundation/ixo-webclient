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

    export interface Callbacks {
        refreshProjects: () => void
    }

    export interface IRouteProps extends RouteProps, Callbacks{

    }

}

export const Routes: React.SFC<Routes.IRouteProps> = (props) => {

    return (
        <Switch>
            <Route exact path='/project/:projectID'
                render={(routeProps) => (
                    <SingleProject {...routeProps} {...props} refreshProjects={props.refreshProjects}/>
                )}
            />
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

