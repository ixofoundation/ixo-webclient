import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ProjectContainerConnected } from './project/ProjectContainer'
import { EntitiesContainerConnected } from '../modules/Entities/Entities.container'
import { ProjectCreateConnected } from './project/ProjectCreate'
import { contentType } from '../types/models'
import { ProjectForm } from './project/ProjectForm'
import { Fragment } from 'react'
import { Icons } from './common/Icons'
import { RegisterConnected } from './register/RegisterContainer'
import { NotFound } from './public/NotFound'
import { Spinner } from './common/Spinner'
import { ProjectSignAndCreateConnected } from './project/curation/ProjectSignAndCreate'
import { ProjectCreateUploadPublicDocsConnected } from './project/curation/ProjectCreateUploadPublicDocs'
import { Overview } from '../common/components/Bonds/OverviewWrapper/Overview'
import Exchange from '../common/components/Bonds/ExchangeWrapper/Exchange'
import Orders from '../modules/BondAccountOrders/BondAccountOrders.container'

export const Routes: React.SFC<{}> = props => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/json" component={ProjectForm} />
        <Route exact path="/spinner" component={Spinner} />
        <Route exact path="/json" component={ProjectForm} />
        <Route exact path="/icons" component={Icons} />
        <Route exact path="/register" component={RegisterConnected} />
        <Route
          exact
          path="/projects/:projectDID/bonds/:bondDID"
          component={Overview}
        />
        <Route
          path={['/projects/:projectDID/bonds/:bondDID/overview']}
          component={Overview}
        />
        <Route
          path="/projects/:projectDID/bonds/:bondDID/exchange"
          component={Exchange}
        />
        <Route
          path="/projects/:projectDID/bonds/:bondDID/orders"
          component={Orders}
        />
        <Route
          exact
          path="/"
          render={(routeProps): JSX.Element => (
            <EntitiesContainerConnected
              {...routeProps.location}
              // @ts-ignore
              contentType={contentType.overview}
            />
          )}
        />
        <Route
          exact
          path="/global-statistics"
          render={(routeProps): JSX.Element => (
            <EntitiesContainerConnected
              {...routeProps.location}
              // @ts-ignore
              contentType={contentType.dashboard}
            />
          )}
        />
        <Route
          exact
          path="/projects/:projectDID/overview"
          render={(): JSX.Element => (
            <ProjectContainerConnected
              // @ts-ignore
              contentType={contentType.overview}
            />
          )}
        />
        <Route
          exact
          path="/projects/:projectDID/detail/"
          render={(): JSX.Element => (
            <ProjectContainerConnected
              // @ts-ignore
              contentType={contentType.dashboard}
            />
          )}
        />
        <Route
          exact
          path="/projects/:projectDID/detail/evaluators"
          render={(): JSX.Element => (
            <ProjectContainerConnected
              // @ts-ignore
              contentType={contentType.evaluators}
            />
          )}
        />
        <Route
          exact
          path="/projects/:projectDID/detail/investors"
          render={(): JSX.Element => (
            <ProjectContainerConnected
              // @ts-ignore
              contentType={contentType.investors}
            />
          )}
        />
        <Route
          exact
          path="/projects/:projectDID/detail/service-providers"
          render={(): JSX.Element => (
            <ProjectContainerConnected
              // @ts-ignore
              contentType={contentType.serviceProviders}
            />
          )}
        />
        <Route
          exact
          path="/projects/:projectDID/detail/claims"
          render={(): JSX.Element => (
            <ProjectContainerConnected
              // @ts-ignore
              contentType={contentType.claims}
            />
          )}
        />
        <Route
          exact
          path="/projects/:projectDID/detail/new-claim"
          render={(): JSX.Element => (
            <ProjectContainerConnected
              // @ts-ignore
              contentType={contentType.newClaim}
            />
          )}
        />
        <Route
          exact
          path="/projects/:projectDID/detail/claims/:claimID"
          render={(): JSX.Element => (
            <ProjectContainerConnected
              // @ts-ignore
              contentType={contentType.singleClaim}
            />
          )}
        />
        <Route
          exact
          path="/create-project"
          render={(routeProps): JSX.Element => (
            <ProjectCreateConnected {...routeProps} {...props} />
          )}
        />
        <Route
          exact
          path="/upload-project"
          render={(routeProps): JSX.Element => (
            <ProjectCreateUploadPublicDocsConnected
              {...routeProps}
              {...props}
            />
          )}
        />
        <Route
          exact
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
