import { Box, FlexBox } from 'components/App/App.styles'
import { AddLinkedResourceModal, LinkedResourceSetupModal } from 'components/Modals'
import { PropertyBox } from 'pages/CreateEntity/Components'
import React, { useState } from 'react'
import { EntityLinkedResourceConfig } from 'types/protocol'
// import { omitKey } from 'utils/objects'
import { v4 as uuidv4 } from 'uuid'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { LinkedResource } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'

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
  linkedResource: { [id: string]: LinkedResource | undefined }
  updateLinkedResource: (linkedResource: { [id: string]: LinkedResource | undefined }) => void
}

const SetupLinkedResource: React.FC<Props> = ({ hidden, linkedResource, updateLinkedResource }): JSX.Element => {
  const [openAddLinkedResourceModal, setOpenAddLinkedResourceModal] = useState(false)
  const [selectedId, setSelectedId] = useState('')

  const handleAddLinkedResource = (type: string): void => {
    const id = uuidv4()
    updateLinkedResource({ ...linkedResource, [id]: { ...initialLinkedResource, id, type } })
    setSelectedId(id)
  }
  const handleUpdateLinkedResource = (id: string, data: LinkedResource): void => {
    updateLinkedResource({ ...linkedResource, [id]: data })
  }
  const handleRemoveLinkedResource = (id: string): void => {
    updateLinkedResource({ ...linkedResource, [id]: undefined })
    // updateLinkedResource(omitKey({ ...linkedResource }, id))
  }

  return (
    <>
      <FlexBox direction='column' style={hidden ? { display: 'none' } : {}}>
        <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
          {Object.entries(linkedResource)
            .filter(([key, value]) => value)
            .map(([key, value]) => {
              const Icon = EntityLinkedResourceConfig[value?.type || '']?.icon
              const label = EntityLinkedResourceConfig[value?.type || '']?.text || value?.type

              return (
                <PropertyBox
                  key={key}
                  icon={Icon && <Icon />}
                  label={label}
                  set={!!value?.serviceEndpoint}
                  handleRemove={(): void => handleRemoveLinkedResource(key)}
                  handleClick={(): void => setSelectedId(key)}
                />
              )
            })}
          <PropertyBox icon={<PlusIcon />} noData handleClick={(): void => setOpenAddLinkedResourceModal(true)} />
        </Box>
      </FlexBox>
      <AddLinkedResourceModal
        open={openAddLinkedResourceModal}
        onClose={(): void => setOpenAddLinkedResourceModal(false)}
        onAdd={handleAddLinkedResource}
      />

      {selectedId && !!linkedResource[selectedId] && (
        <LinkedResourceSetupModal
          linkedResource={linkedResource[selectedId] as any}
          open={!!selectedId}
          onClose={(): void => setSelectedId('')}
          onChange={(linkedResource: any): void => handleUpdateLinkedResource(selectedId, linkedResource)}
        />
      )}
    </>
  )
}

export default SetupLinkedResource
