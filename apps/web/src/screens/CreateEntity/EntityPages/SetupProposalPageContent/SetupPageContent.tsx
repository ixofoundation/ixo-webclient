import { useCreateEntityState } from 'hooks/createEntity'
import { SetupPageContent } from 'screens/CreateEntity/Forms/PropertiesForm/SetupPageContent'
import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const SetupProposalPageContent: React.FC = () => {
  const { entityId, coreAddress } = useParams<{ entityId: string; coreAddress: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { page, entityType, updatePage } = useCreateEntityState()

  const handleBack = (): void => {
    navigate(`/create/entity/deed/${entityId}/${coreAddress}/info${location.search}`)
  }
  const handleNext = (): void => {
    navigate(`/create/entity/deed/${entityId}/${coreAddress}/property${location.search}`)
  }

  return (
    <SetupPageContent
      entityType={entityType}
      page={page as any}
      onChange={(page: any) => {
        updatePage(page)
        handleNext()
      }}
      onClose={handleBack}
    />
  )
}

export default SetupProposalPageContent
