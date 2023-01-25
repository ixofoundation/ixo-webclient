import { Box } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { PropertyBox } from 'pages/CreateEntity/Components'
import React, { useState } from 'react'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { AddServiceModal } from 'components/Modals'

const SetupService: React.FC = (): JSX.Element => {
  const [openAddServiceModal, setOpenAddServiceModal] = useState(false)

  const handleAddEntityService = (type: string): void => {
    //
  }

  return (
    <>
      <Box className='d-flex flex-column'>
        <Typography className='mb-3' variant='secondary' size='2xl'>
          Add a Service
        </Typography>
        <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
          {/* {Object.entries(entityLinkedResource).map(([key, value]) => {
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
          })} */}
          <PropertyBox icon={<PlusIcon />} handleClick={(): void => setOpenAddServiceModal(true)} />
        </Box>
      </Box>

      <AddServiceModal
        open={openAddServiceModal}
        onClose={(): void => setOpenAddServiceModal(false)}
        onAdd={handleAddEntityService}
      />
    </>
  )
}

export default SetupService
