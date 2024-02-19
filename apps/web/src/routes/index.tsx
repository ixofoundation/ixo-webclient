import React, { lazy } from 'react'
import { Route, Routes as ReactRouterRoutes, Navigate } from 'react-router-dom'
import { useIxoConfigs } from 'hooks/configs'
import { Flex } from '@mantine/core'

const Splash = lazy(() => import('pages/Splash/Splash'))

const App: React.FunctionComponent = () => {
  const { entityConfig } = useIxoConfigs()

  const splashIsRootRoute = React.useMemo(() => !!entityConfig?.route?.splashIsRootRoute, [entityConfig])

  return (
    <ReactRouterRoutes>
      {!splashIsRootRoute && <Route index element={<Navigate to={`/explore?type=dao`} />} />}
      <Route path='/' element={<Splash />} />
      <Route
        path='*'
        element={
          <Flex h='100vh' w='100vw' justify='center' align='center'>
            <Flex w={500}>
              We encountered an issue and a detailed error message has been sent to our team. For now, click the Explore
              button to go back to the home page.
            </Flex>
          </Flex>
        }
      />
    </ReactRouterRoutes>
  )
}

export const Routes = App
