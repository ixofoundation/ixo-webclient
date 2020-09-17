import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ProjectContainerConnected } from '../components/project/ProjectContainer'
import EntitiesExplorer from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.container'
import EntityOverview from 'modules/Entities/SelectedEntity/EntityOverview/EntityOverview.container'
import EntitiesImpact from 'modules/Entities/EntitiesExplorer/EntitiesImpact/EntitiesImpact.container'
import SubmitEntityClaim from 'modules/EntityClaims/SubmitEntityClaim/SubmitEntityClaim.container'
import CreateEntity from 'modules/Entities/CreateEntity/CreateEntity.container'
import EntitiesSelect from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.container.select'
import { ProjectCreateConnected } from '../components/project/ProjectCreate'
import { contentType } from '../types/models'
import { ProjectForm } from '../pages/json'
import { Fragment } from 'react'
import { RegisterConnected } from '../pages/register/RegisterContainer'
import { NotFound } from '../components/public/NotFound'
import { Spinner } from 'common/components/Spinner'
import { ProjectSignAndCreateConnected } from '../components/project/curation/ProjectSignAndCreate'
import { ProjectCreateUploadPublicDocsConnected } from '../components/project/curation/ProjectCreateUploadPublicDocs'
import { UnderConstruction } from '../components/public/UnderConstruction'
import BondRoutes from './BondRoutes'
import InvestmentRoutes from './InvestmentRoutes'

export const Routes: React.SFC<{}> = (props) => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/json" component={ProjectForm} />
        <Route exact path="/spinner" component={Spinner} />
        <Route exact path="/register" component={RegisterConnected} />
        <Route path="/investment/:projectDID" component={InvestmentRoutes} />
        <Route
          path="/projects/:projectDID/bonds/:bondDID"
          component={BondRoutes}
        />
        <Route
          exact
          path="/"
          render={(routeProps): JSX.Element => (
            <EntitiesExplorer {...routeProps.location} />
          )}
        />
        <Route path="/entities/select" component={EntitiesSelect} />
        <Route
          exact
          path="/projects/:projectDID/overview/action/new_claim/form"
          component={SubmitEntityClaim}
        />
        <Route path="/:entityType/new" component={CreateEntity} />
        <Route
          exact
          path="/impact"
          render={(routeProps): JSX.Element => (
            <EntitiesImpact {...routeProps.location} />
          )}
        />
        <Route
          path="/projects/:projectDID/overview"
          component={EntityOverview}
        />
        <Route
          exact
          path="/projects/:projectDID/detail/"
          render={(): JSX.Element => (
            <ProjectContainerConnected contentType={contentType.dashboard} />
          )}
        />
        <Route
          exact
          path="/projects/:projectDID/detail/agents"
          render={(): JSX.Element => (
            <ProjectContainerConnected contentType={contentType.agents} />
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
