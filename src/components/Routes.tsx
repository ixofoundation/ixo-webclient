import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ProjectContainerConnected } from './project/ProjectContainer'
import { ProjectsContainerConnected } from './projects/ProjectsContainer'
import { ProjectCreateConnected } from './project/ProjectCreate'
import { contentType } from '../types/models'
import { ProjectForm } from './project/ProjectForm'
import { Fragment } from 'react'
import { Widgets } from './widgets/Widgets'
import { Icons } from './common/Icons'
import { RegisterConnected } from './register/RegisterContainer'
import { NotFound } from './public/NotFound'
import { Spinner } from './common/Spinner'
import { ProjectSignAndCreateConnected } from './project/curation/ProjectSignAndCreate'
import { ProjectCreateUploadPublicDocsConnected } from './project/curation/ProjectCreateUploadPublicDocs'
import { ThreeD } from './common/3D'

export const Routes: React.SFC<{}> = props => {
  return (
    <Fragment>
      <Switch>
        <Route exact={true} path="/json" component={ProjectForm} />
        <Route exact={true} path="/spinner" component={Spinner} />
        <Route exact={true} path="/3d" component={ThreeD} />
        <Route exact={true} path="/widgets" component={Widgets} />
        <Route exact={true} path="/json" component={ProjectForm} />
        <Route exact={true} path="/icons" component={Icons} />
        <Route exact={true} path="/register" component={RegisterConnected} />
        <Route
          exact={true}
          path="/"
          render={(routeProps): JSX.Element => (
            <ProjectsContainerConnected
              {...routeProps.location}
              contentType={contentType.overview}
            />
          )}
        />
        <Route
          exact={true}
          path="/global-statistics"
          render={(routeProps): JSX.Element => (
            <ProjectsContainerConnected
              {...routeProps.location}
              contentType={contentType.dashboard}
            />
          )}
        />
        <Route
          exact={true}
          path="/projects/:projectDID/overview"
          render={(): JSX.Element => (
            <ProjectContainerConnected contentType={contentType.overview} />
          )}
        />
        <Route
          exact={true}
          path="/projects/:projectDID/detail/"
          render={(): JSX.Element => (
            <ProjectContainerConnected contentType={contentType.dashboard} />
          )}
        />
        <Route
          exact={true}
          path="/projects/:projectDID/detail/evaluators"
          render={(): JSX.Element => (
            <ProjectContainerConnected contentType={contentType.evaluators} />
          )}
        />
        <Route
          exact={true}
          path="/projects/:projectDID/detail/investors"
          render={(): JSX.Element => (
            <ProjectContainerConnected contentType={contentType.investors} />
          )}
        />
        <Route
          exact={true}
          path="/projects/:projectDID/detail/service-providers"
          render={(): JSX.Element => (
            <ProjectContainerConnected
              contentType={contentType.serviceProviders}
            />
          )}
        />
        <Route
          exact={true}
          path="/projects/:projectDID/detail/claims"
          render={(): JSX.Element => (
            <ProjectContainerConnected contentType={contentType.claims} />
          )}
        />
        <Route
          exact={true}
          path="/projects/:projectDID/detail/new-claim"
          render={(): JSX.Element => (
            <ProjectContainerConnected contentType={contentType.newClaim} />
          )}
        />
        <Route
          exact={true}
          path="/projects/:projectDID/detail/claims/:claimID"
          render={(): JSX.Element => (
            <ProjectContainerConnected contentType={contentType.singleClaim} />
          )}
        />
        <Route
          exact={true}
          path="/create-project"
          render={(routeProps): JSX.Element => (
            <ProjectCreateConnected {...routeProps} {...props} />
          )}
        />
        <Route
          exact={true}
          path="/upload-project"
          render={(routeProps): JSX.Element => (
            <ProjectCreateUploadPublicDocsConnected
              {...routeProps}
              {...props}
            />
          )}
        />
        <Route
          exact={true}
          path="/upload-project-create"
          render={(routeProps): JSX.Element => (
            <ProjectSignAndCreateConnected {...routeProps} {...props} />
          )}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </Fragment>
  )
}
