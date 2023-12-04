import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import SelectType from './SelectType/SelectType'
import CreateClaim from '../CreateClaim/CreateClaim'
import CreateDeed from '../CreateDeed/CreateDeed'

const CreateProtocol: React.FC = () => {
  return (
    <>
      <Route path='/create/entity/protocol/type' component={SelectType} />
      <Route path='/create/entity/protocol/claim' component={CreateClaim} />
      <Route path='/create/entity/protocol/deed' component={CreateDeed} />

      <Route exact path='/create/entity/protocol'>
        <Redirect to='/create/entity/protocol/type' />
      </Route>
    </>
  )
}

export default CreateProtocol
