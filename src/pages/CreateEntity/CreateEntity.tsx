import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import CreateAsset from './CreateAsset/CreateAsset'
import CreateInvestment from './CreateInvestment/CreateInvestment'
import CreateEntityLayout from './CreateEntityLayout/CreateEntityLayout'

const CreateEntity: React.FC = (): JSX.Element => {
  return (
    <CreateEntityLayout>
      <Route strict path={`/create/entity/asset`} component={CreateAsset} />
      <Route strict path={`/create/entity/investment`} component={CreateInvestment} />
      <Route exact path='/create/entity'>
        <Redirect to={`/create/entity/asset`} />
      </Route>
    </CreateEntityLayout>
  )
}

export default CreateEntity
