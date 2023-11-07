import React, { useContext, useEffect } from 'react'
import { Redirect, Route, useHistory, useParams } from 'react-router-dom'
import { EditEntityContext } from '../EditEntity'
import EditGroups from './EditGroups/EditGroups'
import EditMetadata from './EditMetadata/EditMetadata'
import EditProperty from './EditProperty/EditProperty'
import ReviewDAO from './ReviewDAO/ReviewDAO'

const EditDAO: React.FC = (): JSX.Element => {
  const history = useHistory()
  const { entityId } = useParams<{ entityId: string }>()

  const entity = useContext(EditEntityContext)
  const profile = entity.profile
  const entityName = profile?.name || ''

  useEffect(() => {
    entity.updatePartial('breadCrumbs', [{ text: 'DAO' }, { text: entityName }])
    entity.updatePartial('title', `Edit (${entityName}) DAO`)
  }, [entityName, entity])

  return (
    <>
      <Route exact path='/edit/entity/:entityId/metadata' component={EditMetadata} />
      <Route exact path='/edit/entity/:entityId/groups' component={EditGroups} />
      <Route exact path='/edit/entity/:entityId/property' component={EditProperty} />
      <Route exact path='/edit/entity/:entityId/review' component={ReviewDAO} />
      <Route exact path={`/edit/entity/:entityId`}>
        <Redirect to={{ pathname: `/edit/entity/${entityId}/metadata`, search: history.location.search }} />
      </Route>
    </>
  )
}

export default EditDAO
