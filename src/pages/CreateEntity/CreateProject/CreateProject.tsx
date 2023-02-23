import React, { useEffect } from 'react'
import { Redirect, Route, RouteComponentProps, useRouteMatch } from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'

const CreateProject: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { updateTitle, updateSubtitle } = useCreateEntityState()
  const isSelectProcessRoute = useRouteMatch('/create/entity/project/select-process')
  const isSetupMetadataRoute = useRouteMatch('/create/entity/project/setup-metadata')
  const isSetupPropertiesRoute = useRouteMatch('/create/entity/project/setup-properties')
  const isReviewRoute = useRouteMatch('/create/entity/project/review')
  const { steps } = getStrategyByEntityType('Project')

  useEffect(() => {
    updateTitle('Create a Project Template')
  }, [])

  useEffect(() => {
    if (isSelectProcessRoute?.isExact) {
      updateSubtitle('New or Clone')
    }
  }, [isSelectProcessRoute?.isExact])
  useEffect(() => {
    if (isSetupMetadataRoute?.isExact) {
      updateSubtitle('Template Metadata')
    }
  }, [isSetupMetadataRoute?.isExact])
  useEffect(() => {
    if (isSetupPropertiesRoute?.isExact) {
      updateSubtitle('Setup an additional information')
    }
  }, [isSetupPropertiesRoute?.isExact])
  useEffect(() => {
    if (isReviewRoute?.isExact) {
      updateSubtitle('Data Collection Form')
    }
  }, [isReviewRoute?.isExact])

  return (
    <>
      {Object.values(steps).map((step) => (
        <Route key={step.url} exact path={step.url} component={step.component} />
      ))}
      <Route exact path={`${match.path}`}>
        {steps[1]?.url && <Redirect to={steps[1].url} />}
      </Route>
    </>
  )
}

export default CreateProject
