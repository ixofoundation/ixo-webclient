import React, { lazy } from 'react'
import { Route, Routes as ReactRouterRoutes, useNavigate } from 'react-router-dom'
import { useIxoConfigs } from 'hooks/configs'
import { Flex } from '@mantine/core'

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
    <ReactRouterRoutes>
      <Route path='/' element={<Splash />} />
      <Route path='exchange/*' element={<EntityExchange />} />
      <Route path='edit/entity/:entityId' element={<EditEntityPage />} />
      <Route path='entity/:entityId/*' element={<CurrentEntityPage />} />
      <Route path='transfer/entity/:entityId' element={<TransferEntityPage />} />
      <Route
        path='*'
        element={
          <Flex h='100vh' w='100vw' justify='center' align='center'>
            Nothing found in App maaaaan
          </Flex>
        }
      />
    </ReactRouterRoutes>
  )
}

export const Routes = App
