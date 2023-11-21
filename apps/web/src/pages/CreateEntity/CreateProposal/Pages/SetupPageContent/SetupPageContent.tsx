import { useCreateEntityState } from 'hooks/createEntity'
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { SetupPageContent as SetupPage } from '../../../Forms/PropertiesForm/SetupPageContent'

const SetupPageContent: React.FC = () => {
  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()
  const navigate = useNavigate()
  const { search } = useLocation()
  const { page, entityType, updatePage } = useCreateEntityState()

  const handleBack = (): void => {
    navigate(`/create/entity/deed/${entityId}/${coreAddress}/info${search}`)
  }
  const handleNext = (): void => {
    navigate(`/create/entity/deed/${entityId}/${coreAddress}/property${search}`)
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
