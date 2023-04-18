import React, { useEffect } from 'react'
import { Redirect, Route, RouteComponentProps, useRouteMatch } from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'

const CreateInvestment: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { updateEntityType, updateTitle, updateSubtitle, updateBreadCrumbs } = useCreateEntityState()
  const isSelectProcessRoute = useRouteMatch('/create/entity/investment/process')
  const isSetupMetadataRoute = useRouteMatch('/create/entity/investment/profile')
  const isSetupInstrumentRoute = useRouteMatch('/create/entity/investment/instrument')
  const isSetupPropertiesRoute = useRouteMatch('/create/entity/investment/property')
  const isReviewRoute = useRouteMatch('/create/entity/investment/review')
  const { steps } = getStrategyByEntityType('investment')

  useEffect(() => {
    updateEntityType('investment')
    updateTitle('Investment creation')
    updateBreadCrumbs([{ text: 'INVESTMENT' }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSelectProcessRoute?.isExact) {
      updateSubtitle('New or Clone')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelectProcessRoute?.isExact])
  useEffect(() => {
    if (isSetupMetadataRoute?.isExact) {
      updateSubtitle('Profile')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupMetadataRoute?.isExact])
  useEffect(() => {
    if (isSetupInstrumentRoute?.isExact) {
      updateSubtitle('Create Investment Instrument/s')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupInstrumentRoute?.isExact])
  useEffect(() => {
    if (isSetupPropertiesRoute?.isExact) {
      updateSubtitle('Configure the Investment Settings')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupPropertiesRoute?.isExact])
  useEffect(() => {
    if (isReviewRoute?.isExact) {
      updateSubtitle('Review and Sign to Commit')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReviewRoute?.isExact])

  return (
    <>
      {Object.values(steps).map((step) => (
        <Route key={step.url} exact path={step.url} component={step.component} />
      ))}
      <Route exact path={`${match.path}`}>
        {steps[1] && steps[1].url && <Redirect to={steps[1].url} />}
      </Route>
    </>
  )
}

export default CreateInvestment
