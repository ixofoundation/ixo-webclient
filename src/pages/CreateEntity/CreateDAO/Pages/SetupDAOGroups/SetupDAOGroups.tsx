import { Box, FlexBox } from 'components/App/App.styles'
import { Typography } from 'components/Typography'
import React, { useMemo, useState } from 'react'
import { ReactComponent as PlusIcon } from 'assets/images/icon-plus.svg'
import { Button, CheckBox, PropertyBox } from 'pages/CreateEntity/Components'
import { AddDAOGroupModal } from 'components/Modals'
import { useCreateEntityState } from 'hooks/createEntity'
import { v4 as uuidv4 } from 'uuid'
import { DAOGroupConfig, TDAOGroupModel } from 'types/protocol'
import { omitKey } from 'utils/objects'
import SetupGroupSettings, { initialMembership } from './SetupGroupSettings'
import { deviceWidth } from 'constants/device'
import { initialPreProposeConfigState } from 'components/Modals/AddActionModal/SetupUpdateProposalSubmissionConfigModal'
import { initialProposalConfigState } from 'components/Modals/AddActionModal/SetupUpdateVotingConfigModal'

const SetupDAOGroups: React.FC = (): JSX.Element => {
  const { daoGroups, daoController, linkedEntity, updateDAOGroups, updateDAOController, updateLinkedEntity, gotoStep } =
    useCreateEntityState()
  const [openAddGroupModal, setOpenAddGroupModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('')
  const canSubmit = useMemo(
    () =>
      Object.values(daoGroups).length > 0 && !Object.values(daoGroups).some(({ contractAddress }) => !contractAddress),
    [daoGroups],
  )

  const handleAddGroup = (type: string): void => {
    const id = uuidv4()
    updateDAOGroups({
      ...daoGroups,
      [id]: {
        id,
        type,
        name: '',
        description: '',
        memberships: [initialMembership],
        ...initialPreProposeConfigState,
        ...initialProposalConfigState,
      },
    })

    // Set first group to DAO controller as default when it's added
    if (Object.values(daoGroups).length === 0) {
      updateDAOController(id)
    }
  }
  const handleUpdateGroup = (data: TDAOGroupModel): void => {
    updateDAOGroups({
      ...daoGroups,
      [data.id]: data,
    })
    setSelectedGroup('')
  }
  const handleRemoveGroup = (id: string): void => {
    const newDaoGroups = omitKey(daoGroups, id)
    updateDAOGroups(newDaoGroups)

    const newLinkedEntity = omitKey(linkedEntity, id)
    updateLinkedEntity(newLinkedEntity)

    // Change DAO controller if removed one was a controller
    if (daoController === id) {
      updateDAOController(Object.keys(newDaoGroups).pop() ?? '')
    }
  }
  const handleCloneGroup = (address: string): void => {
    // TODO: fetch DAO group from somewhere with given address
  }

  const handleContinue = (): void => {
    let tempLinkedEntity = {}
    Object.values(daoGroups).forEach(({ contractAddress }) => {
      tempLinkedEntity = {
        ...tempLinkedEntity,
        [contractAddress!]: {
          id: `{id}#${contractAddress!}`,
          type: 'Group',
          relationship: 'subsidiary',
          service: '',
        },
      }
    })

    updateLinkedEntity(tempLinkedEntity)
    gotoStep(1)
  }

  if (selectedGroup) {
    return (
      <SetupGroupSettings id={selectedGroup} onBack={(): void => setSelectedGroup('')} onSubmit={handleUpdateGroup} />
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
          {Object.entries(daoGroups).map(([key, value]) => {
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
                  value={daoController === value.id}
                  textVariant='secondary'
                  textSize={'base'}
                  textColor={daoController === value.id ? 'blue' : 'black'}
                  handleChange={() => daoController !== value.id && updateDAOController(value.id)}
                  style={{ flexDirection: 'column' }}
                />
              </FlexBox>
            )
          })}
          <PropertyBox icon={<PlusIcon />} noData handleClick={(): void => setOpenAddGroupModal(true)} />
        </FlexBox>

        <FlexBox gap={5} marginTop={10}>
          <Button variant='secondary' onClick={(): void => gotoStep(-1)}>
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

export default SetupDAOGroups
