import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import SelectType from './SelectType/SelectType'
import CreateClaim from '../CreateClaim/CreateClaim'

const CreateProtocol: React.FC = () => {
  return (
    <>
      <Route path='/create/entity/protocol/type' element={<SelectType/>} />
      <Route path='/create/entity/protocol/claim' element={<CreateClaim/>} />

      <Route  path='/create/entity/protocol'>
        <Navigate to='/create/entity/protocol/type' />
      </Route>
    </>
  )
}

export default CreateProtocol
