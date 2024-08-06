import Image from 'next/image'
import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import { PropertyBox } from 'screens/CreateEntity/Components'
import { deviceWidth } from 'constants/device'
import { DAOGroupConfig } from 'constants/entity'
import { useTransferEntityState } from 'hooks/transferEntity'
import { utils } from '@ixo/impactxclient-sdk'
import TransferEntityModal from 'components/Modals/TransferEntityModal'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/hooks'
import { getEntityById } from 'redux/entities/entities.selectors'
import { IconPlus } from 'components/IconPaths'
import { Box, Flex, useMantineTheme } from '@mantine/core'

const TransferEntityToDAOGroup: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const currentEntity = useAppSelector(getEntityById(entityId))
  const { recipientDid, updateRecipientDid } = useTransferEntityState()
  const [openTransferEntityModal, setOpenTransferEntityModal] = useState(false)
  const theme = useMantineTheme()

  const handleClick = (key: string) => () => {
    if (key === 'other') {
      setOpenTransferEntityModal(true)
    } else {
      updateRecipientDid(utils.did.generateWasmDid(key))
      navigate(`/entity/${entityId}/transfer/to`)
    }
  }

  if (!currentEntity) {
    return <></>
  }

  return (
    <>
      <Flex direction='column' gap={5}>
        <Box w={`${deviceWidth.mobile}px`}>
          <Typography variant='secondary'>Transfer ImpactsDAO to a dao group or another account</Typography>
        </Box>

        <Flex gap={5}>
          {Object.entries(currentEntity.daoGroups ?? {}).map(([key, value]) => {
            const Icon = DAOGroupConfig[value.type]?.icon
            const text = DAOGroupConfig[value.type]?.text
            return (
              <Flex key={key} direction='column' align='center' gap={4}>
                <PropertyBox
                  icon={Icon && <Icon />}
                  label={text}
                  set={!!value.coreAddress}
                  handleClick={handleClick(key)}
                />
                <Typography variant='secondary' $overflowLines={1} style={{ width: 100, textAlign: 'center' }}>
                  &nbsp;{currentEntity.profile?.name || ''}&nbsp;
                </Typography>
                <Typography variant='secondary' $overflowLines={1} style={{ width: 100, textAlign: 'center' }}>
                  &nbsp;{value.config.name} Group&nbsp;
                </Typography>
              </Flex>
            )
          })}
          <Flex direction='column' align='center' gap={4}>
            <PropertyBox
              icon={<Image src={IconPlus} alt='Plus' width={5} height={5} color={theme.colors.blue[5]} />}
              noData
              handleClick={handleClick('other')}
            />
            <Typography variant='secondary' $overflowLines={1} style={{ width: 100, textAlign: 'center' }}>
              Other Account
            </Typography>
          </Flex>
        </Flex>
      </Flex>
      <TransferEntityModal
        open={openTransferEntityModal}
        recipientDid={recipientDid}
        onClose={() => setOpenTransferEntityModal(false)}
        onSubmit={(value) => {
          updateRecipientDid(value)
          setOpenTransferEntityModal(false)
          navigate(`/entity/${entityId}/transfer/to`)
        }}
      />
    </>
  )
}

export default TransferEntityToDAOGroup
