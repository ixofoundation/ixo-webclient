import { Box, FlexBox } from 'components/CoreEntry/App.styles'
import { AddLinkedResourceModal, LinkedResourceSetupModal } from 'components/Modals'
import { PropertyBox } from 'screens/CreateEntity/Components'
import React, { useState } from 'react'
// import { omitKey } from 'utils/objects'
import { v4 as uuidv4 } from 'uuid'

import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import { omitKey } from 'utils/objects'
import { EntityLinkedResourceConfig } from 'constants/entity'
import ProposalActionModal from 'components/Modals/ProposalActionModal/ProposalActionModal'

const initialLinkedResource = {
  id: '',
  type: '',
  description: '',
  mediaType: '',
  serviceEndpoint: '',
  proof: '',
  encrypted: 'false',
  right: '',
}

interface Props {
  hidden: boolean
  linkedResource: { [id: string]: LinkedResource }
  updateLinkedResource: (linkedResource: { [id: string]: LinkedResource }) => void
}

const SetupLinkedResource: React.FC<Props> = ({ hidden, linkedResource, updateLinkedResource }): JSX.Element => {
  const [openAddLinkedResourceModal, setOpenAddLinkedResourceModal] = useState(false)
  const [selectedId, setSelectedId] = useState('')

  const handleAddLinkedResource = (type: string): void => {
    if (
      type === 'proposalAction' &&
      Object.values(linkedResource)
        .map((v) => v.type)
        .find((v) => v === 'proposalAction')
    ) {
      return
    }
    const id = uuidv4()
    updateLinkedResource({ ...linkedResource, [id]: { ...initialLinkedResource, id, type } })
    setSelectedId(id)
  }
  const handleUpdateLinkedResource = (id: string, data: LinkedResource): void => {
    updateLinkedResource({ ...linkedResource, [id]: data })
  }
  const handleRemoveLinkedResource = (id: string): void => {
    updateLinkedResource(omitKey({ ...linkedResource }, id))
  }

  return (
    <>
      <FlexBox $direction='column' style={hidden ? { display: 'none' } : {}}>
        <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
          {Object.entries(linkedResource)
            .filter(([key, value]) => value)
            .map(([key, value]) => {
              const Icon = EntityLinkedResourceConfig[value?.type || '']?.icon
              const label = EntityLinkedResourceConfig[value?.type || '']?.text || value?.type

              return (
                <PropertyBox
                  key={key}
                  icon={Icon && <img src={Icon} alt='replaced' />}
                  label={label}
                  set={!!value?.serviceEndpoint}
                  handleRemove={(): void => handleRemoveLinkedResource(key)}
                  handleClick={(): void => setSelectedId(key)}
                />
              )
            })}
          <PropertyBox
            icon={<img src='/assets/images/icon-plus.svg' />}
            noData
            handleClick={(): void => setOpenAddLinkedResourceModal(true)}
          />
        </Box>
      </FlexBox>
      <AddLinkedResourceModal
        open={openAddLinkedResourceModal}
        onClose={(): void => setOpenAddLinkedResourceModal(false)}
        onAdd={handleAddLinkedResource}
      />

      {selectedId && !!linkedResource[selectedId] && linkedResource[selectedId].type !== 'proposalAction' && (
        <LinkedResourceSetupModal
          linkedResource={linkedResource[selectedId] as any}
          open={!!selectedId}
          onClose={(): void => setSelectedId('')}
          onChange={(linkedResource: LinkedResource): void => handleUpdateLinkedResource(selectedId, linkedResource)}
        />
      )}
      {selectedId &&
        !!linkedResource[selectedId] &&
        !linkedResource[selectedId].serviceEndpoint &&
        linkedResource[selectedId].type === 'proposalAction' && (
          <ProposalActionModal
            linkedResource={linkedResource[selectedId] as any}
            open={!!selectedId}
            onClose={(): void => setSelectedId('')}
            onChange={(linkedResource: LinkedResource): void => handleUpdateLinkedResource(selectedId, linkedResource)}
          />
        )}
    </>
  )
}

export default SetupLinkedResource