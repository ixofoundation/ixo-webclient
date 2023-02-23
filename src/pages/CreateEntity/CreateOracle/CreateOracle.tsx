import React, { useEffect } from 'react'
import { Redirect, Route, RouteComponentProps, useRouteMatch } from 'react-router-dom'
import { useCreateEntityState, useCreateEntityStrategy } from 'hooks/createEntity'

const CreateOracle: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { updateTitle, updateSubtitle } = useCreateEntityState()
  const isSelectProcessRoute = useRouteMatch('/create/entity/oracle/select-process')
  const isSetupMetadataRoute = useRouteMatch('/create/entity/oracle/setup-metadata')
  const isSetupPropertiesRoute = useRouteMatch('/create/entity/oracle/setup-properties')
  const { steps } = getStrategyByEntityType('Oracle')

  useEffect(() => {
    updateTitle('Create an Oracle Method')
  }, [])

  useEffect(() => {
    if (isSelectProcessRoute?.isExact) {
      updateSubtitle('New or Clone')
    }
  }, [isSelectProcessRoute?.isExact])
  useEffect(() => {
    if (isSetupMetadataRoute?.isExact) {
      updateSubtitle('Method Metadata')
    }
  }, [isSetupMetadataRoute?.isExact])
  useEffect(() => {
    if (isSetupPropertiesRoute?.isExact) {
      updateSubtitle('Setup an additional information')
    }
  }, [isSetupPropertiesRoute?.isExact])

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

export default CreateOracle
