import React from 'react'
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { useCreateEntityStrategy } from 'states/createEntity/createEntity.hooks'

const CreateAsset: React.FC<Pick<RouteComponentProps, 'match'>> = ({
  match,
}): JSX.Element => {
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { steps } = getStrategyByEntityType('Asset')

  return (
    <>
      {Object.values(steps).map((step) => (
        <Route
          key={step.url}
          exact
          path={step.url}
          component={step.component}
        />
      ))}
      <Route exact path={`${match.path}`}>
        {steps[1] && steps[1].url && <Redirect to={steps[1].url} />}
      </Route>
    </>
  )
}

export default CreateAsset
