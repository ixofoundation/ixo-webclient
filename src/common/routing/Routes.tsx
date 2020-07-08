import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ProjectContainerConnected } from '../../components/project/ProjectContainer'
import { EntitiesContainerConnected } from '../../modules/Entities/Entities.container'
import { EntitiesSelectConnected } from '../../modules/Entities/Entities.container.select'
import { ProjectCreateConnected } from '../../components/project/ProjectCreate'
import { contentType } from '../../types/models'
import { ProjectForm } from '../../components/project/ProjectForm'
import { Fragment } from 'react'
import { RegisterConnected } from '../../components/register/RegisterContainer'
import { NotFound } from '../../components/public/NotFound'
import { Spinner } from '../components/Spinner'
import { ProjectSignAndCreateConnected } from '../../components/project/curation/ProjectSignAndCreate'
import { ProjectCreateUploadPublicDocsConnected } from '../../components/project/curation/ProjectCreateUploadPublicDocs'
import { Overview } from '../components/Bonds/OverviewWrapper/Overview'
import Exchange from '../components/Bonds/ExchangeWrapper/Exchange'
import Orders from '../../modules/BondAccountOrders/BondAccountOrders.container'
import { UnderConstruction } from '../../components/public/UnderConstruction'
import { SubmitEntityClaimConnected } from 'src/modules/SubmitEntityClaim/SubmitEntityClaim.container'

export const Routes: React.SFC<{}> = props => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/json" component={ProjectForm} />
        <Route exact path="/spinner" component={Spinner} />
        <Route exact path="/json" component={ProjectForm} />
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
        <Route path="/entities/select" component={EntitiesSelectConnected} />
        <Route
          path="/projects/:projectDID/overview/new_claim/form"
          component={SubmitEntityClaimConnected}
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
        {/* Old claims related screens - remove when new claims is ready */}
        {/*
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
        /> */}
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
        <Route exact path="/todo" component={UnderConstruction} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Fragment>
  )
}
