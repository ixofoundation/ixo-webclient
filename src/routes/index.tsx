import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { toggleAssistant } from 'redux/account/account.actions'
import { ToogleAssistantPayload } from 'redux/account/account.types'
import { connect, useSelector } from 'react-redux'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { Spinner } from 'components/Spinner/Spinner'

const InvestmentRoutes = lazy(() => import('./InvestmentRoutes'))
const Splash = lazy(() => import('pages/Splash/Splash'))
const EntitiesExplorer = lazy(() => import('components/Entities/EntitiesExplorer/EntitiesExplorer.container'))
const EntitiesSelect = lazy(() => import('components/Entities/EntitiesExplorer/EntitiesExplorer'))
const EntitiesImpact = lazy(() => import('components/Entities/EntitiesExplorer/EntitiesImpact/EntitiesImpact'))
const CreateEntity = lazy(() => import('components/Entities/CreateEntity/CreateEntity'))
const CreateEntityPage = lazy(() => import('pages/CreateEntity/CreateEntity'))
const EntityLayout = lazy(() => import('components/Entities/SelectedEntity/EntityLayout'))
const UnderConstruction = lazy(() => import('pages/Error/UnderConstruction'))
const NotFound = lazy(() => import('pages/Error/NotFound'))
const EntityExchangeTrade = lazy(() => import('components/Entities/SelectedEntity/EntityExchange/Trade/Swap'))
const EntityExchangeTradeSwap = lazy(() => import('components/Entities/SelectedEntity/EntityExchange/Trade/Swap/Swap'))
const EntityExchangeTradeBuy = lazy(() => import('components/Entities/SelectedEntity/EntityExchange/Trade/Buy/Buy'))
const EntityExchangeTradeBid = lazy(() => import('components/Entities/SelectedEntity/EntityExchange/Trade/Bid/Bid'))

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
    <Suspense fallback={<Spinner info='Loading' />}>
      <Switch>
        <Route exact path='/' component={Splash} />
        <Route
          exact
          path={'/explore'}
          render={(routeProps): JSX.Element => <EntitiesExplorer {...routeProps.location} />}
        />
        <Route path='/entities/select' component={EntitiesSelect} />
        <Route path='/:entityType/new' component={CreateEntity} />
        <Route exact path='/impact' render={(routeProps): JSX.Element => <EntitiesImpact {...routeProps.location} />} />

        <Route path='/projects/:projectDID' component={EntityLayout} />
        <Route path='/investment/:projectDID' component={InvestmentRoutes} />
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
    </Suspense>
  )
}

const mapStateToProps = (): Record<string, any> => ({})

const mapDispatchToProps = (dispatch: any): any => ({
  toggleAssistant: (param: ToogleAssistantPayload): void => {
    dispatch(toggleAssistant(param))
  },
})

export const Routes = connect(mapStateToProps, mapDispatchToProps)(App)
