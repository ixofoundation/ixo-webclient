import * as React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import EntitiesExplorer from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.container'
import EntitiesImpact from 'modules/Entities/EntitiesExplorer/EntitiesImpact/EntitiesImpact.container'
import CreateEntity from 'modules/Entities/CreateEntity/CreateEntity.container'
import EntitiesSelect from 'modules/Entities/EntitiesExplorer/EntitiesExplorer.container.select'
import { ProjectForm } from '../pages/json'
import { Fragment } from 'react'
import { RegisterConnected } from '../pages/register/RegisterContainer'
import { NotFound } from '../public/NotFound'
import { Spinner } from 'common/components/Spinner'
import { UnderConstruction } from '../public/UnderConstruction'
import InvestmentRoutes from './InvestmentRoutes'
import EntityLayout from 'modules/Entities/SelectedEntity/EntityLayout.container'
import Dashboard from 'common/components/Dashboard/Dashboard'
import { toggleAssistant } from 'modules/Account/Account.actions'
import { ToogleAssistantPayload } from 'modules/Account/types'
import { connect } from 'react-redux'
import { RootState } from 'common/redux/types'

interface Props {
  toggleAssistant?: (param: ToogleAssistantPayload) => void
}

const App: React.FunctionComponent<Props> = ({ toggleAssistant }) => {
  const location = useLocation()

  React.useEffect(() => {
    if (location.pathname.includes('action')) {
      return
    }

    toggleAssistant({
      forceClose: true,
    })
    // eslint-disable-next-line
  }, [location])

  return (
    <Fragment>
      <Switch>
        <Route exact path="/json" component={ProjectForm} />
        <Route exact path="/spinner" component={Spinner} />
        <Route exact path="/register" component={RegisterConnected} />
        <Route
          exact
          path="/"
          render={(routeProps): JSX.Element => (
            <EntitiesExplorer {...routeProps.location} />
          )}
        />
        <Route path="/entities/select" component={EntitiesSelect} />
        <Route path="/:entityType/new" component={CreateEntity} />
        <Route
          exact
          path="/impact"
          render={(routeProps): JSX.Element => (
            <EntitiesImpact {...routeProps.location} />
          )}
        />

        <Route path="/projects/:projectDID" component={EntityLayout} />
        <Route path="/investment/:projectDID" component={InvestmentRoutes} />
        <Route path="/test" component={Dashboard} />
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

const mapStateToProps = (state: RootState): Record<string, any> => ({})

const mapDispatchToProps = (dispatch: any): any => ({
  toggleAssistant: (param: ToogleAssistantPayload): void => {
    dispatch(toggleAssistant(param))
  },
})

export const Routes = connect(mapStateToProps, mapDispatchToProps)(App)
