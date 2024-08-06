import Image from 'next/image'
import { Typography } from 'components/Typography'
import { PropertyBox } from 'screens/CreateEntity/Components'
import React, { useState } from 'react'
import { AddServiceModal } from 'components/Modals'
import { IconPlus } from 'components/IconPaths'
import { Box, Flex, useMantineTheme } from '@mantine/core'

interface Props {
  hidden: boolean
}
const SetupService: React.FC<Props> = ({ hidden }): JSX.Element => {
  const [openAddServiceModal, setOpenAddServiceModal] = useState(false)
  const theme = useMantineTheme()

  const handleAddEntityService = (type: string): void => {
    //
  }

  return (
    <>
      <Flex direction='column' style={hidden ? { display: 'none' } : {}}>
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
          <PropertyBox
            icon={<Image src={IconPlus} alt='Plus' width={5} height={5} color={theme.colors.blue[5]} />}
            noData
            handleClick={(): void => setOpenAddServiceModal(true)}
          />
        </Box>
      </Flex>

      <AddServiceModal
        open={openAddServiceModal}
        onClose={(): void => setOpenAddServiceModal(false)}
        onAdd={handleAddEntityService}
      />
    </>
  )
}

export default SetupService
