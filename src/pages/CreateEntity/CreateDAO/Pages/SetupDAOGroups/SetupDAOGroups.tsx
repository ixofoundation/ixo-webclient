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
import SetupGroupSettings from './SetupGroupSettings'
import { deviceWidth } from 'constants/device'

const SetupDAOGroups: React.FC = (): JSX.Element => {
  const { daoGroups, daoController, updateDAOGroups, updateDAOController, gotoStep } = useCreateEntityState()
  const [openAddGroupModal, setOpenAddGroupModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('')
  const canSubmit = useMemo(() => Object.values(daoGroups).length > 0, [daoGroups])

  const handleAddGroup = (type: string): void => {
    const id = uuidv4()
    updateDAOGroups({
      ...daoGroups,
      [id]: { id, type },
    })

    // Set first group to DAO controller as default when it's added
    if (Object.values(daoGroups).length === 0) {
      updateDAOController(id)
    }
  }
  const handleRemoveGroup = (id: string): void => {
    const newDaoGroups = omitKey(daoGroups, id)
    updateDAOGroups(newDaoGroups)

    // Change DAO controller if removed one was a controller
    if (daoController === id) {
      updateDAOController(Object.keys(newDaoGroups).pop() ?? '')
    }
  }
  const handleCloneGroup = (address: string): void => {
    // TODO: fetch DAO group from somewhere with given address
  }

  if (selectedGroup) {
    return (
      <SetupGroupSettings
        id={selectedGroup}
        onBack={(): void => setSelectedGroup('')}
        onContinue={(data: TDAOGroupModel): void => {
          updateDAOGroups({
            ...daoGroups,
            [data.id]: data,
          })
          setSelectedGroup('')
        }}
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
          {Object.entries(daoGroups).map(([key, value]) => {
            const Icon = DAOGroupConfig[value.type]?.icon
            const text = DAOGroupConfig[value.type]?.text
            return (
              <FlexBox key={key} direction='column' alignItems='center' gap={4}>
                <PropertyBox
                  icon={Icon && <Icon />}
                  label={text}
                  set={!!value.name}
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
          <Button variant='primary' disabled={!canSubmit} onClick={(): void => gotoStep(1)}>
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
