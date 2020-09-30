import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import EntitiesExplorer from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.container'
import EntitiesImpact from 'modules/Entities/EntitiesExplorer/EntitiesImpact/EntitiesImpact.container'
import CreateEntity from 'modules/Entities/CreateEntity/CreateEntity.container'
import EntityImpact from 'modules/Entities/SelectedEntity/EntityImpact/EntityImpact.container'
import EntitiesSelect from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.container.select'
import { ProjectForm } from '../pages/json'
import { Fragment } from 'react'
import { RegisterConnected } from '../pages/register/RegisterContainer'
import { NotFound } from '../public/NotFound'
import { Spinner } from 'common/components/Spinner'
import { UnderConstruction } from '../public/UnderConstruction'
import BondRoutes from './BondRoutes'
import InvestmentRoutes from './InvestmentRoutes'
import EntityLayout from 'modules/Entities/SelectedEntity/EntityLayout.container'

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
        {/* <Route
          exact
          path="/projects/:projectDID/overview/action/new_claim/form"
          component={SubmitEntityClaim}
        /> */}
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
          component={EntityLayout}
        />
        <Route path="/projects/:projectDID/detail" component={EntityImpact} />
        {/* Old claims related screens - remove when new claims is ready */}
        {/*
                <Route
          exact
          path="/projects/:projectDID/detail/agents"
          render={(): JSX.Element => (
            <ProjectContainerConnected contentType={contentType.agents} />
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
        <Route exact path="/todo" component={UnderConstruction} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Fragment>
  )
}
