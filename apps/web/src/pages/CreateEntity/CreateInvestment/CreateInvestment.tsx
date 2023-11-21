import React, { useEffect } from 'react'
import { Navigate, Route, matchPath, useLocation } from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'

const CreateInvestment= (): JSX.Element => {
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { updateEntityType, updateTitle, updateSubtitle, updateBreadCrumbs } = useCreateEntityState()
  const { pathname } = useLocation()
  const isSelectProcessRoute = matchPath({ path: '/create/entity/investment/process', end: true }, pathname)
  const isSetupMetadataRoute = matchPath({ path: '/create/entity/investment/profile', end: true }, pathname)
  const isSetupInstrumentRoute = matchPath({ path: '/create/entity/investment/instrument', end: true }, pathname)
  const isSetupPropertiesRoute = matchPath({ path: '/create/entity/investment/property', end: true}, pathname)
  const isReviewRoute = matchPath({ path: '/create/entity/investment/review', end: true}, pathname)
  const { steps } = getStrategyByEntityType('investment')

  useEffect(() => {
    updateEntityType('investment')
    updateTitle('Investment creation')
    updateBreadCrumbs([{ text: 'INVESTMENT' }])
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
    if (isSetupInstrumentRoute) {
      updateSubtitle('Create Investment Instrument/s')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupInstrumentRoute])
  useEffect(() => {
    if (isSetupPropertiesRoute) {
      updateSubtitle('Configure the Investment Settings')
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
        {steps[1] && steps[1].url && <Navigate to={steps[1].url} />}
      </Route>
    </>
  )
}

export default CreateInvestment
