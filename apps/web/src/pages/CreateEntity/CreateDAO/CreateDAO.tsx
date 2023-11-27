import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'
import _ from 'lodash'

const CreateDAO = (): JSX.Element => {
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { updateEntityType, updateTitle, updateSubtitle, updateBreadCrumbs, subtitle, entityType, title, breadCrumbs } =
    useCreateEntityState()
  const { pathname } = useLocation()
  const { steps } = getStrategyByEntityType('dao')

  useEffect(() => {
    if (!entityType) {
      updateEntityType('dao')
    }

    if (title !== 'DAO creation') {
      updateTitle('DAO creation')
    }

    if (!_.isEqual(breadCrumbs, [{ text: 'DAO' }])) {
      updateBreadCrumbs([{ text: 'DAO' }])
    }

    const routeMap = {
      '/create/entity/dao/process': 'New or Clone',
      '/create/entity/dao/profile': 'Profile',
      '/create/entity/dao/group': 'Add Groups',
      '/create/entity/dao/property': 'Configure the DAO Settings',
      '/create/entity/dao/review': 'Review and Sign to Commit',
    }

    console.log({ pathname })

    const newSubtitle = routeMap[pathname] || ''
    if (newSubtitle !== subtitle) {
      updateSubtitle(newSubtitle)
    }
  }, [
    pathname,
    updateEntityType,
    updateTitle,
    updateSubtitle,
    subtitle,
    breadCrumbs,
    entityType,
    title,
    updateBreadCrumbs,
  ])

  return (
    <Routes>
      <>
        <Route index element={steps[1]?.fullUrl && <Navigate to={steps[1].fullUrl} />} />
        {Object.values(steps).map(({ url, component: Component }) => (
          <Route key={url} path={url} element={<Component />} />
        ))}
      </>
    </Routes>
  )
}

export default CreateDAO
