import React, { useContext, useEffect } from 'react'
import { Redirect, Route, useParams } from 'react-router-dom'
import { TDAOMetadataModel } from 'types/protocol'
import { EditEntityContext } from '../EditEntity'
import EditGroups from './EditGroups/EditGroups'
import EditMetadata from './EditMetadata/EditMetadata'
import EditProperty from './EditProperty/EditProperty'
import ReviewDAO from './ReviewDAO/ReviewDAO'

const EditDAO: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string }>()

  const entity = useContext(EditEntityContext)
  const metadata: TDAOMetadataModel = entity.metadata as TDAOMetadataModel
  const entityName = metadata?.name || ''

  useEffect(() => {
    entity.updatePartial('breadCrumbs', [{ text: 'DAO' }, { text: entityName }])
    entity.updatePartial('title', `Edit (${entityName}) DAO`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityName])

  return (
    <>
      <Route exact path='/edit/entity/:entityId/metadata' component={EditMetadata} />
      <Route exact path='/edit/entity/:entityId/groups' component={EditGroups} />
      <Route exact path='/edit/entity/:entityId/property' component={EditProperty} />
      <Route exact path='/edit/entity/:entityId/review' component={ReviewDAO} />
      <Route exact path={`/edit/entity/:entityId`}>
        <Redirect to={`/edit/entity/${entityId}/metadata`} />
      </Route>
    </>
  )
}

export default EditDAO
