import { FlexBox } from 'components/App/App.styles'
import useCurrentEntity from 'hooks/currentEntity'
import { Dropdown } from 'pages/CreateEntity/Components'
import React, { useEffect, useMemo, useState } from 'react'
import { selectUnverifiedEntities } from 'redux/entitiesExplorer/entitiesExplorer.selectors'
import { useAppSelector } from 'redux/hooks'
import { TProposalActionModel } from 'types/entities'
import { validateEntityDid } from 'utils/validation'
import SetupActionModalTemplate from './SetupActionModalTemplate'

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
  const unverifiedEntities = useAppSelector(selectUnverifiedEntities)
  const { owner, controller } = useCurrentEntity()

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

      const isOwner = controller.find((v) => v.startsWith('did:x:'))
      const isGroup = controller.find((v) => v.startsWith('did:ixo:wasm:'))
      if (isOwner) {
        setFormData((v) => ({ ...v, relayerNodeAddress: owner, relayerNodeDid: relayerNode }))
      } else if (isGroup) {
        setFormData((v) => ({
          ...v,
          relayerNodeAddress: isGroup.replace('did:ixo:wasm:', ''),
          relayerNodeDid: relayerNode,
        }))
      }
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
