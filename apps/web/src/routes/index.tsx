import React, { lazy, Suspense } from 'react'
import { Route, Routes as ReactRouterRoutes, useNavigate } from 'react-router-dom'
import { Spinner } from 'components/Spinner/Spinner'
import { useIxoConfigs } from 'hooks/configs'

const Splash = lazy(() => import(/* webpackChunkName: "Splash" */ 'pages/Splash/Splash'))
const EditEntityPage = lazy(() => import(/* webpackChunkName: "EditEntityPage" */ 'pages/EditEntity/EditEntity'))
const CurrentEntityPage = lazy(
  () => import(/* webpackChunkName: "EntityExchangeTradeBid" */ 'pages/CurrentEntity/CurrentEntity'),
)
const TransferEntityPage = lazy(() => import('pages/TransferEntity'))
const EntityExchange = lazy(
  () => import(/* webpackChunkName: "EntityExchange" */ 'pages/EntityExchange/EntityExchange'),
)

const App: React.FunctionComponent = () => {
  const { entityConfig } = useIxoConfigs()
  const navigate = useNavigate()

  const splashIsRootRoute = React.useMemo(() => !!entityConfig?.route?.splashIsRootRoute, [entityConfig])

  React.useEffect(() => {
    if (splashIsRootRoute) {
      navigate('/')
    } else {
      navigate('/explore?ThisIsNotHowWeDo=0')
    }

    // eslint-disable-next-line
  }, [splashIsRootRoute])

  return (
    <Suspense fallback={<Spinner info='Loading' />}>
      <ReactRouterRoutes>
        <Route path='/' element={<Splash />} />
        <Route path='/exchange/*' element={<EntityExchange />} />
        <Route path='/edit/entity/:entityId' element={<EditEntityPage />} />
        <Route path='/entity/:entityId/*' element={<CurrentEntityPage />} />
        <Route path='/transfer/entity/:entityId' element={<TransferEntityPage />} />
        <Route path='*' element={<p>Nothing found in App maaaaan</p>} />
      </ReactRouterRoutes>
    </Suspense>
  )
}

export const Routes = App
