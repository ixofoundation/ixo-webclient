import { FlexBox } from 'components/App/App.styles'
import React, { useEffect, useMemo, useState } from 'react'
import { selectUnverifiedEntities } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { TProposalActionModel } from 'types/entities'
import SetupActionModalTemplate from './SetupActionModalTemplate'

export interface AcceptToMarketplaceData {
  did: string
}
const initialState: AcceptToMarketplaceData = {
  did: '',
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupAcceptToMarketplaceModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const unverifiedEntities = useAppSelector(selectUnverifiedEntities)

  const [formData, setFormData] = useState<AcceptToMarketplaceData>(initialState)
  const [validate] = useState(false)
  const dropdownOptions = useMemo(
    () => unverifiedEntities.map((entity) => ({ text: entity.profile?.name, value: entity.id })),
    [unverifiedEntities],
  )

  console.log({ dropdownOptions })

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  const handleConfirm = () => {
    onSubmit && onSubmit({ ...action, data: formData })
    onClose()
  }

  return (
    <SetupActionModalTemplate
      open={open}
      action={action}
      onClose={onClose}
      onSubmit={onSubmit && handleConfirm}
      validate={validate}
    >
      <FlexBox direction='column' width='100%' gap={2}></FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupAcceptToMarketplaceModal
