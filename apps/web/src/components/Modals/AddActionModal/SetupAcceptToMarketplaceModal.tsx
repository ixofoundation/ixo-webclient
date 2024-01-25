import { FlexBox } from 'components/App/App.styles'
import { Dropdown } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { selectUnverifiedEntities } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { TProposalActionModel } from 'types/entities'
import { validateEntityDid } from 'utils/validation'
import SetupActionModalTemplate from './SetupActionModalTemplate'
import { useParams } from 'react-router-dom'

export interface AcceptToMarketplaceData {
  did: string
  relayerNodeDid: string
  relayerNodeAddress: string
}
const initialState: AcceptToMarketplaceData = {
  did: '',
  relayerNodeDid: '',
  relayerNodeAddress: '',
}

interface Props {
  open: boolean
  action: TProposalActionModel
  onClose: () => void
  onSubmit?: (data: any) => void
}

const SetupAcceptToMarketplaceModal: React.FC<Props> = ({ open, action, onClose, onSubmit }): JSX.Element => {
  const { coreAddress } = useParams<{ coreAddress: string }>()
  const unverifiedEntities = useAppSelector(selectUnverifiedEntities)

  const [formData, setFormData] = useState<AcceptToMarketplaceData>(initialState)
  const validate = useMemo(() => validateEntityDid(formData.did), [formData.did])
  const dropdownOptions = useMemo(
    () => unverifiedEntities.map((entity) => ({ text: entity.profile?.name || '', value: entity.id || '' })),
    [unverifiedEntities],
  )
  const selectedEntity = useMemo(
    () => unverifiedEntities.find((entity) => entity.id === formData.did),
    [unverifiedEntities, formData.did],
  )

  useEffect(() => {
    setFormData(action?.data ?? initialState)
  }, [action])

  useEffect(() => {
    if (selectedEntity) {
      const { relayerNode } = selectedEntity

      setFormData((v) => ({ ...v, relayerNodeAddress: coreAddress || "", relayerNodeDid: relayerNode || "" }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(selectedEntity)])

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
      <FlexBox direction='column' width='100%' gap={2}>
        <Dropdown
          name={'unverified_entities'}
          options={dropdownOptions}
          value={formData.did}
          placeholder='Select Entity'
          onChange={(e) => setFormData((v) => ({ ...v, did: e.target.value }))}
          disabled={!onSubmit}
        />
      </FlexBox>
    </SetupActionModalTemplate>
  )
}

export default SetupAcceptToMarketplaceModal