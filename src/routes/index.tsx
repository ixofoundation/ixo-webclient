import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ProjectContainerConnected } from '../components/project/ProjectContainer'
import { EntitiesContainerConnected } from '../modules/Entities/Entities.container'
import { EntitiesSelectConnected } from '../modules/Entities/Entities.container.select'
import { ProjectCreateConnected } from '../components/project/ProjectCreate'
import { contentType } from '../types/models'
import { ProjectForm } from '../pages/json'
import { Fragment } from 'react'
import { RegisterConnected } from '../pages/register/RegisterContainer'
import { NotFound } from '../components/public/NotFound'
import { Spinner } from '../common/components/Spinner'
import { ProjectSignAndCreateConnected } from '../components/project/curation/ProjectSignAndCreate'
import { ProjectCreateUploadPublicDocsConnected } from '../components/project/curation/ProjectCreateUploadPublicDocs'
import { UnderConstruction } from '../components/public/UnderConstruction'
import { SubmitEntityClaimConnected } from '../modules/SubmitEntityClaim/SubmitEntityClaim.container'
import { CreateEntityConnected } from '../modules/CreateEntity/CreateEntity.container'
import { CreateClaimTemplateConnected } from '../modules/CreateClaimTemplate/CreateClaimTemplate.container'
import BondRoutes from './BondRoutes'

export const Routes: React.SFC<{}> = props => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/json" component={ProjectForm} />
        <Route exact path="/spinner" component={Spinner} />
        <Route exact path="/register" component={RegisterConnected} />
        <Route
          path="/projects/:projectDID/bonds/:bondDID"
          component={BondRoutes}
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
          exact
          path="/claim_template/create"
          component={CreateClaimTemplateConnected}
        />
        <Route
          exact
          path="/projects/:projectDID/overview/action/new_claim/form"
          component={SubmitEntityClaimConnected}
        />
        <Route path="/:entityType/new" component={CreateEntityConnected} />
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
            // @ts-ignore
            <ProjectCreateConnected {...routeProps} {...props} />
          )}
        />
        <Route
          exact
          path="/upload-project"
          render={(routeProps): JSX.Element => (
            // @ts-ignore
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
