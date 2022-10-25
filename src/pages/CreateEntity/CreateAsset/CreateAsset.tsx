import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { TokenAttributeSetup, SelectCreationProcess } from './pages'

const CreateAsset: React.FC = (): JSX.Element => {
  return (
    <>
      <Route
        exact
        path={`/create/entity/asset/select-process`}
        component={SelectCreationProcess}
      />
      <Route
        exact
        path={`/create/entity/asset/attribute`}
        component={TokenAttributeSetup}
      />
      <Route exact path="/create/entity/asset">
        <Redirect to={`/create/entity/asset/select-process`} />
      </Route>
    </>
  )
}

export default CreateAsset
