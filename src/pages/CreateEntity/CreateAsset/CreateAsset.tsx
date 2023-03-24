import React, { useEffect } from 'react'
import { Redirect, Route, RouteComponentProps, useRouteMatch } from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'

const CreateAsset: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { updateTitle, updateSubtitle } = useCreateEntityState()
  const isSelectProcessRoute = useRouteMatch('/create/entity/asset/select-process')
  const isSetupMetadataRoute = useRouteMatch('/create/entity/asset/setup-metadata')
  const isSetupPropertiesRoute = useRouteMatch('/create/entity/asset/setup-properties')
  const isReviewRoute = useRouteMatch('/create/entity/asset/review')
  const isCreateTokenRoute = useRouteMatch('/create/entity/asset/create-token')

  const { steps } = getStrategyByEntityType('Asset')

  useEffect(() => {
    updateTitle('Create an Asset Class')
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
      updateSubtitle('Token Metadata')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupMetadataRoute?.isExact])
  useEffect(() => {
    if (isSetupPropertiesRoute?.isExact) {
      updateSubtitle('Asset Class Properties')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupPropertiesRoute?.isExact])
  useEffect(() => {
    if (isReviewRoute?.isExact) {
      updateSubtitle('Asset Collection')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReviewRoute?.isExact])
  useEffect(() => {
    if (isCreateTokenRoute?.isExact) {
      updateSubtitle('Create an Asset')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreateTokenRoute?.isExact])

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

export default CreateAsset
