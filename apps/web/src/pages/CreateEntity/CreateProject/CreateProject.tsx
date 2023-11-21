import React, { useEffect } from 'react'
import { Navigate, Route, matchPath, useLocation } from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'

const CreateProject = (): JSX.Element => {
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { updateEntityType, updateTitle, updateSubtitle, updateBreadCrumbs } = useCreateEntityState()
  const { pathname } = useLocation()
  const isSelectProcessRoute = matchPath({path: '/create/entity/project/process', end: true}, pathname)
  const isProfileRoute = matchPath({path: '/create/entity/project/profile', end: true}, pathname)
  const isSetupPropertiesRoute = matchPath({path: '/create/entity/project/property', end: true}, pathname)
  const isReviewRoute = matchPath({path: '/create/entity/project/review', end: true}, pathname)
  const { steps } = getStrategyByEntityType('project')

  useEffect(() => {
    updateEntityType('project')
    updateTitle('Project creation')
    updateBreadCrumbs([{ text: 'PROJECT' }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSelectProcessRoute) {
      updateSubtitle('New or Clone')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelectProcessRoute])
  useEffect(() => {
    if (isProfileRoute) {
      updateSubtitle('Profile')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProfileRoute])
  useEffect(() => {
    if (isSetupPropertiesRoute) {
      updateSubtitle('Setup additional information')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupPropertiesRoute])
  useEffect(() => {
    if (isReviewRoute) {
      updateSubtitle('Data Collection Form')
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

export default CreateProject
