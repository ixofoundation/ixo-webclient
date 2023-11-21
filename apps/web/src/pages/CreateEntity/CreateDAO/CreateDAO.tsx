import React, { useEffect } from 'react'
import { Navigate, Route, matchPath, useLocation} from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'

const CreateDAO = (): JSX.Element => {
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { updateEntityType, updateTitle, updateSubtitle, updateBreadCrumbs } = useCreateEntityState()
  const { pathname } = useLocation()
  const isSelectProcessRoute = matchPath({path: '/create/entity/dao/process', end: true}, pathname)
  const isSetupMetadataRoute = matchPath({path: '/create/entity/dao/profile', end: true}, pathname)
  const isSetupGroupsRoute = matchPath({path: '/create/entity/dao/group', end: true}, pathname)
  const isSetupPropertiesRoute = matchPath({path: '/create/entity/dao/property', end: true}, pathname)
  const isReviewRoute = matchPath({path: '/create/entity/dao/review', end: true}, pathname)
  const { steps } = getStrategyByEntityType('dao')

  useEffect(() => {
    updateEntityType('dao')
    updateTitle('DAO creation')
    updateBreadCrumbs([{ text: 'DAO' }])
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
    if (isSetupGroupsRoute) {
      updateSubtitle('Add Groups')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupGroupsRoute])
  useEffect(() => {
    if (isSetupPropertiesRoute) {
      updateSubtitle('Configure the DAO Settings')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupPropertiesRoute])
  useEffect(() => {
    if (isReviewRoute) {
      updateSubtitle('Review and Sign to Commit')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReviewRoute])

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

export default CreateDAO
