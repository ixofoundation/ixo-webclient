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
import { initialPreProposeConfigState } from 'components/Modals/AddActionModal/SetupUpdateProposalSubmissionConfigModal'
import { initialProposalConfigState } from 'components/Modals/AddActionModal/SetupUpdateVotingConfigModal'
import { ixo } from '@ixo/impactxclient-sdk'
import SetupGroupSettings, {
  initialMembership,
  initialStaking,
} from 'pages/CreateEntity/CreateDAO/Pages/SetupDAOGroups/SetupGroupSettings'
import { EditEntityContext } from 'pages/EditEntity/EditEntity'
import { useHistory, useParams } from 'react-router-dom'

const EditGroups: React.FC = (): JSX.Element => {
  const history = useHistory()
  const { entityId } = useParams<{ entityId: string }>()
  const entity = useContext(EditEntityContext)

  const [openAddGroupModal, setOpenAddGroupModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('')
  const canSubmit = useMemo(
    () =>
      Object.values(entity.daoGroups ?? {}).length > 0 &&
      !Object.values(entity.daoGroups ?? {}).some(({ contractAddress }) => !contractAddress),
    [entity.daoGroups],
  )

  const handleAddGroup = (type: string): void => {
    const id = uuidv4()
    if (type !== 'staking') {
      entity.updatePartial(
        'daoGroups',
        {
          [id]: {
            id,
            type,
            name: '',
            description: '',
            ...initialPreProposeConfigState,
            ...initialProposalConfigState,
            memberships: [initialMembership],
          },
        },
        true,
      )
    } else {
      entity.updatePartial(
        'daoGroups',
        {
          [id]: {
            id,
            type,
            name: '',
            description: '',
            ...initialPreProposeConfigState,
            ...initialProposalConfigState,
            memberships: [initialMembership],
            staking: { ...initialStaking },
          },
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
        [data.id]: data,
      },
      true,
    )
    setSelectedGroup('')
  }
  const handleRemoveGroup = (id: string): void => {
    const newDaoGroups = omitKey(entity.daoGroups ?? {}, id)
    // updateDAOGroups(newDaoGroups)
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
    Object.values(entity.daoGroups ?? {}).forEach(({ contractAddress }) => {
      tempLinkedEntity = {
        ...tempLinkedEntity,
        [contractAddress!]: ixo.iid.v1beta1.LinkedEntity.fromPartial({
          id: `{id}#${contractAddress!}`,
          type: 'Group',
          relationship: 'subsidiary',
          service: '',
        }),
      }
    })

    entity.updatePartial('linkedEntity', tempLinkedEntity)
    history.push(`/edit/entity/${entityId}/property`)
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
            const Icon = DAOGroupConfig[value.type]?.icon
            const text = DAOGroupConfig[value.type]?.text
            return (
              <FlexBox key={key} direction='column' alignItems='center' gap={4}>
                <PropertyBox
                  icon={Icon && <Icon />}
                  label={text}
                  set={!!value.contractAddress}
                  handleRemove={(): void => handleRemoveGroup(key)}
                  handleClick={(): void => setSelectedGroup(key)}
                />
                <Typography variant='secondary' overflowLines={1} style={{ width: 100, textAlign: 'center' }}>
                  &nbsp;{value.name}&nbsp;
                </Typography>
                <CheckBox
                  label='DAO Controller'
                  value={entity.daoController === value.id}
                  textVariant='secondary'
                  textSize={'base'}
                  textColor={entity.daoController === value.id ? 'blue' : 'black'}
                  handleChange={() =>
                    entity.daoController !== value.id && entity.updatePartial('daoController', value.id)
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
