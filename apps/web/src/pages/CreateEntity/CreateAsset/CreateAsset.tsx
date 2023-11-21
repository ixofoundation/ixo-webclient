import React, { useEffect } from 'react'
import { Navigate, Route, matchPath, useLocation } from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'

const CreateAsset = (): JSX.Element => {
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { updateEntityType, updateTitle, updateSubtitle, updateBreadCrumbs } = useCreateEntityState()
  const { pathname } = useLocation()
  const isSelectProcessRoute = matchPath({ path: '/create/entity/asset/process', end: true }, pathname)
  const isSetupMetadataRoute = matchPath({ path: '/create/entity/asset/profile', end: true }, pathname)
  const isSetupPropertiesRoute = matchPath({ path: '/create/entity/asset/property', end: true }, pathname)
  const isReviewRoute = matchPath({ path: '/create/entity/asset/review', end: true }, pathname)
  const isCreateTokenRoute = matchPath({ path: '/create/entity/asset/create-token', end: true }, pathname)

  const { steps } = getStrategyByEntityType('asset')

  useEffect(() => {
    updateEntityType('asset')
    updateTitle('Asset Class creation')
    updateBreadCrumbs([{ text: 'ASSET' }])
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
      updateSubtitle('Asset Class Properties')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupPropertiesRoute])
  useEffect(() => {
    if (isReviewRoute) {
      updateSubtitle('Asset Collection')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReviewRoute])
  useEffect(() => {
    if (isCreateTokenRoute) {
      updateSubtitle('Create Asset')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateTokenRoute])

  return (
    <>
      {Object.values(steps).map(({url, component: Component}) => (
        <Route key={url} path={url} element={<Component/>} />
      ))}
      <Route path={`${pathname}`}>
        {steps[1] && steps[1].url && <Navigate to={steps[1].url} />}
      </Route>
    </>
  )
}

export default CreateAsset
