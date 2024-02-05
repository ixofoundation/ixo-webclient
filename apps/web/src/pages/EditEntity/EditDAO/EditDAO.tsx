import React, { useContext, useEffect } from 'react'
import {  Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { EditEntityContext } from '../EditEntity'
import EditGroups from './EditGroups/EditGroups'
import EditMetadata from './EditMetadata/EditMetadata'
import EditProperty from './EditProperty/EditProperty'
import ReviewDAO from './ReviewDAO/ReviewDAO'

const EditDAO: React.FC = (): JSX.Element => {
  const {search} = useLocation()
  const { entityId } = useParams<{ entityId: string }>()

  const entity = useContext(EditEntityContext)
  const profile = entity.profile
  const entityName = profile?.name || ''

  useEffect(() => {
    entity.updatePartial('breadCrumbs', [{ text: 'DAO' }, { text: entityName }])
    entity.updatePartial('title', `Edit (${entityName}) DAO`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityName])

  return (
    <Routes>
      <Route  path='/edit/entity/:entityId/metadata' element={<EditMetadata/>} />
      <Route  path='/edit/entity/:entityId/groups' element={<EditGroups/>} />
      <Route  path='/edit/entity/:entityId/property' element={<EditProperty/>} />
      <Route  path='/edit/entity/:entityId/review' element={<ReviewDAO/>} />
      <Route  path={`/edit/entity/:entityId`}>
        <Navigate to={{ pathname: `/edit/entity/${entityId}/metadata`, search }} />
      </Route>
    </Routes>
  )
}

export default EditDAO
