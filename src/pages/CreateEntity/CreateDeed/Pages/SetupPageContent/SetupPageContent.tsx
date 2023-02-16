import { useCreateEntityState } from 'hooks/createEntity'
import React from 'react'
import { SetupPageContent as SetupPage } from '../../../CreateAsset/Pages/SetupProperties/SetupPageContent'

const SetupPageContent: React.FC = () => {
  const { page, entityType, gotoStep, updatePage } = useCreateEntityState()

  return (
    <SetupPage
      entityType={entityType}
      page={page}
      onChange={(page) => {
        updatePage(page)
        gotoStep(1)
      }}
      onClose={(): void => gotoStep(-1)}
    />
  )
}

export default SetupPageContent
