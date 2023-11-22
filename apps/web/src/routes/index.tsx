import React, { lazy, Suspense } from 'react'
import { Route, useLocation, Routes as ReactRouterRoutes, useNavigate, Outlet } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { selectEntityConfig } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { Spinner } from 'components/Spinner/Spinner'
import { Text } from '@mantine/core'

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

const App: React.FunctionComponent = () => {
  const entityTypeMap = useAppSelector(selectEntityConfig)
  const location = useLocation()
  const navigate = useNavigate()

  // React.useEffect(() => {
  //   if (location.pathname.includes('action')) {
  //     return
  //   }
  //   // eslint-disable-next-line
  // }, [location])

  const splashIsRootRoute = React.useMemo(() => !!entityTypeMap?.route?.splashIsRootRoute, [entityTypeMap])

  React.useEffect(() => {
    if (location.pathname === '/') {
      console.log("routes index")
      if (splashIsRootRoute) {
        navigate('/')
      } else {
        navigate('/explore')
      }
    }
    console.log("routes index, useEffect body")
    // eslint-disable-next-line
  }, [splashIsRootRoute, location.pathname])

  return (
    <Suspense fallback={<Spinner info='Loading' />}>
      <ReactRouterRoutes>
        <Route path='/' element={<Splash />} />
        <Route path='/explore' element={<EntitiesExplorer />} />
        <Route path='/exchange' element={<EntityExchange />} />
        <Route path='/create/entity/*' element={<CreateEntityPage />} />
        <Route path='/edit/entity/:entityId' element={<EditEntityPage />} />
        <Route path='/entity/:entityId/*' element={<CurrentEntityPage />} />
        <Route path='/transfer/entity/:entityId' element={<TransferEntityPage />} />
        <Route path='*' element={<p>Nothing found in App maaaaan</p>} />
      </ReactRouterRoutes>
    </Suspense>
  )
}

export const Routes = App
