import { Box, FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import { PropertyBox } from 'screens/CreateEntity/Components'
import React, { useState } from 'react'

import PlusIcon from 'assets/images/icon-plus.svg'
import { AddServiceModal } from 'components/Modals'

interface Props {
  hidden: boolean
}
const SetupService: React.FC<Props> = ({ hidden }): JSX.Element => {
  const [openAddServiceModal, setOpenAddServiceModal] = useState(false)

  const handleAddEntityService = (type: string): void => {
    //
  }

  return (
    <>
      <FlexBox $direction='column' style={hidden ? { display: 'none' } : {}}>
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
          <PropertyBox icon={<PlusIcon />} noData handleClick={(): void => setOpenAddServiceModal(true)} />
        </Box>
      </FlexBox>

      <AddServiceModal
        open={openAddServiceModal}
        onClose={(): void => setOpenAddServiceModal(false)}
        onAdd={handleAddEntityService}
      />
    </>
  )
}

export default SetupService
