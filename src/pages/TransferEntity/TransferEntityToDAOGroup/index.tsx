import { Box, FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useState } from 'react'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { PropertyBox } from 'pages/CreateEntity/Components'
import { deviceWidth } from 'constants/device'
import { DAOGroupConfig } from 'constants/entity'
import { useTransferEntityState } from 'hooks/transferEntity'
import { utils } from '@ixo/impactxclient-sdk'
import TransferEntityModal from 'components/Modals/TransferEntityModal'
import { useHistory, useParams } from 'react-router-dom'

const TransferEntityToDAOGroup: React.FC = (): JSX.Element => {
  const history = useHistory()
  const { entityId } = useParams<{ entityId: string }>()
  const { selectedEntity, recipientDid, updateRecipientDid } = useTransferEntityState()
  const [openTransferEntityModal, setOpenTransferEntityModal] = useState(false)

  const handleClick = (key: string) => () => {
    if (key === 'other') {
      setOpenTransferEntityModal(true)
    } else {
      updateRecipientDid(utils.did.generateWasmDid(key))
      history.push(`/transfer/entity/${entityId}/to`)
    }
  }

  if (!selectedEntity) {
    return <></>
  }

  return (
    <>
      <FlexBox direction='column' gap={5}>
        <Box width={`${deviceWidth.mobile}px`}>
          <Typography variant='secondary'>Transfer ImpactsDAO to a dao group or another account</Typography>
        </Box>

        <FlexBox gap={5}>
          {Object.entries(selectedEntity.daoGroups ?? {}).map(([key, value]) => {
            const Icon = DAOGroupConfig[value.type]?.icon
            const text = DAOGroupConfig[value.type]?.text
            return (
              <FlexBox key={key} direction='column' alignItems='center' gap={4}>
                <PropertyBox
                  icon={Icon && <Icon />}
                  label={text}
                  set={!!value.coreAddress}
                  handleClick={handleClick(key)}
                />
                <Typography variant='secondary' overflowLines={1} style={{ width: 100, textAlign: 'center' }}>
                  &nbsp;{selectedEntity.profile?.name || ''}&nbsp;
                </Typography>
                <Typography variant='secondary' overflowLines={1} style={{ width: 100, textAlign: 'center' }}>
                  &nbsp;{value.config.name} Group&nbsp;
                </Typography>
              </FlexBox>
            )
          })}
          <FlexBox direction='column' alignItems='center' gap={4}>
            <PropertyBox icon={<PlusIcon />} noData handleClick={handleClick('other')} />
            <Typography variant='secondary' overflowLines={1} style={{ width: 100, textAlign: 'center' }}>
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
          history.push(`/transfer/entity/${entityId}/to`)
        }}
      />
    </>
  )
}

export default TransferEntityToDAOGroup
