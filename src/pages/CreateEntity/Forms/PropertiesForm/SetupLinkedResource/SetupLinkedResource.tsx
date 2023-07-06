import { Box, FlexBox } from 'components/App/App.styles'
import { AddLinkedResourceModal, LinkedResourceSetupModal } from 'components/Modals'
import { Typography } from 'components/Typography'
import { PropertyBox } from 'pages/CreateEntity/Components'
import React, { useState } from 'react'
import { EntityLinkedResourceConfig, TEntityLinkedResourceModel } from 'types/protocol'
import { omitKey } from 'utils/objects'
import { v4 as uuidv4 } from 'uuid'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'

const initialLinkedResource = {
  id: '',
  type: '',
  description: '',
  mediaType: '',
  serviceEndpoint: '',
  proof: '',
  encrypted: '',
  right: '',
}

interface Props {
  hidden: boolean
  linkedResource: { [id: string]: TEntityLinkedResourceModel }
  updateLinkedResource: (linkedResource: { [id: string]: TEntityLinkedResourceModel }) => void
}

const SetupLinkedResource: React.FC<Props> = ({ hidden, linkedResource, updateLinkedResource }): JSX.Element => {
  const [openAddLinkedResourceModal, setOpenAddLinkedResourceModal] = useState(false)
  const [selectedId, setSelectedId] = useState('')

  const handleAddLinkedResource = (type: string): void => {
    const id = uuidv4()
    updateLinkedResource({ ...linkedResource, [id]: { ...initialLinkedResource, id, type } })
    setSelectedId(id)
  }
  const handleUpdateLinkedResource = (id: string, data: TEntityLinkedResourceModel): void => {
    updateLinkedResource({ ...linkedResource, [id]: data })
  }
  const handleRemoveLinkedResource = (id: string): void => {
    updateLinkedResource(omitKey({ ...linkedResource }, id))
  }

  return (
    <>
      <FlexBox direction='column' style={hidden ? { display: 'none' } : {}}>
        <Typography className='mb-3' variant='secondary' size='2xl'>
          Linked Resources
        </Typography>
        <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
          {Object.entries(linkedResource).map(([key, value]) => {
            const Icon = EntityLinkedResourceConfig[value.type]?.icon
            const label = EntityLinkedResourceConfig[value.type]?.text || value.type

            return (
              <PropertyBox
                key={key}
                icon={Icon && <Icon />}
                label={label}
                set={!!value.serviceEndpoint}
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

      {selectedId && (
        <LinkedResourceSetupModal
          linkedResource={linkedResource[selectedId]}
          open={!!selectedId}
          onClose={(): void => setSelectedId('')}
          onChange={(linkedResource: any): void => handleUpdateLinkedResource(selectedId, linkedResource)}
        />
      )}
    </>
  )
}

export default SetupLinkedResource
