import React, { useEffect } from 'react'
import {  Navigate, Route, matchPath } from 'react-router-dom'
import { useCreateEntityState } from 'hooks/createEntity'
import { ReviewClaim, SelectCreationProcess, SetupDataCollection, SetupMetadata, SetupProperties } from './Pages'

const CreateClaim = (): JSX.Element => {
  const { entityType, updateEntityType, updateTitle, updateSubtitle, updateBreadCrumbs } = useCreateEntityState()
  const isSelectProcessRoute = matchPath({ path: `/create/entity/${entityType}/process`, end: true }, `/create/entity/${entityType}/process`)
  const isSetupMetadataRoute = matchPath({ path: `/create/entity/${entityType}/profile`, end: true }, `/create/entity/${entityType}/profile`)
  const isSetupDataCollectionRoute = matchPath({path: `/create/entity/${entityType}/collection`, end: true}, `/create/entity/${entityType}/collection`)
  const isSetupPropertiesRoute = matchPath({path: `/create/entity/${entityType}/collection`, end: true}, `/create/entity/${entityType}/property`)

  useEffect(() => {
    updateEntityType('protocol/claim')
    updateTitle('Verifiable Claim creation')
    updateBreadCrumbs([{ text: 'Protocol' }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSelectProcessRoute) {
      updateSubtitle('New or Clone')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelectProcessRoute])
  useEffect(() => {
    if (isSetupMetadataRoute) {
      updateSubtitle('Profile')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupMetadataRoute])
  useEffect(() => {
    if (isSetupDataCollectionRoute) {
      updateSubtitle('Data Collection Form')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupDataCollectionRoute])
  useEffect(() => {
    if (isSetupPropertiesRoute) {
      updateSubtitle('Configuration')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSetupPropertiesRoute])

  return (
    <>
      <Route path={`/process`} element={<SelectCreationProcess/>} />
      <Route path={`/profile`} element={<SetupMetadata/>} />
      <Route path={`/collection`} element={<SetupDataCollection/>} />
      <Route path={`/property`} element={<SetupProperties/>} />
      <Route path={`/review`} element={<ReviewClaim/>} />

      <Route path={`/`}>
        <Navigate to={`/process`} />
      </Route>
    </>
  )
}

export default CreateClaim
