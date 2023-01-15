import { Box } from 'components/App/App.styles'
import { AddLinkedResourceModal, LinkedResourceSetupModal } from 'components/Modals'
import { Typography } from 'components/Typography'
import { useCreateEntityState } from 'hooks/createEntity'
import { PropertyBox } from 'pages/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import { EntityLinkedResourceConfig, TEntityLinkedResourceModel } from 'types/protocol'
import { omitKey } from 'utils/objects'
import { v4 as uuidv4 } from 'uuid'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'

const SetupLinkedResource: React.FC = (): JSX.Element => {
  const { linkedResource, updateLinkedResource } = useCreateEntityState()
  const [entityLinkedResource, setEntityLinkedResource] = useState<{
    [key: string]: any
  }>({})
  const [openAddLinkedResourceModal, setOpenAddLinkedResourceModal] = useState(false)

  // popups - linked resources modal
  const handleOpenEntityLinkedResourceModal = (key: string, open: boolean): void => {
    setEntityLinkedResource((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        openModal: open,
      },
    }))
  }

  // entity linked resources
  const handleAddEntityLinkedResource = (type: string): void => {
    const id = uuidv4()
    setEntityLinkedResource((pre) => ({
      ...pre,
      [id]: { id, type, ...EntityLinkedResourceConfig[type], openModal: true },
    }))
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
                label={value?.name ?? value?.text}
                set={!!value?.name}
                handleRemove={(): void => handleRemoveEntityLinkedResource(key)}
                handleClick={(): void => handleOpenEntityLinkedResourceModal(key, true)}
              />
            )
          })}
          <PropertyBox icon={<PlusIcon />} handleClick={(): void => setOpenAddLinkedResourceModal(true)} />
        </Box>
      </Box>
      <AddLinkedResourceModal
        open={openAddLinkedResourceModal}
        onClose={(): void => setOpenAddLinkedResourceModal(false)}
        handleChange={handleAddEntityLinkedResource}
      />
      {Object.entries(entityLinkedResource)
        .filter(([, value]) => !value.required)
        .map(([key, value]) => (
          <LinkedResourceSetupModal
            key={key}
            linkedResource={value}
            open={!!value?.openModal}
            onClose={(): void => handleOpenEntityLinkedResourceModal(key, false)}
            handleChange={(linkedResource: any): void => handleUpdateEntityLinkedResource(key, linkedResource)}
          />
        ))}
    </>
  )
}

export default SetupLinkedResource
