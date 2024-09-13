import { Box, FlexBox } from 'components/CoreEntry/App.styles'
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

const TransferEntityToDAOGroup: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const { entityId = '' } = useParams<{ entityId: string }>()
  const currentEntity = useAppSelector(getEntityById(entityId))
  const { recipientDid, updateRecipientDid } = useTransferEntityState()
  const [openTransferEntityModal, setOpenTransferEntityModal] = useState(false)

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
      <FlexBox $direction='column' $gap={5}>
        <Box width={`${deviceWidth.mobile}px`}>
          <Typography variant='secondary'>Transfer ImpactsDAO to a dao group or another account</Typography>
        </Box>

        <FlexBox $gap={5}>
          {Object.entries(currentEntity.daoGroups ?? {}).map(([key, value]) => {
            const Icon = DAOGroupConfig[value.type]?.icon
            const text = DAOGroupConfig[value.type]?.text
            return (
              <FlexBox key={key} $direction='column' $alignItems='center' $gap={4}>
                <PropertyBox
                  icon={Icon && <img src={Icon} alt='replaced' />}
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
              </FlexBox>
            )
          })}
          <FlexBox $direction='column' $alignItems='center' $gap={4}>
            <PropertyBox icon={<img src='/assets/images/icon-plus.svg' />} noData handleClick={handleClick('other')} />
            <Typography variant='secondary' $overflowLines={1} style={{ width: 100, textAlign: 'center' }}>
              Other Account
            </Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
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
