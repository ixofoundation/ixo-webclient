import * as React from 'react'
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom'
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
import EntityExchangeTrade from 'modules/Entities/SelectedEntity/EntityExchange/Trade'
import EntityExchangeTradeSwap from 'modules/Entities/SelectedEntity/EntityExchange/Trade/Swap'
import EntityExchangeTradeBuy from 'modules/Entities/SelectedEntity/EntityExchange/Trade/Buy'
import EntityExchangeTradeBid from 'modules/Entities/SelectedEntity/EntityExchange/Trade/Bid'
import { toggleAssistant } from 'redux/account/account.actions'
import { ToogleAssistantPayload } from 'redux/account/account.types'
import { connect, useSelector } from 'react-redux'
import Splash from 'pages/splash/Splash'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { CreateEntityPage } from 'pages'

interface Props {
  toggleAssistant?: (param: ToogleAssistantPayload) => void
}

const App: React.FunctionComponent<Props> = ({ toggleAssistant }) => {
  const entityTypeMap = useSelector(selectEntityConfig)
  const location = useLocation()
  const history = useHistory()

  React.useEffect(() => {
    if (location.pathname.includes('action')) {
      return
    }

    toggleAssistant!({
      forceClose: true,
    })
    // eslint-disable-next-line
  }, [location])

  const splashIsRootRoute = React.useMemo(() => !!entityTypeMap?.route?.splashIsRootRoute, [entityTypeMap])

  React.useEffect(() => {
    if (location.pathname === '/') {
      if (splashIsRootRoute) {
        history.push('/')
      } else {
        history.push('/explore')
      }
    }
    // eslint-disable-next-line
  }, [splashIsRootRoute, location.pathname])

  return (
    <Fragment>
      <Switch>
        <Route exact path='/json' component={ProjectForm} />
        <Route exact path='/spinner' component={Spinner} />
        <Route exact path='/register' component={RegisterConnected} />
        <Route exact path='/' render={Splash} />
        <Route
          exact
          path={'/explore'}
          render={(routeProps): JSX.Element => <EntitiesExplorer {...routeProps.location} />}
        />
        <Route path='/entities/select' component={EntitiesSelect} />
        <Route path='/:entityType/new' component={CreateEntity} />
        <Route exact path='/impact' render={(routeProps): JSX.Element => <EntitiesImpact {...routeProps.location} />} />
        <Route path='/entities/select' component={EntitiesSelect} />
        <Route path='/:entityType/new' component={CreateEntity} />
        <Route exact path='/impact' render={(routeProps): JSX.Element => <EntitiesImpact {...routeProps.location} />} />

        <Route path='/projects/:projectDID' component={EntityLayout} />
        <Route path='/investment/:projectDID' component={InvestmentRoutes} />
        <Route path='/test' component={Dashboard} />
        <Route path='/create/entity' component={CreateEntityPage} />
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
        <Route exact path='/todo' component={UnderConstruction} />
        <Route exact path={`/exchange`}>
          <Redirect to={`/exchange/trade`} />
        </Route>
        <Route exact path={`/exchange/trade`} component={EntityExchangeTrade} />
        <Route exact path={`/exchange/trade/swap`} component={EntityExchangeTradeSwap} />
        <Route exact path={`/exchange/trade/buy`} component={EntityExchangeTradeBuy} />
        <Route exact path={`/exchange/trade/bid`} component={EntityExchangeTradeBid} />
        <Route path='*' component={NotFound} />
      </Switch>
    </Fragment>
  )
}

const mapStateToProps = (): Record<string, any> => ({})

const mapDispatchToProps = (dispatch: any): any => ({
  toggleAssistant: (param: ToogleAssistantPayload): void => {
    dispatch(toggleAssistant(param))
  },
})

export const Routes = connect(mapStateToProps, mapDispatchToProps)(App)
