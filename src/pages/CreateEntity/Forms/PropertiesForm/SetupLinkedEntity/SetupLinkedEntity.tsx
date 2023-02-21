import { Box } from 'components/App/App.styles'
import { AddLinkedEntityModal, LiquiditySetupModal } from 'components/Modals'
import { Typography } from 'components/Typography'
import { useCreateEntityState } from 'hooks/createEntity'
import { PropertyBox } from 'pages/CreateEntity/Components'
import React, { useEffect, useState } from 'react'
import { EntityLinkedEntityConfig, TEntityLiquidityModel } from 'types/protocol'
import { omitKey } from 'utils/objects'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'

const SetupLinkedEntity: React.FC = (): JSX.Element => {
  const { linkedEntity, updateLinkedEntity } = useCreateEntityState()
  const [entityLinkedEntity, setEntityLinkedEntity] = useState<{ [key: string]: any }>({})
  const [openAddLinkedEntityModal, setOpenAddLinkedEntityModal] = useState(false)

  // popups - linked entities modal
  const handleOpenEntityLinkedEntityModal = (key: string, open: boolean): void => {
    setEntityLinkedEntity((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        openModal: open,
      },
    }))
  }

  // entity linked entities
  const handleAddEntityLinkedEntity = (key: string): void => {
    setEntityLinkedEntity((pre) => ({
      ...pre,
      [key]: { ...EntityLinkedEntityConfig[key] },
    }))
  }
  const handleUpdateEntityLinkedEntity = (key: string, data: any): void => {
    setEntityLinkedEntity((pre) => ({
      ...pre,
      [key]: { ...pre[key], data },
    }))
  }
  const handleRemoveEntityLinkedEntity = (id: string): void => {
    setEntityLinkedEntity((pre) => omitKey(pre, id))
  }

  // hooks - linkedEntity
  useEffect(() => {
    if (Object.values(linkedEntity).length > 0) {
      setEntityLinkedEntity(linkedEntity)
    }
  }, [linkedEntity])
  useEffect(() => {
    updateLinkedEntity(entityLinkedEntity ?? {})
    // eslint-disable-next-line
  }, [entityLinkedEntity])

  return (
    <>
      <Box className='d-flex flex-column'>
        <Typography className='mb-3' variant='secondary' size='2xl'>
          Linked Entities
        </Typography>
        <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
          {Object.entries(linkedEntity).map(([key, value]) => {
            const Icon = EntityLinkedEntityConfig[key]?.icon
            const label = EntityLinkedEntityConfig[key]?.text
            return (
              <PropertyBox
                key={key}
                icon={Icon && <Icon />}
                label={label}
                set={!!(value as any)?.data}
                handleRemove={(): void => handleRemoveEntityLinkedEntity(key)}
                handleClick={(): void => handleOpenEntityLinkedEntityModal(key, true)}
              />
            )
          })}
          <PropertyBox icon={<PlusIcon />} noData handleClick={(): void => setOpenAddLinkedEntityModal(true)} />
        </Box>
      </Box>
      <AddLinkedEntityModal
        open={openAddLinkedEntityModal}
        onClose={(): void => setOpenAddLinkedEntityModal(false)}
        handleChange={handleAddEntityLinkedEntity}
      />
      <LiquiditySetupModal
        liquidity={entityLinkedEntity?.liquidity?.data}
        open={entityLinkedEntity?.liquidity?.openModal}
        onClose={(): void => handleOpenEntityLinkedEntityModal('liquidity', false)}
        handleChange={(liquidity: TEntityLiquidityModel[]): void =>
          handleUpdateEntityLinkedEntity('liquidity', liquidity)
        }
      />
    </>
  )
}

export default SetupLinkedEntity
