import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { SelectType } from './SelectType'

const CreateProtocol: React.FC = () => {
  return (
    <>
      <Route exact path='/create/entity/protocol/type' component={SelectType} />

      <Route exact path='/create/entity/protocol'>
        <Redirect to='/create/entity/protocol/type' />
      </Route>
    </>
  )
}

export default CreateProtocol
