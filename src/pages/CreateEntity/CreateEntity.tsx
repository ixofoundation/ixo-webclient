import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { CreateAsset } from './CreateAsset'
import { CreateEntityLayout } from './CreateEntityLayout'

const CreateEntity: React.FC = (): JSX.Element => {
  return (
    <CreateEntityLayout>
      <Route strict path={`/create/entity/asset`} component={CreateAsset} />
      <Route exact path="/create/entity">
        <Redirect to={`/create/entity/asset`} />
      </Route>
    </CreateEntityLayout>
  )
}

export default CreateEntity
