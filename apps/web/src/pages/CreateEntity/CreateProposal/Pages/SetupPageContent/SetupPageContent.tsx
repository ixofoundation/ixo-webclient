import { useCreateEntityState } from 'hooks/createEntity'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { SetupPageContent as SetupPage } from '../../../Forms/PropertiesForm/SetupPageContent'

const SetupPageContent: React.FC = () => {
  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()
  const history = useHistory()
  const { page, entityType, updatePage } = useCreateEntityState()

  const handleBack = (): void => {
    history.push(`/create/entity/deed/${entityId}/${coreAddress}/info${history.location.search}`)
  }
  const handleNext = (): void => {
    history.push(`/create/entity/deed/${entityId}/${coreAddress}/property${history.location.search}`)
  }

  return (
    <SetupPage
      entityType={entityType}
      page={page}
      onChange={(page: any) => {
        updatePage(page)
        handleNext()
      }}
      onClose={handleBack}
    />
  )
}

export default SetupPageContent
