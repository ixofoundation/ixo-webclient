import React, { useEffect } from 'react'
import { Redirect, Route, RouteComponentProps, useRouteMatch } from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'

const CreateClaim: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { updateEntityType, updateTitle, updateSubtitle, updateBreadCrumbs } = useCreateEntityState()
  const isSelectProcessRoute = useRouteMatch('/create/entity/claim/select-process')
  const isSetupMetadataRoute = useRouteMatch('/create/entity/claim/setup-metadata')
  const isSetupDataCollectionRoute = useRouteMatch('/create/entity/claim/setup-data-collection')
  const isSetupPropertiesRoute = useRouteMatch('/create/entity/claim/setup-properties')
  const { steps } = getStrategyByEntityType('protocol')

  useEffect(() => {
    updateEntityType('protocol')
    updateTitle('Verifiable Claim creation')
    updateBreadCrumbs([{ text: 'Protocol' }])
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
      updateSubtitle('Create Claim Metadata')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupMetadataRoute?.isExact])
  useEffect(() => {
    if (isSetupDataCollectionRoute?.isExact) {
      updateSubtitle('Data Collection Form')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupDataCollectionRoute?.isExact])
  useEffect(() => {
    if (isSetupPropertiesRoute?.isExact) {
      updateSubtitle('Configuration')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupPropertiesRoute?.isExact])

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

export default CreateClaim
