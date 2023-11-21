import React, { useEffect } from 'react'
import { Navigate, Route, matchPath, useLocation } from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'

const CreateOracle = (): JSX.Element => {
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { updateEntityType, updateTitle, updateSubtitle, updateBreadCrumbs } = useCreateEntityState()
  const { pathname } = useLocation()
  const isSelectProcessRoute = matchPath({path: '/create/entity/oracle/process', end: true }, pathname)
  const isSetupMetadataRoute = matchPath({path: '/create/entity/oracle/profile', end: true }, pathname)
  const isSetupPropertiesRoute = matchPath({path: '/create/entity/oracle/property', end: true}, pathname)
  const { steps } = getStrategyByEntityType('oracle')

  useEffect(() => {
    updateEntityType('oracle')
    updateTitle('Oracle creation')
    updateBreadCrumbs([{ text: 'Oracle' }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSelectProcessRoute) {
      updateSubtitle('New or Clone')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelectProcessRoute])
  useEffect(() => {
    if (isSetupMetadataRoute) {
      updateSubtitle('Profile')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupMetadataRoute])
  useEffect(() => {
    if (isSetupPropertiesRoute) {
      updateSubtitle('Setup additional information')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupPropertiesRoute])

  return (
    <>
      {Object.values(steps).map(({url, component: Component}) => (
        <Route key={url} path={url} element={<Component/>} />
      ))}
      <Route path={`${pathname}`}>
        {steps[1]?.url && <Navigate to={steps[1].url} />}
      </Route>
    </>
  )
}

export default CreateOracle
