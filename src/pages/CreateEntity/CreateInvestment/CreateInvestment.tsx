import React from 'react'
import { Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { useCreateEntityStrategy } from 'hooks/createEntity'

const CreateInvestment: React.FC<Pick<RouteComponentProps, 'match'>> = ({ match }): JSX.Element => {
  const { getStrategyByEntityType } = useCreateEntityStrategy()
  const { steps } = getStrategyByEntityType('Investment')

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