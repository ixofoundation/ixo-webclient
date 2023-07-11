import { Box, FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useContext, useMemo, useState } from 'react'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { Button, CheckBox, PropertyBox } from 'pages/CreateEntity/Components'
import { AddDAOGroupModal } from 'components/Modals'
import { v4 as uuidv4 } from 'uuid'
import { DAOGroupConfig, TDAOGroupModel } from 'types/protocol'
import { omitKey } from 'utils/objects'
// import SetupGroupSettings, { initialMembership, initialStaking } from './SetupGroupSettings'
import { deviceWidth } from 'constants/device'
import { ixo } from '@ixo/impactxclient-sdk'
import SetupGroupSettings from 'pages/CreateEntity/CreateDAO/Pages/SetupDAOGroups/SetupGroupSettings'
import { EditEntityContext } from 'pages/EditEntity/EditEntity'
import { useHistory, useParams } from 'react-router-dom'
import { LinkedEntity } from '@ixo/impactxclient-sdk/types/codegen/ixo/iid/v1beta1/types'
import {
  initialMembershipGroup,
  initialStakingGroup,
} from 'pages/CreateEntity/CreateDAO/Pages/SetupDAOGroups/SetupDAOGroups'

const EditGroups: React.FC = (): JSX.Element => {
  const history = useHistory()
  const { entityId } = useParams<{ entityId: string }>()
  const entity = useContext(EditEntityContext)

  const [openAddGroupModal, setOpenAddGroupModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('')
  const canSubmit = useMemo(() => Object.values(entity.daoGroups ?? {}).length > 0, [entity.daoGroups])

  const handleAddGroup = (type: string): void => {
    const id = uuidv4()
    if (type === 'membership' || type === 'multisig') {
      entity.updatePartial(
        'daoGroups',
        {
          [id]: initialMembershipGroup,
        },
        true,
      )
    } else if (type === 'staking') {
      entity.updatePartial(
        'daoGroups',
        {
          [id]: initialStakingGroup,
        },
        true,
      )
    }

    // Set first group to DAO controller as default when it's added
    if (Object.values(entity.daoGroups ?? {}).length === 0) {
      entity.updatePartial('daoController', id)
    }
  }
  const handleUpdateGroup = (data: TDAOGroupModel): void => {
    entity.updatePartial(
      'daoGroups',
      {
        [data.coreAddress]: data,
      },
      true,
    )
    setSelectedGroup('')
  }
  const handleRemoveGroup = (id: string): void => {
    const newDaoGroups = omitKey(entity.daoGroups ?? {}, id)
    entity.updatePartial('daoGroups', newDaoGroups)

    const newLinkedEntity = omitKey(entity.linkedEntity, id)
    entity.updatePartial('linkedEntity', newLinkedEntity)

    // Change DAO controller if removed one was a controller
    if (entity.daoController === id) {
      entity.updatePartial('daoController', Object.keys(newDaoGroups).pop() ?? '')
    }
  }
  const handleCloneGroup = (address: string): void => {
    // TODO: fetch DAO group from somewhere with given address
  }

  const handleContinue = (): void => {
    let tempLinkedEntity = {}
    Object.values(entity.daoGroups ?? {}).forEach((daoGroup: any) => {
      if ('contractAddress' in daoGroup && daoGroup.contractAddress) {
        tempLinkedEntity = {
          ...tempLinkedEntity,
          [daoGroup.contractAddress]: ixo.iid.v1beta1.LinkedEntity.fromPartial({
            id: `{id}#${daoGroup.contractAddress}`,
            type: 'Group',
            relationship: 'subsidiary',
            service: '',
          }),
        }
      } else if ('coreAddress' in daoGroup && daoGroup.coreAddress) {
        const coreAddress = daoGroup.coreAddress as string
        tempLinkedEntity = {
          ...tempLinkedEntity,
          [coreAddress]: ixo.iid.v1beta1.LinkedEntity.fromPartial({
            id: `{id}#${coreAddress}`,
            type: 'Group',
            relationship: 'subsidiary',
            service: '',
          }),
        }
      }
    })

    entity.updatePartial('linkedEntity', tempLinkedEntity)
    history.push({ pathname: `/edit/entity/${entityId}/property`, search: history.location.search })
  }

  if (selectedGroup) {
    return (
      <SetupGroupSettings
        daoGroup={entity.daoGroups![selectedGroup]}
        onBack={(): void => setSelectedGroup('')}
        onSubmit={handleUpdateGroup}
      />
    )
  }

  return (
    <>
      <FlexBox direction='column' gap={5}>
        <Box width={`${deviceWidth.mobile}px`}>
          <Typography variant='secondary'>
            A DAO has one or more Groups. Each Group has its own membership and governance mechanism. A Group may even
            be a member of another Group. One of these groups is nominated to control the DAO and will have the
            authority to remove or add more groups after the DAO has been created.
          </Typography>
        </Box>

        <FlexBox gap={5}>
          {Object.entries(entity.daoGroups ?? {}).map(([key, value]) => {
            const inherited = Object.values(entity.linkedEntity)
              .filter((item: LinkedEntity) => item.type === 'Group')
              .some((item: LinkedEntity) => {
                const { id } = item
                const [, coreAddress] = id.split('#')
                return coreAddress === key
              })
            const Icon = DAOGroupConfig[value.type]?.icon
            const text = DAOGroupConfig[value.type]?.text
            return (
              <FlexBox key={key} direction='column' alignItems='center' gap={4}>
                <PropertyBox
                  icon={Icon && <Icon />}
                  label={text}
                  set={!!value.coreAddress}
                  handleRemove={() => handleRemoveGroup(key)}
                  handleClick={() => !inherited && setSelectedGroup(key)}
                  inherited={inherited}
                />
                <Typography variant='secondary' overflowLines={1} style={{ width: 100, textAlign: 'center' }}>
                  &nbsp;{(value as any).config?.name || value.config.name}&nbsp;
                </Typography>
                <CheckBox
                  label='DAO Controller'
                  value={entity.daoController === value.coreAddress}
                  textVariant='secondary'
                  textSize={'base'}
                  textColor={entity.daoController === value.coreAddress ? 'blue' : 'black'}
                  handleChange={() =>
                    entity.daoController !== value.coreAddress &&
                    entity.updatePartial('daoController', value.coreAddress)
                  }
                  style={{ flexDirection: 'column' }}
                />
              </FlexBox>
            )
          })}
          <PropertyBox icon={<PlusIcon />} noData handleClick={(): void => setOpenAddGroupModal(true)} />
        </FlexBox>

        <FlexBox gap={5} marginTop={10}>
          <Button variant='secondary' onClick={(): void => history.goBack()}>
            Back
          </Button>
          <Button variant='primary' disabled={!canSubmit} onClick={handleContinue}>
            Continue
          </Button>
        </FlexBox>
      </FlexBox>

      <AddDAOGroupModal
        open={openAddGroupModal}
        onClose={(): void => setOpenAddGroupModal(false)}
        onAdd={handleAddGroup}
        onClone={handleCloneGroup}
      />
    </>
  )
}

export default EditGroups
