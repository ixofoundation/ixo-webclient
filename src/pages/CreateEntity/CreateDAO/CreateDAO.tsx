import React, { useEffect } from 'react'
import { Redirect, Route, RouteComponentProps, useRouteMatch } from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'

const CreateDAO: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { updateTitle, updateSubtitle } = useCreateEntityState()
  const isSelectProcessRoute = useRouteMatch('/create/entity/dao/select-process')
  const isSetupMetadataRoute = useRouteMatch('/create/entity/dao/setup-metadata')
  const isSetupGroupsRoute = useRouteMatch('/create/entity/dao/setup-groups')
  const isSetupPropertiesRoute = useRouteMatch('/create/entity/dao/setup-properties')
  const isReviewRoute = useRouteMatch('/create/entity/dao/review')
  const { steps } = getStrategyByEntityType('DAO')

  useEffect(() => {
    updateTitle('Create a DAO')
  }, [])

  useEffect(() => {
    if (isSelectProcessRoute?.isExact) {
      updateSubtitle('New or Clone')
    }
  }, [isSelectProcessRoute?.isExact])
  useEffect(() => {
    if (isSetupMetadataRoute?.isExact) {
      updateSubtitle('Metadata')
    }
  }, [isSetupMetadataRoute?.isExact])
  useEffect(() => {
    if (isSetupGroupsRoute?.isExact) {
      updateSubtitle('Add Groups')
    }
  }, [isSetupGroupsRoute?.isExact])
  useEffect(() => {
    if (isSetupPropertiesRoute?.isExact) {
      updateSubtitle('Configure the DAO Settings')
    }
  }, [isSetupPropertiesRoute?.isExact])
  useEffect(() => {
    if (isReviewRoute?.isExact) {
      updateSubtitle('Review and Sign to Commit')
    }
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

export default CreateDAO
