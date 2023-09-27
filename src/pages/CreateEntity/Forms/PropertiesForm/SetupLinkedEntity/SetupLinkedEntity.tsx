import { Box, FlexBox } from 'components/App/App.styles'
import { AddLinkedEntityModal } from 'components/Modals'
import { Typography } from 'components/Typography'
import { PropertyBox } from 'pages/CreateEntity/Components'
import { Props as PropertyBoxProps } from 'pages/CreateEntity/Components/PropertyBox'
import React, { useEffect, useMemo, useState } from 'react'
import { TDAOGroupModel } from 'types/entities'
import { omitKey } from 'utils/objects'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { toTitleCase, truncateString } from 'utils/formatters'
import { LinkedEntity } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import ImpactEntitySetupModal from 'components/Modals/ImpactEntitySetupModal/ImpactEntitySetupModal'
import LinkedAccountSetupModal from 'components/Modals/LinkedAccountSetupModal/LinkedAccountSetupModal'
import DelegateAccountSetupModal from 'components/Modals/DelegateAccountSetupModal/DelegateAccountSetupModal'
import { errorToast } from 'utils/toast'
import { DAOGroupConfig, EntityLinkedEntityConfig } from 'constants/entity'

const LinkedEntityPropertyBox = (props: PropertyBoxProps & { id: string; type: string }) => {
  const [name, setName] = useState('')

  useEffect(() => {
    if (props.id) {
      if (props.type === 'ImpactEntity') {
        setName(truncateString(props.id, 13))
      } else if (props.type === 'BlockchainAccount') {
        setName(truncateString(props.id, 13))
      } else if (props.type === 'IndividualAccount') {
        setName(truncateString(props.id, 13))
      }
    }
  }, [props])

  return (
    <FlexBox direction='column' alignItems='center' gap={4}>
      <PropertyBox icon={props.icon} label={props.label} set={true} handleRemove={props.handleRemove} />
      <Typography variant='secondary' overflowLines={1} style={{ width: 100, textAlign: 'center' }}>
        {name}
      </Typography>
    </FlexBox>
  )
}

interface Props {
  hidden: boolean
  linkedEntity: { [key: string]: LinkedEntity }
  daoGroups: { [id: string]: TDAOGroupModel }
  updateLinkedEntity: (linkedEntity: { [id: string]: LinkedEntity }) => void
}

const SetupLinkedEntity: React.FC<Props> = ({ hidden, linkedEntity, daoGroups, updateLinkedEntity }): JSX.Element => {
  const [openAddLinkedEntityModal, setOpenAddLinkedEntityModal] = useState(false)
  const [openImpactEntitySetupModal, setOpenImpactEntitySetupModal] = useState(false)
  const [openLinkedAccountSetupModal, setOpenLinkedAccountSetupModal] = useState(false)
  const [openDelegateAccountSetupModal, setOpenDelegateAccountSetupModal] = useState(false)
  const hasDelegateAccount = useMemo(
    () => Object.values(linkedEntity).some(({ relationship }) => relationship === 'delegate'),
    [linkedEntity],
  )

  const handleOpenModal = (key: string): void => {
    switch (key) {
      case 'BlockchainAccount':
        setOpenLinkedAccountSetupModal(true)
        break
      case 'ImpactEntity':
        setOpenImpactEntitySetupModal(true)
        break
      case 'IndividualAccount': {
        if (hasDelegateAccount) {
          errorToast('Not Allowed', 'Already linked a delegate account')
        } else {
          setOpenDelegateAccountSetupModal(true)
        }
        break
      }
      default:
        break
    }
  }

  // entity linked entities
  const handleAddLinkedEntity = (newData: LinkedEntity): void => {
    updateLinkedEntity({ ...linkedEntity, [newData.id]: newData })
  }
  const handleRemoveLinkedEntity = (id: string): void => {
    console.log('handleRemoveLinkedEntity', id)
    updateLinkedEntity(omitKey({ ...linkedEntity }, id))
  }

  return (
    <>
      <FlexBox direction='column' style={hidden ? { display: 'none' } : {}}>
        <Box className='d-flex flex-wrap' style={{ gap: 20 }}>
          {Object.entries(linkedEntity)
            .map(([key, value]) => {
              const { type } = value

              if (type === 'Group') {
                /**
                 * @description case of dao group (smartContract)
                 */
                const label = Object.values(daoGroups).find(({ coreAddress }) => coreAddress === key)?.type || ''
                const name = Object.values(daoGroups).find(({ coreAddress }) => coreAddress === key)?.config.name || ''
                const Icon = DAOGroupConfig[label]?.icon

                if (!DAOGroupConfig[label]) {
                  return null
                }
                return (
                  <FlexBox key={key} direction='column' alignItems='center' gap={4}>
                    <PropertyBox icon={Icon && <Icon />} label={toTitleCase(label)} set={true} />
                    <Typography variant='secondary' overflowLines={1} style={{ width: 100, textAlign: 'center' }}>
                      {name}
                    </Typography>
                  </FlexBox>
                )
              } else {
                const Icon = EntityLinkedEntityConfig[type]?.icon
                const label = EntityLinkedEntityConfig[type]?.text || type

                return (
                  <LinkedEntityPropertyBox
                    key={key}
                    id={key}
                    icon={Icon && <Icon />}
                    label={label}
                    type={type}
                    handleRemove={() => handleRemoveLinkedEntity(key)}
                  />
                )
              }
            })
            .filter((v) => !!v)}
          <PropertyBox icon={<PlusIcon />} noData handleClick={(): void => setOpenAddLinkedEntityModal(true)} />
        </Box>
      </FlexBox>
      <AddLinkedEntityModal
        open={openAddLinkedEntityModal}
        onClose={(): void => setOpenAddLinkedEntityModal(false)}
        onAdd={handleOpenModal}
      />
      <ImpactEntitySetupModal
        open={openImpactEntitySetupModal}
        onClose={(): void => setOpenImpactEntitySetupModal(false)}
        onAdd={handleAddLinkedEntity}
      />
      <LinkedAccountSetupModal
        open={openLinkedAccountSetupModal}
        onClose={(): void => setOpenLinkedAccountSetupModal(false)}
        onAdd={handleAddLinkedEntity}
      />
      <DelegateAccountSetupModal
        open={openDelegateAccountSetupModal}
        onClose={(): void => setOpenDelegateAccountSetupModal(false)}
        onAdd={handleAddLinkedEntity}
      />
      {/* <LiquiditySetupModal
        liquidity={entityLinkedEntity?.liquidity?.data}
        open={entityLinkedEntity?.liquidity?.openModal}
        onClose={(): void => handleOpenEntityLinkedEntityModal('liquidity', false)}
        handleChange={(liquidity: TEntityLiquidityModel[]): void =>
          handleUpdateLinkedEntity('liquidity', liquidity)
        }
      /> */}
    </>
  )
}

export default SetupLinkedEntity
