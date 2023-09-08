import React, { lazy, Suspense } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { toggleAssistant } from 'redux/account/account.actions'
import { ToogleAssistantPayload } from 'redux/account/account.types'
import { connect } from 'react-redux'
import { useAppSelector } from 'redux/hooks'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { Spinner } from 'components/Spinner/Spinner'

const Splash = lazy(() => import(/* webpackChunkName: "Splash" */ 'pages/Splash/Splash'))
const EntitiesExplorer = lazy(
  () => import(/* webpackChunkName: "EntitiesExplorer" */ 'pages/EntitiesExplorer/EntitiesExplorer.container'),
)
const CreateEntityPage = lazy(
  () => import(/* webpackChunkName: "CreateEntityPage" */ 'pages/CreateEntity/CreateEntity'),
)
const EditEntityPage = lazy(() => import(/* webpackChunkName: "EditEntityPage" */ 'pages/EditEntity/EditEntity'))
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ 'pages/Error/NotFound'))
const CurrentEntityPage = lazy(
  () => import(/* webpackChunkName: "EntityExchangeTradeBid" */ 'pages/CurrentEntity/CurrentEntity'),
)
const TransferEntityPage = lazy(() => import('pages/TransferEntity'))
const EntityExchange = lazy(
  () => import(/* webpackChunkName: "EntityExchange" */ 'pages/EntityExchange/EntityExchange'),
)

interface Props {
  toggleAssistant?: (param: ToogleAssistantPayload) => void
}

const App: React.FunctionComponent<Props> = ({ toggleAssistant }) => {
  const entityTypeMap = useAppSelector(selectEntityConfig)
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
        <Route path='/exchange' component={EntityExchange} />
        <Route path='/create/entity' component={CreateEntityPage} />
        <Route path='/edit/entity/:entityId' component={EditEntityPage} />
        <Route path='/entity/:entityId' component={CurrentEntityPage} />
        <Route path='/transfer/entity/:entityId' component={TransferEntityPage} />
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
