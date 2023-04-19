import { Box } from 'components/App/App.styles'
import { AddLinkedResourceModal, LinkedResourceSetupModal } from 'components/Modals'
import { Typography } from 'components/Typography'
import { PropertyBox } from 'pages/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import { EntityLinkedResourceConfig, TEntityLinkedResourceModel } from 'types/protocol'
import { omitKey } from 'utils/objects'
import { v4 as uuidv4 } from 'uuid'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'

interface Props {
  linkedResource: { [id: string]: TEntityLinkedResourceModel }
  updateLinkedResource: (linkedResource: { [id: string]: TEntityLinkedResourceModel }) => void
}

const SetupLinkedResource: React.FC<Props> = ({ linkedResource, updateLinkedResource }): JSX.Element => {
  const [entityLinkedResource, setEntityLinkedResource] = useState<{
    [key: string]: any
  }>({})
  const [openAddLinkedResourceModal, setOpenAddLinkedResourceModal] = useState(false)
  const [selected, setSelected] = useState('')

  // entity linked resources
  const handleAddEntityLinkedResource = (type: string): void => {
    const id = uuidv4()
    setEntityLinkedResource((pre) => ({
      ...pre,
      [id]: { id, type, path: '', name: '', description: '' },
    }))
    setSelected(id)
  }
  const handleUpdateEntityLinkedResource = (id: string, data: TEntityLinkedResourceModel): void => {
    setEntityLinkedResource((pre) => ({ ...pre, [id]: data }))
  }
  const handleRemoveEntityLinkedResource = (id: string): void => {
    setEntityLinkedResource((pre) => omitKey(pre, id))
  }

  // hooks - linkedResource
  useEffect(() => {
    if (Object.values(linkedResource).length > 0) {
      setEntityLinkedResource(linkedResource)
    }
  }, [linkedResource])
  useEffect(() => {
    updateLinkedResource(entityLinkedResource ?? {})
    // eslint-disable-next-line
  }, [entityLinkedResource])

  return (
    <>
      <Box className='d-flex flex-column'>
        <Typography className='mb-3' variant='secondary' size='2xl'>
          Linked Resources
        </Typography>
        <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
          {Object.entries(entityLinkedResource).map(([key, value]) => {
            const Icon = EntityLinkedResourceConfig[value.type]?.icon
            return (
              <PropertyBox
                key={key}
                icon={Icon && <Icon />}
                label={value.name ?? value.text}
                set={value.name}
                handleRemove={(): void => handleRemoveEntityLinkedResource(key)}
                handleClick={(): void => setSelected(key)}
              />
            )
          })}
          <PropertyBox icon={<PlusIcon />} noData handleClick={(): void => setOpenAddLinkedResourceModal(true)} />
        </Box>
      </Box>
      <AddLinkedResourceModal
        open={openAddLinkedResourceModal}
        onClose={(): void => setOpenAddLinkedResourceModal(false)}
        onChange={handleAddEntityLinkedResource}
      />
      {/* {Object.entries(entityLinkedResource)
        .filter(([, value]) => !value.required)
        .map(([key, value]) => (
          <LinkedResourceSetupModal
            key={key}
            linkedResource={value}
            open={!!value?.openModal}
            onClose={(): void => setSelected('')}
            onChange={(linkedResource: any): void => handleUpdateEntityLinkedResource(key, linkedResource)}
          />
        ))} */}

      {!!entityLinkedResource[selected] && (
        <LinkedResourceSetupModal
          linkedResource={entityLinkedResource[selected]}
          open={!!entityLinkedResource[selected]}
          onClose={(): void => setSelected('')}
          onChange={(linkedResource: any): void => handleUpdateEntityLinkedResource(selected, linkedResource)}
        />
      )}
    </>
  )
}

export default SetupLinkedResource
