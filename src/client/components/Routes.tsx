import * as React      from 'react';
import {Switch, Route} from 'react-router-dom';
import {SingleProject} from './SingleProject';
import {Projects}      from './Projects';

export namespace Routes {
    export interface RouteProps {
      projectList: any,
      myProjectList: any
    }
  }
  
export const Routes: React.SFC<Routes.RouteProps> = (props) => {
    return (
    <Switch>
        <Route path='/project/:projectID' component={SingleProject} />
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
    </Switch>
    );
}

