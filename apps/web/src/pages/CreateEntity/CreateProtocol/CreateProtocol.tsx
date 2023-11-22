import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SelectType from './SelectType/SelectType'
import CreateClaim from '../CreateClaim/CreateClaim'

const CreateProtocol: React.FC = () => {
  return (
    <Routes>
      <Route path='/create/entity/protocol/type' element={<SelectType/>} />
      <Route path='/create/entity/protocol/claim' element={<CreateClaim/>} />
      <Route  path='/create/entity/protocol' element={<Navigate to='/create/entity/protocol/type' />}/>
    </Routes>
  )
}

export default CreateProtocol
